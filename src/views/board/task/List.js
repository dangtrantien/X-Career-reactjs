import PropTypes from 'prop-types';
import { useState } from 'react';

// material-ui
import { Typography, Grid, Card, Button, CardContent } from '@mui/material';

// icons
import { IconPlus } from '@tabler/icons';

// project imports
import swal from 'sweetalert';
import TForm from './TaskForm';
import TaskItem from './Item';
import TaskAPI from '../../../services/TaskAPI';
import io from 'socket.io-client';
import { host } from '../../../services/baseAPI';

// ==============================|| TASK LIST ||============================== //
const taskAPI = new TaskAPI();
const socket = io(host, {
  transports: ['websocket'],
  withCredentials: true,
});

const TaskList = ({ list, item, bId }) => {
  const [openT, setOpenT] = useState(false);

  const dragOver = (e) => {
    e.preventDefault();
  };

  const drop = (e, index) => {
    let id = e.dataTransfer.getData('id');

    taskAPI.getAll().then((result) => {
      result.data.data.map((res) => {
        if (res._id === id) {
          const task = {
            status: index,
          };

          taskAPI
            .updateByID(res._id, task)
            .then((res) => {
              if (res.data.success === true) {
                socket.emit('task', res.data.data);
              }
            })
            .catch(() => {
              swal({
                text: 'Sorry, something went wrong. Please contact to admin for support.',
                buttons: false,
                timer: 5000,
                icon: 'error',
              });
            });
        }
      });
    });
  };

  const handleCreateT = () => {
    setOpenT(true);
  };

  const handleClose = () => {
    setOpenT(false);
  };

  return (
    <>
      <Card
        sx={{
          width: 240,
          height: 'fit-content',
          borderRadius: 2,
          backgroundColor: 'rgba(255, 255, 255, 0.5)',
        }}
        variant="outlined"
      >
        <CardContent
          sx={{ backgroundColor: `${list.bgColor}`, height: 100, display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        >
          <Typography variant="h3" sx={{ color: 'white' }}>
            {list.title}
          </Typography>
        </CardContent>

        <Grid
          sx={{
            height: 355,
            overflowY: 'hidden',
            '&:hover': {
              overflowY: 'auto',
              '&::-webkit-scrollbar': {
                width: 7,
              },
              '&::-webkit-scrollbar-track': {
                background: '#f1f1f1',
                borderRadius: 10,
              },
              '&::-webkit-scrollbar-thumb': {
                background: '#888',
                borderRadius: 10,
              },
              '&::-webkit-scrollbar-thumb:hover': {
                background: '#555',
              },
            },
          }}
          onDragOver={(e) => dragOver(e)}
          onDrop={(e) => drop(e, list.id)}
        >
          {item.map((data) => (
            <div key={data._id}>{data.status === list.id && <TaskItem item={data} bId={bId} />}</div>
          ))}
        </Grid>

        <Button
          variant="contained"
          sx={{ mx: 1, my: 2, borderRadius: 2, height: 40, width: 212 }}
          onClick={handleCreateT}
          startIcon={<IconPlus size={20} />}
        >
          Add task
        </Button>
      </Card>

      <TForm open={openT} onClose={handleClose} bId={bId} status={list.id} dialogForm={0} />
    </>
  );
};

TaskList.propTypes = {
  list: PropTypes.object,
  item: PropTypes.array,
  bId: PropTypes.any,
};

export default TaskList;
