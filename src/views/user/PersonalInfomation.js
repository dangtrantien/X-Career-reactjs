import { useEffect, useState } from 'react';
import { useParams } from 'react-router';

// material-ui
import { Typography, Divider, Grid, Stack } from '@mui/material';

// project import
import UserAPI from '../../services/UserAPI';
import io from 'socket.io-client';
import { host } from '../../services/baseAPI';

// ==============================|| PERSONAL INFOMATION ||============================== //
const userAPI = new UserAPI();
const socket = io(host, {
  transports: ['websocket'],
  withCredentials: true,
});

const PersonalInfo = () => {
  const { userId } = useParams();

  const [user, setUser] = useState({});

  const loadData = (id) => {
    userAPI.getByID(id).then((res) => setUser(res.data[0]));
  };

  useEffect(() => {
    loadData(userId);

    socket.on('user', () => {
      loadData(userId);
    });
  }, [userId]);

  return (
    <Grid sx={{ my: 5, px: 45 }}>
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
        <Divider sx={{ borderBottom: '1px solid' }} />
      </Stack>
    </Grid>
  );
};

export default PersonalInfo;
