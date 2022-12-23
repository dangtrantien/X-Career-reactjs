import { useEffect, useState } from 'react';
import { useParams } from 'react-router';

// material-ui
import { Avatar, Button, Typography, Grid, ButtonGroup } from '@mui/material';

// project import
import UserAPI from 'services/UserAPI';
import EditProfile from './EditProfile';
import PersonalInfo from './PersonalInfomation';
import Work from './Work';
import io from 'socket.io-client';
import { host } from 'services/baseAPI';

// ==============================|| USER PROFILE PAGE ||============================== //
const userAPI = new UserAPI();
const socket = io(host, {
  transports: ['websocket'],
  withCredentials: true,
});

const Profile = () => {
  const { userId } = useParams();
  const userID = sessionStorage.getItem('id');

  const [user, setUser] = useState({});

  const [show, setShow] = useState(true);
  const [edit, setEdit] = useState(false);

  const loadData = (id) => {
    userAPI.getByID(id).then((res) => setUser(res.data[0]));

    if (userId !== userID) {
      setShow(false);
    }
  };

  const handleInfo = () => {
    setShow(true);
  };

  const handleWork = () => {
    setShow(false);
  };

  const handleEdit = () => {
    setEdit(true);
  };

  const handleClose = () => {
    setEdit(false);
  };

  useEffect(() => {
    loadData(userId);

    socket.on('user', () => {
      loadData(userId);
    });
  }, [userId]);

  return (
    <Grid>
      <Grid container direction="column" alignItems="center" sx={{ bgcolor: 'rgba(128, 128, 128, 0.1)' }}>
        <Grid container justifyContent="center" alignItems="center" sx={{ my: 5 }}>
          <Avatar alt="profile user" src={user.avatar && user.avatar.data} sx={{ height: 120, width: 120, mr: 2 }} />

          <Typography variant="h1">{user.name}</Typography>
        </Grid>

        <ButtonGroup variant="text" aria-label="text button group" sx={{ width: '100%', justifyContent: 'center' }}>
          <Button disableElevation onClick={handleInfo}>
            Personal Infomation
          </Button>

          <Button disableElevation onClick={handleWork}>
            Work
          </Button>

          <Button disableElevation disabled={userId === userID ? false : true} onClick={handleEdit}>
            Edit Profile
          </Button>
        </ButtonGroup>
      </Grid>

      {show === true ? <PersonalInfo /> : <Work />}

      <EditProfile open={edit} onClose={handleClose} formData={user} />
    </Grid>
  );
};

export default Profile;
