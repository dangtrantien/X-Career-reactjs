import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// material-ui
import { Avatar, Typography, Stack, Grid, Button } from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import WorkSpaceAPI from 'services/WorkSpaceAPI';
import List from './List';
import AnimateButton from 'ui-component/extended/AnimateButton';
import BackgroundLetterAvatars from 'ui-component/BackgroundLetterAvatar';

// ==============================|| DEFAULT DASHBOARD ||============================== //
const workSpaceAPI = new WorkSpaceAPI();

const Dashboard = () => {
  const navigate = useNavigate();
  const [workspace, setWorkSpace] = useState([]);

  const userId = sessionStorage.getItem('id');

  useEffect(() => {
    workSpaceAPI.getAll().then((result) => {
      const ws = [];

      result.data.data.map((res) => {
        if (res.userID._id === userId) {
          ws.push(res);
        }
      });

      setWorkSpace(ws);
    });
  }, [userId]);

  return (
    <>
      <Typography variant="h2" sx={{ mb: 3 }}>
        Your Work Spaces
      </Typography>

      <MainCard sx={{ height: '100%' }}>
        <Stack spacing={2}>
          {workspace.map((value) => (
            <Stack spacing={2} key={value._id} sx={{ mb: 4 }}>
              <Grid item display="flex" justifyContent="space-between" alignItems="center">
                <Grid container alignItems="center">
                  {value.logo === '' ? (
                    <BackgroundLetterAvatars name={value.name} h={50} w={50} f={30} />
                  ) : (
                    <Avatar src={value.logo} variant="rounded" />
                  )}

                  <Typography variant="h2" sx={{ ml: 1, fontWeight: 500 }}>
                    {value.name}
                  </Typography>
                </Grid>

                <AnimateButton>
                  <Button
                    disableElevation
                    onClick={() => navigate(`/w/${value._id}`, { replace: true })}
                    variant="contained"
                    color="primary"
                  >
                    Detail
                  </Button>
                </AnimateButton>
              </Grid>

              <List id={value._id} />
            </Stack>
          ))}
        </Stack>
      </MainCard>
    </>
  );
};

export default Dashboard;
