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
import AnimateButton from 'ui-component/extended/AnimateButton';
import BoardList from 'views/dashboard/BoardList';
import io from 'socket.io-client';
import { host } from 'services/baseAPI';

// ==============================|| WORKSPACE DETAIL ||============================== //
const workSpaceAPI = new WorkSpaceAPI();
const socket = io(host, {
  transports: ['websocket', 'polling'],
  withCredentials: true,
});

const Detail = () => {
  const { workSpaceId } = useParams();
  const navigate = useNavigate();

  const [openWS, setOpenWS] = useState(false);
  const [openB, setOpenB] = useState(false);

  const [workspace, setWorkSpace] = useState({});
  const [member, setMember] = useState();

  const loadData = (id) => {
    workSpaceAPI.getByID(id).then((result) => {
      setWorkSpace(result.data[0]);
      setMember(result.data[0].member.length);
    });
  };

  const handleEditWS = () => {
    setOpenWS(true);
  };

  const handleCreateB = () => {
    setOpenB(true);
  };

  const handleClose = () => {
    setOpenWS(false);
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
          .deleteByID(id)
          .then((res) => {
            if (res.status === 200) {
              socket.emit('workspace', res.data);

              //Thông báo thành công
              swal({
                text: 'Successfully delete work space.',
                buttons: false,
                timer: 2000,
                icon: 'success',
              });

              navigate(`/`, { replace: true });
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

    socket.on('workspace', () => {
      loadData(workSpaceId);
    });
  }, [workSpaceId]);

  return (
    <>
      <Grid container justifyContent="space-between" alignItems="center" sx={{ px: 16, py: 6 }}>
        <Grid item display="flex" alignItems="center">
          {workspace.logo && (
            <>
              {workspace.logo.data === '' ? (
                <BackgroundLetterAvatars name={workspace.name} h={80} w={80} f={50} />
              ) : (
                <Avatar src={workspace.logo.data} variant="rounded" sx={{ height: 80, width: 80 }} />
              )}
            </>
          )}

          <Typography variant="h1" sx={{ width: 300, ml: 2 }}>
            {workspace.name}
          </Typography>
        </Grid>

        <Grid item display="flex" alignItems="center">
          <Typography variant="h2" sx={{ fontWeight: 500, mr: 2 }}>
            <IconUsers /> Member ({member})
          </Typography>

          <AnimateButton>
            <Button
              sx={{ mr: 2 }}
              disableElevation
              onClick={handleEditWS}
              variant="contained"
              color="primary"
              startIcon={<IconPencil size={20} />}
            >
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
              startIcon={<IconTrash size={20} />}
            >
              Delete
            </Button>
          </AnimateButton>
        </Grid>
      </Grid>

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

      <WSForm open={openWS} onClose={handleClose} formData={workspace} dialogForm={1} />

      <BForm open={openB} onClose={handleClose} wsId={workSpaceId} dialogForm={0} />
    </>
  );
};

export default Detail;
