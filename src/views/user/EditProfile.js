import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

// material-ui
import {
  Box,
  Button,
  OutlinedInput,
  Typography,
  Grid,
  FormControlLabel,
  Radio,
  RadioGroup,
  Dialog,
  DialogTitle,
  DialogContent,
} from '@mui/material';

// project import
import swal from 'sweetalert';
import UserAPI from '../../services/UserAPI';
import InputFileButton from '../../ui-component/extended/InputFileButton';
import EndcodeFileBase64 from '../../utils/endcodeFileBase64';
import AnimateButton from '../../ui-component/extended/AnimateButton';
import io from 'socket.io-client';
import { host } from '../../services/baseAPI';

// ==============================|| EDIT USER PROFILE PAGE ||============================== //
const userAPI = new UserAPI();
const socket = io(host, {
  transports: ['websocket'],
  withCredentials: true,
});

const EditProfile = (props) => {
  const { open, onClose, formData } = props;
  const [user, setUser] = useState({});

  const handleClose = () => {
    onClose(!open);
  };

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const editUser = {
      name: data.get('name'),
      email: data.get('email'),
      gender: data.get('gender'),
      group: data.get('group'),
      position: data.get('position'),
      address: data.get('address'),
    };

    let re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (editUser.name === '') {
      swal({
        text: 'Name is required.',
        buttons: false,
        timer: 2000,
        icon: 'warning',
      });
    } else if (editUser.email === '' || !re.test(editUser.email)) {
      swal({
        text: 'Email is required and must be a valid email.',
        buttons: false,
        timer: 3000,
        icon: 'warning',
      });
    } else {
      if (data.get('avatar').name !== '') {
        //Convert file to base64 string
        const base64 = await EndcodeFileBase64(data.get('avatar'));

        //Kiểm tra có đúng là image hay không
        if (base64.type.match(/[^:/]\w+\//)[0] === 'image/') {
          editUser.avatar = base64;

          userAPI
            .updateByID(user._id, editUser)
            .then((res) => {
              if (res.data.success === true) {
                socket.emit('user', res.data.data);

                swal({
                  text: 'Successfully updated profile.',
                  buttons: false,
                  timer: 3000,
                  icon: 'success',
                });
                setTimeout(() => {
                  onClose(!open);
                }, 3000);
              }
            })
            .catch(() => {
              swal({
                text: 'Sorry, something went wrong. Please contact to admin for support.',
                buttons: false,
                timer: 5000,
                icon: 'error',
              });
            });
        } else {
          swal({
            text: "Wrong file's type, please choose only image.",
            buttons: false,
            timer: 3000,
            icon: 'warning',
          });
        }
      } else {
        userAPI
          .updateByID(user._id, editUser)
          .then((res) => {
            if (res.data.success === true) {
              socket.emit('user', res.data.data);

              swal({
                text: 'Successfully updated profile.',
                buttons: false,
                timer: 3000,
                icon: 'success',
              });
              setTimeout(() => {
                onClose(!open);
              }, 3000);
            }
          })
          .catch(() => {
            swal({
              text: 'Sorry, something went wrong. Please contact to admin for support.',
              buttons: false,
              timer: 5000,
              icon: 'error',
            });
          });
      }
    }
  };

  useEffect(() => {
    setUser(formData);
  }, [formData]);

  return (
    <>
      <Dialog open={open} onClose={handleClose} scroll="body">
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, width: 500 }}>
          <DialogTitle sx={{ textAlign: 'center' }} color="primary" variant="h2">
            Edit profile
          </DialogTitle>

          <DialogContent spacing={2} dividers>
            <Grid container alignItems="center">
              <Typography sx={{ mr: 15 }} color="primary" variant="h5">
                Avatar:
              </Typography>

              <InputFileButton defaultValue={user.avatar && user.avatar.data} name="avatar" />
            </Grid>

            <Grid container justifyContent="space-between" alignItems="center" sx={{ height: 70 }}>
              <Typography color="primary" variant="h5">
                Display name:
              </Typography>

              <OutlinedInput
                sx={{ width: 2 / 3 }}
                id="name"
                type="text"
                value={user.name}
                name="name"
                onChange={handleChange}
                placeholder="Enter display name"
              />
            </Grid>

            <Grid container justifyContent="space-between" alignItems="center" sx={{ height: 70 }}>
              <Typography color="primary" variant="h5">
                Email address:
              </Typography>

              <OutlinedInput
                sx={{ width: 2 / 3 }}
                id="email"
                type="email"
                value={user.email}
                name="email"
                onChange={handleChange}
                placeholder="Enter email address"
              />
            </Grid>

            <Grid container alignItems="center" sx={{ height: 70 }}>
              <Typography sx={{ mr: 15 }} color="primary" variant="h5">
                Gender:
              </Typography>

              <RadioGroup row name="gender" value={user.gender} onChange={handleChange}>
                <FormControlLabel value="Female" control={<Radio />} label="Female" />
                <FormControlLabel value="Male" control={<Radio />} label="Male" />
              </RadioGroup>
            </Grid>

            <Grid container justifyContent="space-between" alignItems="center" sx={{ height: 70 }}>
              <Typography color="primary" variant="h5">
                Group:
              </Typography>

              <OutlinedInput
                sx={{ width: 2 / 3 }}
                id="group"
                type="text"
                value={user.group}
                name="group"
                onChange={handleChange}
                placeholder="Enter group"
              />
            </Grid>

            <Grid container justifyContent="space-between" alignItems="center" sx={{ height: 70 }}>
              <Typography color="primary" variant="h5">
                Position:
              </Typography>

              <OutlinedInput
                sx={{ width: 2 / 3 }}
                id="position"
                type="text"
                value={user.position}
                name="position"
                onChange={handleChange}
                placeholder="Enter position"
              />
            </Grid>

            <Grid container justifyContent="space-between" alignItems="center" sx={{ height: 70 }}>
              <Typography color="primary" variant="h5">
                Address:
              </Typography>

              <OutlinedInput
                sx={{ width: 2 / 3 }}
                id="address"
                type="text"
                name="address"
                value={user.address}
                onChange={handleChange}
                placeholder="Enter address"
              />
            </Grid>
          </DialogContent>

          <Grid container alignItems="center" justifyContent="space-around" sx={{ my: 2 }}>
            <AnimateButton>
              <Button disableElevation size="large" onClick={handleClose} variant="contained" color="secondary">
                Cancel
              </Button>
            </AnimateButton>

            <AnimateButton>
              <Button disableElevation size="large" type="submit" variant="contained" color="primary">
                Save
              </Button>
            </AnimateButton>
          </Grid>
        </Box>
      </Dialog>
    </>
  );
};

EditProfile.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  formData: PropTypes.object.isRequired,
};

export default EditProfile;
