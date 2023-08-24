import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// material-ui
import { Avatar, Typography, Stack, Grid, Button, Divider } from '@mui/material';

// project imports
import MainCard from '../../ui-component/cards/MainCard';
import WorkSpaceAPI from '../../services/WorkSpaceAPI';
import BoardList from './BoardList';
import AnimateButton from '../../ui-component/extended/AnimateButton';
import BackgroundLetterAvatars from '../../ui-component/BackgroundLetterAvatar';
import WSForm from '../workspace/WorkSpaceForm';
import io from 'socket.io-client';
import { host } from '../../services/baseAPI';

// ==============================|| DEFAULT DASHBOARD ||============================== //
const workSpaceAPI = new WorkSpaceAPI();
const socket = io(host, {
  transports: ['websocket'],
  withCredentials: true,
});

const Dashboard = ({ page }) => {
  const navigate = useNavigate();
  const userId = sessionStorage.getItem('id');

  const [workspace, setWorkSpace] = useState([]);

  const [openWS, setOpenWS] = useState(false);

  const loadData = (id) => {
    workSpaceAPI.getAll().then((result) => {
      let arr = [];

      result.data.data.map((res) => {
        res.member.map((value) => {
          if (value._id === id) {
            arr.push(res);
          }
        });
      });

      setWorkSpace(arr);
    });
  };

  const handleCreateWS = () => {
    setOpenWS(true);
  };

  const handleCloseWS = () => {
    setOpenWS(false);
  };

  useEffect(() => {
    loadData(userId);

    socket.on('workspace', () => {
      loadData(userId);
    });
  }, [userId]);

  return (
    <>
      <Typography variant="h2" sx={{ mb: 3 }}>
        Your Work Spaces
      </Typography>

      <MainCard sx={{ height: '100%' }}>
        {workspace.length === 0 ? (
          <Grid container alignItems="center">
            <Typography variant="h4" sx={{ mr: 1 }}>
              You are not a member of any workspace.
            </Typography>

            <Typography
              variant="subtitle1"
              sx={{ cursor: 'pointer', textDecoration: 'underline', '&:hover': { color: '#90CAF9' } }}
              onClick={handleCreateWS}
            >
              Create a Workspace
            </Typography>
          </Grid>
        ) : (
          <Stack spacing={2}>
            {workspace.map((value) => (
              <div key={value._id}>
                <Stack spacing={2} sx={{ mb: 4 }}>
                  <Grid item display="flex" justifyContent="space-between" alignItems="center">
                    <Grid container alignItems="center">
                      {value.logo.data === '' ? (
                        <BackgroundLetterAvatars name={value.name} h={50} w={50} f={30} />
                      ) : (
                        <Avatar src={value.logo.data} variant="rounded" />
                      )}

                      <Typography variant="h2" sx={{ ml: 1, fontWeight: 500 }}>
                        {value.name}
                      </Typography>
                    </Grid>

                    <AnimateButton>
                      <Button
                        disableElevation
                        sx={{ width: 100 }}
                        onClick={() => navigate(`/w/detail/${value._id}`, { replace: true })}
                        variant="contained"
                        color="primary"
                      >
                        Detail
                      </Button>
                    </AnimateButton>
                  </Grid>

                  <Grid container spacing={2}>
                    <BoardList id={value._id} page={page} />
                  </Grid>
                </Stack>
                <Divider />
              </div>
            ))}
          </Stack>
        )}
      </MainCard>

      <WSForm open={openWS} onClose={handleCloseWS} dialogForm={0} />
    </>
  );
};

Dashboard.propTypes = {
  page: PropTypes.any,
};

export default Dashboard;
