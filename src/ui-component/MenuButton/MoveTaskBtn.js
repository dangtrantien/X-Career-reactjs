import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// material-ui
import { Box, Grid, Button, Menu, DialogTitle, Select, DialogContent, InputLabel } from '@mui/material';

// icons

// project imports
import swal from 'sweetalert';
import BoardAPI from 'services/BoardAPI';
import TaskAPI from 'services/TaskAPI';
import AnimateButton from 'ui-component/extended/AnimateButton';
import io from 'socket.io-client';
import { host } from 'services/baseAPI';

// ==============================|| MOVE TASK BUTTON ||============================== //
const boardAPI = new BoardAPI();
const taskAPI = new TaskAPI();
const socket = io(host, {
  transports: ['websocket', 'polling'],
  withCredentials: true,
});

const lists = [
  {
    id: 0,
    title: 'Backlog',
  },
  {
    id: 1,
    title: 'To-Do',
  },
  {
    id: 2,
    title: 'Doing',
  },
  {
    id: 3,
    title: 'Done',
  },
];

const MoveTaskBtn = (props) => {
  const { task, anchorEl, open, handleClose } = props;
  const navigate = useNavigate();
  const userId = sessionStorage.getItem('id');

  const [board, setBoard] = useState([]);

  const [currentBoardID, setCurrentBoardID] = useState();
  const [boardID, setBoardID] = useState();
  const [listID, setListID] = useState();

  const loadData = (id) => {
    boardAPI.getAll().then((result) => {
      const arr = [];

      result.data.data.map((res) => {
        res.member.map((value) => {
          if (value._id === id) {
            arr.push(res);
          }
        });
      });

      setBoard(arr);
    });

    setCurrentBoardID(task.boardID);
    setBoardID(task.boardID);
    setListID(task.status);
  };

  const handleBoardChange = (event) => {
    setBoardID(event.target.value);
  };

  const handleListChange = (event) => {
    setListID(event.target.value);
  };

  const handleSubmit = () => {
    taskAPI.getAll().then((result) => {
      result.data.data.map((res) => {
        if (res._id === task._id) {
          const task = {
            boardID: boardID,
            status: listID,
          };

          taskAPI
            .updateByID(res._id, task)
            .then((res) => {
              if (res.data.success === true) {
                socket.emit('task', res.data.data);

                if (res.data.data.boardID !== currentBoardID) {
                  navigate(`/b/${res.data.data.boardID}`, { replace: true });
                }
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

  useEffect(() => {
    loadData(userId);
  }, [userId]);

  return (
    <Menu
      anchorEl={anchorEl}
      id="account-menu"
      open={open}
      onClose={handleClose}
      PaperProps={{
        elevation: 0,
        sx: {
          overflow: 'visible',
          filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
          mt: 1.5,
          '& .MuiAvatar-root': {
            width: 80,
            height: 80,
            ml: -0.5,
            mr: 1,
          },
          '&:before': {
            content: '""',
            display: 'block',
            position: 'absolute',
            top: 0,
            right: 14,
            width: 10,
            height: 10,
            transform: 'translateY(-50%) rotate(45deg)',
            zIndex: 0,
          },
        },
      }}
      transformOrigin={{ horizontal: 'right', vertical: 'top' }}
      anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
    >
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ width: 250 }}>
        <DialogTitle display="flex" justifyContent="center" sx={{ fontSize: 16, fontWeight: 500 }}>
          Move Task
        </DialogTitle>

        <DialogContent spacing={2}>
          <InputLabel>Board</InputLabel>
          <Select fullWidth native id="board" value={boardID} onChange={handleBoardChange}>
            {board.map((data) => (
              <option key={data._id} value={data._id}>
                {data._id === task.boardID ? `${data.name} (currently)` : data.name}
              </option>
            ))}
          </Select>

          <Grid sx={{ my: 2 }}>
            <InputLabel>List</InputLabel>
            <Select fullWidth native id="list" value={listID} onChange={handleListChange}>
              {lists.map((data) => (
                <option key={data.id} value={data.id}>
                  {data.id === task.status ? `${data.title} (currently)` : data.title}
                </option>
              ))}
            </Select>
          </Grid>

          <AnimateButton>
            <Button disableElevation size="small" type="submit" variant="contained" color="primary">
              Move
            </Button>
          </AnimateButton>
        </DialogContent>
      </Box>
    </Menu>
  );
};

MoveTaskBtn.propTypes = {
  task: PropTypes.any,
  anchorEl: PropTypes.any,
  open: PropTypes.any,
  handleClose: PropTypes.any,
};

export default MoveTaskBtn;
