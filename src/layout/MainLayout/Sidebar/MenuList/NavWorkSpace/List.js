import { useEffect, useState } from 'react';
import { useParams } from 'react-router';

// material-ui
import { Avatar, Divider, Grid, Typography } from '@mui/material';

// icons
import { IconPlus } from '@tabler/icons';

// project imports
import NavWorkSpaceItem from './Item';
import WorkSpaceAPI from 'services/WorkSpaceAPI';
import io from 'socket.io-client';
import BForm from 'views/board/BoardForm';
import BackgroundLetterAvatars from 'ui-component/BackgroundLetterAvatar';

// ==============================|| SIDEBAR WORK SPACE LIST ||============================== //
const workSpaceAPI = new WorkSpaceAPI();
const socketClient = io.connect('http://localhost:3002');

const WorkSpaceList = () => {
  const { workSpaceId } = useParams();

  const [openB, setOpenB] = useState(false);

  const [workspace, setWorkSpace] = useState([]);
  const [board, setBoard] = useState([]);

  const loadData = (id) => {
    workSpaceAPI.getById(id).then((result) => {
      setWorkSpace(result.data[0]);
      setBoard(result.data[0].boards);
    });
  };

  const handleCreateB = () => {
    setOpenB(true);
  };

  const handleCloseB = () => {
    setOpenB(false);
    loadData(workSpaceId);
  };

  useEffect(() => {
    loadData(workSpaceId);

    socketClient.on('delete_board', () => {
      loadData(workSpaceId);
    });
  }, [workSpaceId]);

  return (
    <>
      <Grid container alignItems="flex-end">
        {workspace.logo === '' ? (
          <BackgroundLetterAvatars name={workspace.name} h={40} w={40} />
        ) : (
          <Avatar src={workspace.logo} variant="rounded" sx={{ height: 40, width: 40 }} />
        )}

        <Typography variant="h3" fontWeight={500} sx={{ ml: 2 }}>
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

      <BForm open={openB} onClose={handleCloseB} wsId={workSpaceId} dialogForm={0} />

      {board.map((item) => (
        <NavWorkSpaceItem key={item._id} item={item} wsId={workSpaceId} />
      ))}
    </>
  );
};

export default WorkSpaceList;
