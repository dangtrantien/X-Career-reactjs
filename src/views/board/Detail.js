import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';

// material-ui
import { Avatar, Typography, Grid, Button, Tooltip, IconButton, Menu, MenuItem, Divider } from '@mui/material';

// icons
import { IconPencil } from '@tabler/icons';

// project imports
import BoardAPI from 'services/BoardAPI';
import BForm from 'views/board/BoardForm';
import TaskList from './task/List';
import FilterBtn from 'ui-component/MenuButton/FilterBtn';
import io from 'socket.io-client';
import { host } from 'services/baseAPI';

// ==============================|| BOARD DETAIL ||============================== //
const boardAPI = new BoardAPI();
const socket = io(host, {
  transports: ['websocket'],
  withCredentials: true,
});

const lists = [
  {
    id: 0,
    title: 'Backlog',
    bgColor: 'rgb(4, 124, 188)',
  },
  {
    id: 1,
    title: 'To-Do',
    bgColor: 'rgb(236, 92, 68)',
  },
  {
    id: 2,
    title: 'Doing',
    bgColor: 'rgb(236, 92, 68)',
  },
  {
    id: 3,
    title: 'Done',
    bgColor: 'rgb(100, 188, 76)',
  },
];

const date = [
  {
    id: 0,
    label: 'No expiration date',
    iconColor: 'grey',
    task: [],
  },
  {
    id: 1,
    label: 'Task done',
    iconColor: 'green',
    task: [],
  },
  {
    id: 2,
    label: 'Out of date',
    iconColor: 'red',
    task: [],
  },
];

const Detail = () => {
  const { boardId } = useParams();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  const [board, setBoard] = useState({});
  const [bgImg, setBgImg] = useState({});
  const [task, setTask] = useState([]);

  const [BMember, setBMember] = useState([]);

  const [anchorEl, setAnchorEl] = useState(null);
  const [userID, setUserID] = useState();
  const openUser = Boolean(anchorEl);

  const [checkNone, setCheckNone] = useState(false);
  const [check, setCheck] = useState(false);

  const [dateID, setDateID] = useState();
  const [checkDate, setCheckDate] = useState(false);

  const handleClick = (event, id) => {
    setAnchorEl(event.currentTarget);
    setUserID(id);
  };

  const handleCloseUser = () => {
    setAnchorEl(null);
  };

  const loadData = (id) => {
    boardAPI.getByID(id).then((result) => {
      let noDate = [];
      let taskDone = [];
      let expired = [];

      result.data[0].tasks.map((res) => {
        if (res.day) {
          if (res.day.expired === 'done') {
            taskDone.push(res);
          } else if (res.day.startTime !== '' && res.day.expirationDate !== '' && res.day.expirationTime !== '') {
            if (new Date().toLocaleDateString() > res.day.expirationDate) {
              expired.push(res);
            } else if (new Date().toLocaleDateString() === res.day.expirationDate) {
              if (new Date().getHours() > res.day.expirationTime.split(':')[0]) {
                expired.push(res);
              } else if (new Date().getHours() === res.day.expirationTime.split(':')[0]) {
                if (new Date().getMinutes() > res.day.expirationTime.split(':')[1]) {
                  expired.push(res);
                }
              }
            }
          }
        } else {
          noDate.push(res);
        }
      });

      date[0].task = noDate;
      date[1].task = taskDone;
      date[2].task = expired;

      setBoard(result.data[0]);
      setBgImg(result.data[0].bgImg);
      setTask(result.data[0].tasks);
      setBMember(result.data[0].member);
    });
  };

  const handleFilterMemberNone = (event) => {
    setCheckNone(event.target.checked);
    setCheck(false);

    boardAPI.getByID(boardId).then((result) => {
      let arr = [];

      result.data[0].tasks.map((res) => {
        if (res.member.length === 0) {
          arr.push(res);
        }
      });

      if (event.target.checked === true) {
        setTask(arr);
      } else {
        setTask(result.data[0].tasks);
      }
    });
  };

  const handleFilterMember = (event, id) => {
    setUserID(id);
    setCheckNone(false);
    setCheck(event.target.checked);

    boardAPI.getByID(boardId).then((result) => {
      let arr = [];

      result.data[0].tasks.map((res) => {
        res.member.map((data) => {
          if (data._id === id) {
            arr.push(res);
          }
        });
      });

      if (event.target.checked === true) {
        setTask(arr);
      } else {
        setTask(result.data[0].tasks);
      }
    });
  };

  const handleFilterDate = (event, id) => {
    setDateID(id);
    setCheckDate(event.target.checked);

    boardAPI.getByID(boardId).then((result) => {
      if (event.target.checked === true) {
        if (id === 0) {
          setTask(date[0].task);
        } else if (id === 1) {
          setTask(date[1].task);
        } else if (id === 2) {
          setTask(date[2].task);
        }
      } else {
        setTask(result.data[0].tasks);
      }
    });
  };

  const handleEdit = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    loadData(boardId);

    socket.on('board', () => {
      loadData(boardId);
    });

    socket.on('task', () => {
      loadData(boardId);
    });
  }, [boardId]);

  return (
    <>
      <Grid container justifyContent="space-between" alignItems="center" sx={{ mb: 2, px: 2 }}>
        <Typography variant="h2" sx={{ fontWeight: 500 }}>
          {board.name}
        </Typography>

        <Grid item display="flex">
          <Grid sx={{ mr: 2 }}>
            <FilterBtn
              page="board"
              userId={userID}
              checkMember={check}
              checkNone={checkNone}
              member={board.member}
              handleFilterMemberNone={handleFilterMemberNone}
              handleFilterMember={handleFilterMember}
              checkDate={checkDate}
              date={date}
              dateId={dateID}
              handleFilterDate={handleFilterDate}
            />
          </Grid>

          {BMember.map((user) => (
            <div key={user._id}>
              <Tooltip title={user.name}>
                <IconButton
                  onClick={(e) => handleClick(e, user._id)}
                  aria-controls={openUser ? 'account-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={openUser ? 'true' : undefined}
                >
                  <Avatar src={user.avatar.data} sx={{ width: 30, height: 30 }} />
                </IconButton>
              </Tooltip>

              {userID === user._id && (
                <Menu
                  anchorEl={anchorEl}
                  id="account-menu"
                  open={openUser}
                  onClose={handleCloseUser}
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
                  <Grid container justifyContent="center" alignItems="center" sx={{ p: 3 }}>
                    <Avatar alt="profile user" src={user.avatar.data} sx={{ mr: 2 }} />

                    <Grid>
                      <Typography variant="h3">{user.name}</Typography>

                      <Typography variant="subtitle2">{user.email}</Typography>
                    </Grid>
                  </Grid>
                  <Divider />

                  <MenuItem onClick={() => navigate(`/u/profile/${user._id}`, { replace: true })}>View profile</MenuItem>
                </Menu>
              )}
            </div>
          ))}

          <Button variant="contained" sx={{ ml: 2, height: 'fit-content' }} onClick={handleEdit} startIcon={<IconPencil size={20} />}>
            Edit
          </Button>
        </Grid>
      </Grid>

      <Grid
        container
        justifyContent="space-evenly"
        sx={{
          py: 2,
          backgroundImage: `url('${bgImg.data}')`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundClip: 'border-box',
        }}
      >
        {lists.map((value) => (
          <TaskList key={value.id} list={value} item={task} bId={boardId} />
        ))}
      </Grid>

      <BForm open={open} onClose={handleClose} formData={board} wsId={board.workSpaceID} dialogForm={1} />
    </>
  );
};

export default Detail;
