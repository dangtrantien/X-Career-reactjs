import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';

// material-ui
import { Avatar, Divider, Grid, Typography } from '@mui/material';

// icons
import { IconPlus } from '@tabler/icons';

// project imports
import NavWorkSpaceItem from './Item';
import WorkSpaceAPI from 'services/WorkSpaceAPI';
import BoardAPI from 'services/BoardAPI';
import io from 'socket.io-client';
import BForm from 'views/board/BoardForm';
import BackgroundLetterAvatars from 'ui-component/BackgroundLetterAvatar';

// ==============================|| SIDEBAR BOARD LIST ||============================== //
const boardAPI = new BoardAPI();
const workSpaceAPI = new WorkSpaceAPI();
const socketClient = io.connect('http://localhost:3002');

const BoardList = () => {
  const navigate = useNavigate();
  const { boardId } = useParams();

  const [openB, setOpenB] = useState(false);

  const [board, setBoard] = useState([]);
  const [workspace, setWorkSpace] = useState([]);

  const loadData = (id) => {
    boardAPI.getById(id).then((result) => {
      workSpaceAPI.getById(result.data[0].workSpaceID).then((res) => {
        setWorkSpace(res.data[0]);
        setBoard(res.data[0].boards);
      });
    });
  };

  const handleCreateB = () => {
    setOpenB(true);
  };

  const handleCloseB = () => {
    setOpenB(false);
    loadData(boardId);
  };

  useEffect(() => {
    loadData(boardId);

    socketClient.on('edit_board', () => {
      loadData(boardId);
    });

    socketClient.on('delete_board', () => {
      loadData(boardId);
    });
  }, [boardId]);

  return (
    <>
      <Grid
        sx={{ cursor: 'pointer', borderRadius: 3, '&:hover': { backgroundColor: '#ede7f6' } }}
        onClick={() => {
          navigate(`w/detail/${workspace._id}`, { replace: true });
        }}
      >
        <Grid container alignItems="flex-end" sx={{ px: 3, py: 2 }}>
          {workspace.logo === '' ? (
            <BackgroundLetterAvatars name={workspace.name} h={40} w={40} />
          ) : (
            <Avatar src={workspace.logo} variant="rounded" sx={{ height: 40, width: 40 }} />
          )}

          <Typography variant="h3" fontWeight={500} sx={{ ml: 2 }}>
            {workspace.name}
          </Typography>
        </Grid>
      </Grid>
      <Divider sx={{ borderBottom: '1px solid', my: 2 }} />

      <Grid container justifyContent="space-between" alignItems="center">
        <Typography variant="h4" fontWeight={300}>
          Board
        </Typography>

        <Grid item sx={{ cursor: 'pointer' }} onClick={handleCreateB}>
          <IconPlus />
        </Grid>
      </Grid>

      <BForm open={openB} onClose={handleCloseB} wsId={workspace._id} dialogForm={0} />

      {board.map((item, index) => (
        <NavWorkSpaceItem key={item._id} item={item} index={index} wsId={workspace._id} />
      ))}
    </>
  );
};

export default BoardList;
