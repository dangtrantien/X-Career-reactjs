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
import BForm from 'views/board/BoardForm';
import BackgroundLetterAvatars from 'ui-component/BackgroundLetterAvatar';
import io from 'socket.io-client';
import { host } from 'services/baseAPI';

// ==============================|| SIDEBAR BOARD LIST ||============================== //
const boardAPI = new BoardAPI();
const workSpaceAPI = new WorkSpaceAPI();
const socket = io(host);

const BoardList = () => {
  const navigate = useNavigate();
  const { boardId } = useParams();
  const userId = sessionStorage.getItem('id');

  const [openB, setOpenB] = useState(false);

  const [board, setBoard] = useState([]);
  const [workspace, setWorkSpace] = useState([]);

  const [countB, setCountB] = useState();

  const loadData = (id) => {
    boardAPI.getByID(id).then((result) => {
      workSpaceAPI.getByID(result.data[0].workSpaceID).then((res) => {
        const arr = [];
        let count = 0;

        res.data[0].boards.map((value) => {
          value.member.map((user) => {
            if (user._id === userId) {
              arr.push(value);
              count++;
            }
          });
        });

        setBoard(arr);
        setWorkSpace(res.data[0]);
        setCountB(count);
      });
    });
  };

  const handleCreateB = () => {
    setOpenB(true);
  };

  const handleCloseB = () => {
    setOpenB(false);
  };

  useEffect(() => {
    loadData(boardId);

    socket.on('workspace', () => {
      loadData(boardId);
    });

    socket.on('board', () => {
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
        <Grid item display="flex" alignItems="center" sx={{ px: 3, py: 2 }}>
          {workspace.logo && (
            <>
              {workspace.logo.data === '' ? (
                <BackgroundLetterAvatars name={workspace.name} h={40} w={40} />
              ) : (
                <Avatar src={workspace.logo.data} variant="rounded" sx={{ height: 40, width: 40 }} />
              )}
            </>
          )}

          <Typography variant="h3" fontWeight={500} sx={{ ml: 2, overflow: 'hidden', wordBreak: 'break-word' }}>
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

      {countB === 0 ? (
        <>
          <Typography variant="h4" fontWeight={300} sx={{ my: 2 }}>
            You don't have any panels in this Workspace yet. The boards you create or join will show up here.
          </Typography>

          <Typography
            variant="subtitle1"
            sx={{ cursor: 'pointer', textDecoration: 'underline', '&:hover': { color: '#90CAF9' } }}
            onClick={handleCreateB}
          >
            Create Table
          </Typography>
        </>
      ) : (
        <>
          {board.map((item, index) => (
            <NavWorkSpaceItem key={item._id} item={item} index={index} wsId={workspace._id} />
          ))}
        </>
      )}

      <BForm open={openB} onClose={handleCloseB} wsId={workspace._id} dialogForm={0} />
    </>
  );
};

export default BoardList;
