import PropTypes from 'prop-types';
import { useState } from 'react';

// material-ui
import { Avatar, ListItemButton, ListItemText, Grid } from '@mui/material';

// icons
import { IconTrash } from '@tabler/icons';

// project imports
import swal from 'sweetalert';
import TForm from './TaskForm';
import TaskAPI from 'services/TaskAPI';
import io from 'socket.io-client';
import { host } from 'services/baseAPI';

// ==============================|| TASK ITEM ||============================== //
const taskAPI = new TaskAPI();
const socket = io(host, {
  transports: ['websocket', 'polling'],
  withCredentials: true,
});

const TaskItem = ({ item, bId }) => {
  const [openT, setOpenT] = useState(false);

  const dragStart = (e, id) => {
    e.dataTransfer.setData('id', id);
  };

  const handleEditT = () => {
    setOpenT(true);
  };

  const handleClose = () => {
    setOpenT(false);
  };

  const handleDelete = (id) => {
    swal({
      title: 'Are you sure?',
      text: 'Once deleted, you will not be able to recover.',
      icon: 'warning',
      buttons: [true, 'Delete'],
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        taskAPI
          .deleteByID(id)
          .then((res) => {
            if (res.status === 200) {
              socket.emit('task', res.data);
            }
          })
          .catch(() => {
            //Thông báo lỗi
            swal({
              text: 'Sorry, something went wrong. Please contact to admin for support.',
              buttons: false,
              timer: 5000,
              icon: 'error',
            });
          });
      }
    });
  };

  return (
    <>
      <Grid container sx={{ position: 'relative', p: 1 }}>
        <ListItemButton
          sx={{
            borderRadius: 2,
            width: 215,
            backgroundColor: 'white',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            '&:hover': { backgroundColor: 'rgb(250, 250, 250)' },
            '&:hover + .hide': {
              display: 'block',
            },
          }}
          onClick={handleEditT}
          onDragStart={(e) => dragStart(e, item._id)}
          draggable
        >
          <ListItemText primary={item.task} />

          {item.member !== [] && (
            <div style={{ marginTop: 10, display: 'flex' }}>
              {item.member.map((user) => (
                <Avatar key={user._id} src={user.avatar.data} sx={{ width: 24, height: 24 }} />
              ))}
            </div>
          )}
        </ListItemButton>

        <Grid
          className="hide"
          sx={{
            display: 'none',
            cursor: 'pointer',
            position: 'absolute',
            top: 18,
            right: 4,
            minWidth: 30,
            p: '0 0 0 0',
            '&:hover': { display: 'block', color: '#90CAF9' },
          }}
          onClick={() => {
            handleDelete(item._id);
          }}
        >
          <IconTrash />
        </Grid>
      </Grid>
      <TForm open={openT} onClose={handleClose} formDataID={item._id} formData={item} bId={bId} dialogForm={1} />
    </>
  );
};

TaskItem.propTypes = {
  item: PropTypes.object,
  bId: PropTypes.any,
};

export default TaskItem;
