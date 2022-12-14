import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

// material-ui
import {
  Box,
  Button,
  OutlinedInput,
  Typography,
  Divider,
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
import UserAPI from 'services/UserAPI';
import InputFileButton from 'ui-component/extended/InputFileButton';
import EndcodeFileBase64 from 'utils/endcodeFileBase64';
import AnimateButton from 'ui-component/extended/AnimateButton';
import io from 'socket.io-client';
import { host } from 'services/baseAPI';

// ==============================|| EDIT USER PROFILE PAGE ||============================== //
const userAPI = new UserAPI();
const socket = io(host);

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
  };

  useEffect(() => {
    setUser(formData);
  }, [formData]);

  return (
    <>
      <Dialog open={open} onClose={handleClose} scroll="body">
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <DialogTitle sx={{ textAlign: 'center' }} color="primary" variant="h2">
            Edit profile
          </DialogTitle>
          <Divider sx={{ borderBottom: '1px solid' }} />

          <DialogContent spacing={2}>
            <Grid container alignItems="center">
              <Typography sx={{ mr: 9 }} color="primary" variant="h5">
                Avatar:
              </Typography>

              <InputFileButton defaultValue={user.avatar.data} name="avatar" />
            </Grid>

            <Grid container alignItems="center" sx={{ height: 70 }}>
              <Typography sx={{ mr: 2 }} color="primary" variant="h5">
                Display name:
              </Typography>

              <OutlinedInput id="name" type="text" value={user.name} name="name" onChange={handleChange} placeholder="Enter display name" />
            </Grid>

            <Grid container alignItems="center" sx={{ height: 70 }}>
              <Typography sx={{ mr: 2 }} color="primary" variant="h5">
                Email address:
              </Typography>

              <OutlinedInput
                id="email"
                type="email"
                value={user.email}
                name="email"
                onChange={handleChange}
                placeholder="Enter email address"
              />
            </Grid>

            <Grid container alignItems="center" sx={{ height: 70 }}>
              <Typography sx={{ mr: 8 }} color="primary" variant="h5">
                Gender:
              </Typography>

              <RadioGroup row name="gender" value={user.gender} onChange={handleChange}>
                <FormControlLabel value="Female" control={<Radio />} label="Female" />
                <FormControlLabel value="Male" control={<Radio />} label="Male" />
              </RadioGroup>
            </Grid>

            <Grid container alignItems="center" sx={{ height: 70 }}>
              <Typography sx={{ mr: 8 }} color="primary" variant="h5">
                Group:
              </Typography>

              <OutlinedInput id="group" type="text" value={user.group} name="group" onChange={handleChange} placeholder="Enter group" />
            </Grid>

            <Grid container alignItems="center" sx={{ height: 70 }}>
              <Typography sx={{ mr: 6 }} color="primary" variant="h5">
                Position:
              </Typography>

              <OutlinedInput
                id="position"
                type="text"
                value={user.position}
                name="position"
                onChange={handleChange}
                placeholder="Enter position"
              />
            </Grid>

            <Grid container alignItems="center" sx={{ height: 70 }}>
              <Typography sx={{ mr: 6 }} color="primary" variant="h5">
                Address:
              </Typography>

              <OutlinedInput
                id="address"
                type="text"
                name="address"
                value={user.address}
                onChange={handleChange}
                placeholder="Enter address"
              />
            </Grid>

            <Grid container alignItems="center" justifyContent="space-around" sx={{ mt: 4 }}>
              <AnimateButton sx={{ mr: 4 }}>
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
          </DialogContent>
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
