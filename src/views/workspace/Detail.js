import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';

// material-ui
import { Avatar, Typography, Grid, Button } from '@mui/material';

// icons
import { IconPencil, IconTrash, IconUsers } from '@tabler/icons';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import WorkSpaceAPI from 'services/WorkSpaceAPI';
import BackgroundLetterAvatars from 'ui-component/BackgroundLetterAvatar';
import WSForm from './WorkSpaceForm';
import BForm from 'views/board/BoardForm';
import io from 'socket.io-client';
import AnimateButton from 'ui-component/extended/AnimateButton';
import SocketIo from 'utils/socket.io';
import BoardList from 'views/dashboard/BoardList';

// ==============================|| WORKSPACE DETAIL ||============================== //
const workSpaceAPI = new WorkSpaceAPI();
const socket = new SocketIo();
const socketClient = io.connect('http://localhost:3002');

const Detail = () => {
  const navigate = useNavigate();
  const { workSpaceId } = useParams();

  const [openWS, setOpenWS] = useState(false);
  const [openB, setOpenB] = useState(false);

  const [workspace, setWorkSpace] = useState({});
  const [member, setMember] = useState();

  const loadData = (id) => {
    workSpaceAPI.getById(id).then((result) => {
      setWorkSpace(result.data[0]);
      setMember(result.data[0].userIDs.length);
    });
  };

  const handleEditWS = () => {
    setOpenWS(true);
  };

  const handleCloseWS = () => {
    setOpenWS(false);
    loadData(workSpaceId);
  };

  const handleCreateB = () => {
    setOpenB(true);
  };

  const handleCloseB = () => {
    setOpenB(false);
  };

  const handleDeleteWS = (id) => {
    swal({
      title: 'Are you sure?',
      text: 'Once deleted, you will not be able to recover.',
      icon: 'warning',
      buttons: [true, 'Delete'],
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        workSpaceAPI
          .deleteById(id)
          .then((res) => {
            if (res.status === 200) {
              socket.workspace(res.data);

              //Thông báo thành công
              swal({
                text: 'Successfully delete work space.',
                buttons: false,
                timer: 2000,
                icon: 'success',
              });
              navigate(`/u/default`, { replace: true });
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

  useEffect(() => {
    loadData(workSpaceId);

    socketClient.on('edit_workspace', (data) => {
      setWorkSpace(data);
    });

    socketClient.on('delete_board', () => {
      loadData(workSpaceId);
    });
  }, [workSpaceId]);

  return (
    <>
      <Grid container justifyContent="space-between" alignItems="center" sx={{ px: 16, py: 6 }}>
        <Grid item display="flex" alignItems="center">
          {workspace.logo === '' ? (
            <BackgroundLetterAvatars name={workspace.name} h={80} w={80} f={50} />
          ) : (
            <Avatar src={workspace.logo} variant="rounded" sx={{ height: 80, width: 80 }} />
          )}

          <Typography variant="h1" sx={{ ml: 2 }}>
            {workspace.name}
          </Typography>
        </Grid>

        <Grid item display="flex" alignItems="center">
          <Typography variant="h2" sx={{ fontWeight: 500, mr: 2 }}>
            <IconUsers /> Member ({member})
          </Typography>

          <AnimateButton>
            <Button sx={{ mr: 2 }} disableElevation onClick={handleEditWS} variant="contained" color="primary">
              <IconPencil />
              Edit
            </Button>
          </AnimateButton>

          <AnimateButton>
            <Button
              disableElevation
              onClick={() => {
                handleDeleteWS(workSpaceId);
              }}
              variant="contained"
              color="primary"
            >
              <IconTrash />
              Delete
            </Button>
          </AnimateButton>
        </Grid>
      </Grid>

      <WSForm open={openWS} onClose={handleCloseWS} formData={workspace} dialogForm={1} />

      <BForm open={openB} onClose={handleCloseB} wsId={workSpaceId} dialogForm={0} />

      <MainCard sx={{ height: '100%' }}>
        <Typography variant="h2" sx={{ mb: 4, fontWeight: 500 }}>
          Your Boards
        </Typography>

        <Grid container spacing={2}>
          <Typography
            variant="h3"
            sx={{ cursor: 'pointer', bgcolor: 'rgba(128, 0, 128, 0.4)', ml: 4, mt: 4, px: 2, borderRadius: 4 }}
            height={100}
            display="flex"
            alignItems="center"
            onClick={handleCreateB}
          >
            Create a new board
          </Typography>

          <BoardList id={workSpaceId} />
        </Grid>
      </MainCard>
    </>
  );
};

export default Detail;
