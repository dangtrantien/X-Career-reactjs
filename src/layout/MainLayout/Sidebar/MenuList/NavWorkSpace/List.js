import { useEffect, useState } from 'react';
import { useParams } from 'react-router';

// material-ui
import { Avatar, Divider, Grid, Typography } from '@mui/material';

// icons
import { IconPlus } from '@tabler/icons';

// project imports
import NavWorkSpaceItem from './Item';
import WorkSpaceAPI from 'services/WorkSpaceAPI';
import BForm from 'views/board/BoardForm';
import BackgroundLetterAvatars from 'ui-component/BackgroundLetterAvatar';
import io from 'socket.io-client';
import { host } from 'services/baseAPI';

// ==============================|| SIDEBAR WORK SPACE LIST ||============================== //
const workSpaceAPI = new WorkSpaceAPI();
const socket = io(host, {
  transports: ['websocket'],
  withCredentials: true,
});

const WorkSpaceList = () => {
  const { workSpaceId } = useParams();
  const userId = sessionStorage.getItem('id');

  const [openB, setOpenB] = useState(false);

  const [workspace, setWorkSpace] = useState([]);
  const [board, setBoard] = useState([]);

  const [countB, setCountB] = useState();

  const loadData = (id) => {
    workSpaceAPI.getByID(id).then((result) => {
      const arr = [];
      let count = 0;

      result.data[0].boards.map((value) => {
        value.member.map((user) => {
          if (user._id === userId) {
            arr.push(value);
            count++;
          }
        });
      });

      setBoard(arr);
      setWorkSpace(result.data[0]);
      setCountB(count);
    });
  };

  const handleCreateB = () => {
    setOpenB(true);
  };

  const handleCloseB = () => {
    setOpenB(false);
  };

  useEffect(() => {
    loadData(workSpaceId);

    socket.on('workspace', () => {
      loadData(workSpaceId);
    });

    socket.on('board', () => {
      loadData(workSpaceId);
    });
  }, [workSpaceId]);

  return (
    <>
      <Grid container alignItems="flex-end">
        {workspace.logo && (
          <>
            {workspace.logo.data === '' ? (
              <BackgroundLetterAvatars name={workspace.name} h={40} w={40} />
            ) : (
              <Avatar src={workspace.logo.data} variant="rounded" sx={{ height: 40, width: 40 }} />
            )}
          </>
        )}

        <Typography variant="h3" fontWeight={500} sx={{ width: 160, ml: 2 }}>
          {workspace.name}
        </Typography>
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
          {board.map((item) => (
            <NavWorkSpaceItem key={item._id} item={item} wsId={workSpaceId} />
          ))}
        </>
      )}

      <BForm open={openB} onClose={handleCloseB} wsId={workSpaceId} dialogForm={0} />
    </>
  );
};

export default WorkSpaceList;
