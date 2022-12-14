import { useEffect, useState } from 'react';
import { useParams } from 'react-router';

// material-ui
import { Avatar, Typography, Grid, Button } from '@mui/material';

// icons
import { IconPencil } from '@tabler/icons';

// project imports
import BoardAPI from 'services/BoardAPI';
import BForm from 'views/board/BoardForm';
import TaskList from './task/List';
import io from 'socket.io-client';
import { host } from 'services/baseAPI';

// ==============================|| BOARD DETAIL ||============================== //
const boardAPI = new BoardAPI();
const socket = io(host);

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

const Detail = () => {
  const { boardId } = useParams();

  const [board, setBoard] = useState({});
  const [bgImg, setBgImg] = useState({});
  const [task, setTask] = useState([]);

  const [BMember, setBMember] = useState([]);

  const [openB, setOpenB] = useState(false);

  const loadData = (id) => {
    boardAPI.getByID(id).then((result) => {
      setBoard(result.data[0]);
      setBgImg(result.data[0].bgImg);
      setTask(result.data[0].tasks);
      setBMember(result.data[0].member);
    });
  };

  const handleEditB = () => {
    setOpenB(true);
  };

  const handleClose = () => {
    setOpenB(false);
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
          {BMember.map((user) => (
            <Avatar key={user._id} src={user.avatar.data} sx={{ width: 30, height: 30 }} />
          ))}

          <Button variant="contained" size="small" sx={{ ml: 2 }} onClick={handleEditB}>
            <IconPencil />
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

      <BForm open={openB} onClose={handleClose} formData={board} wsId={board.workSpaceID} dialogForm={1} />
    </>
  );
};

export default Detail;
