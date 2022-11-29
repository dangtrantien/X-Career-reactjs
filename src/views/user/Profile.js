import { useEffect, useState } from 'react';

// material-ui
import { Avatar, Button, Typography, Divider, Grid, Stack } from '@mui/material';

// project import
import UserAPI from 'services/UserAPI';
import AnimateButton from 'ui-component/extended/AnimateButton';
import EditProfile from './EditProfile';

// ==============================|| USER PROFILE PAGE ||============================== //
const userAPI = new UserAPI();

const Profile = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [user, setUser] = useState({
    name: '',
    email: '',
    avatar: '',
    gender: '',
    group: '',
    position: '',
    address: '',
  });

  const userId = sessionStorage.getItem('id');

  const loadData = (id) => {
    userAPI.getById(id).then((res) => setUser(res.data[0]));
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    loadData(userId);
  };

  useEffect(() => {
    loadData(userId);
  }, [userId]);

  return (
    <>
      <Grid container width="100%">
        <Grid
          container
          direction="column"
          justifyContent="space-between"
          alignItems="center"
          sx={{ width: '100%', height: '50%', bgcolor: 'rgba(128, 128, 128, 0.1)' }}
        >
          <Grid container justifyContent="center" alignItems="center" sx={{ pt: 15 }}>
            <Avatar alt="profile user" src={user.avatar} sx={{ height: 120, width: 120, mr: 2 }} />

            <Grid item sx={{ mr: 2 }}>
              <Stack spacing={2}>
                <Typography color="grey[900]" variant="h1">
                  {user.name === undefined ? user.email : user.name}
                </Typography>

                <Typography variant="h5" color="secondary">
                  ID: {userId}
                </Typography>
              </Stack>
            </Grid>
          </Grid>

          <Grid container justifyContent="space-between" alignItems="center" sx={{ width: '100%', pt: 5, px: 50 }}>
            <Typography color="primary" variant="h2">
              Personal Information
            </Typography>

            <AnimateButton>
              <Button disableElevation onClick={handleOpenDialog} variant="contained" color="primary">
                Edit Profile
              </Button>
            </AnimateButton>
          </Grid>
        </Grid>

        <EditProfile open={openDialog} onClose={handleCloseDialog} formData={user} />

        <Grid item sx={{ width: '100%', mt: 5, px: 50 }}>
          <Stack spacing={2} sx={{ mx: 10 }}>
            <Grid container alignItems="center">
              <Typography sx={{ mr: 2 }} color="primary" variant="h5">
                Display name:
              </Typography>

              <Typography variant="h5">{user.name === undefined ? user.email : user.name}</Typography>
            </Grid>
            <Divider sx={{ borderBottom: '1px solid' }} />

            <Grid container alignItems="center">
              <Typography sx={{ mr: 8 }} color="primary" variant="h5">
                Email:
              </Typography>

              <Typography variant="h5">{user.email}</Typography>
            </Grid>
            <Divider sx={{ borderBottom: '1px solid' }} />

            <Grid container alignItems="center">
              <Typography sx={{ mr: 7 }} color="primary" variant="h5">
                Gender:
              </Typography>

              <Typography variant="h5">{user.gender}</Typography>
            </Grid>
            <Divider sx={{ borderBottom: '1px solid' }} />

            <Grid container alignItems="center">
              <Typography sx={{ mr: 8 }} color="primary" variant="h5">
                Group:
              </Typography>

              <Typography variant="h5">{user.group}</Typography>
            </Grid>
            <Divider sx={{ borderBottom: '1px solid' }} />

            <Grid container alignItems="center">
              <Typography sx={{ mr: 6 }} color="primary" variant="h5">
                Position:
              </Typography>

              <Typography variant="h5">{user.position}</Typography>
            </Grid>
            <Divider sx={{ borderBottom: '1px solid' }} />

            <Grid container alignItems="center">
              <Typography sx={{ mr: 6 }} color="primary" variant="h5">
                Address:
              </Typography>

              <Typography variant="h5">{user.address}</Typography>
            </Grid>
          </Stack>
        </Grid>
      </Grid>
    </>
  );
};

export default Profile;
