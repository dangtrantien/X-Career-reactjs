import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Typography,
} from '@mui/material';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project imports
import AnimateButton from 'ui-component/extended/AnimateButton';
import { strengthColor, strengthIndicator } from 'utils/password-strength';

// assets
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

// components
import swal from 'sweetalert';
import UserAPI from 'services/UserAPI';
import bcrypt from 'bcryptjs';

// ============================|| JWT - CHANGE PASSWORD ||============================ //
const userAPI = new UserAPI();

const AuthChangePassword = ({ ...others }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const userId = sessionStorage.getItem('id');

  const [userPassword, setUserPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const [strength, setStrength] = useState(0);
  const [level, setLevel] = useState();

  const handleClickShowCurrentPassword = () => {
    setShowCurrentPassword(!showCurrentPassword);
  };

  const handleClickShowNewPassword = () => {
    setShowNewPassword(!showNewPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleChangePassword = (value) => {
    const temp = strengthIndicator(value);
    setStrength(temp);
    setLevel(strengthColor(temp));
  };

  useEffect(() => {
    handleChangePassword('');
    userAPI.getById(userId).then((res) => {
      setUserPassword(res.data[0].passwordHash);
    });
  }, [userId]);

  return (
    <>
      <Grid container direction="column" justifyContent="center" spacing={2}>
        <Grid item xs={12} container alignItems="center" justifyContent="center">
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle1">Change Password</Typography>
          </Box>
        </Grid>

        <Formik
          initialValues={{
            currentPassword: '',
            newPassword: '',
            submit: null,
          }}
          validationSchema={Yup.object().shape({
            currentPassword: Yup.string().max(255),
            newPassword: Yup.string().max(255),
          })}
          onSubmit={(values) => {
            const user = {
              password: values.newPassword,
            };

            const match = bcrypt.compareSync(values.currentPassword, userPassword);

            if (!match) {
              swal({
                text: "'Current Password' do not match.",
                buttons: false,
                timer: 3000,
                icon: 'error',
              });
            } else {
              if (values.newPassword.length < 7) {
                swal({
                  text: 'Password must have at least 7 characters.',
                  buttons: false,
                  timer: 4000,
                  icon: 'error',
                });
              } else {
                userAPI
                  .updateById(userId, user)
                  .then((res) => {
                    if (res.status === 200) {
                      //Thông báo thành công
                      swal({
                        text: 'Successfully change password.',
                        buttons: false,
                        timer: 3000,
                        icon: 'success',
                      });
                      setTimeout(() => {
                        navigate('/u', { replace: true });
                      }, 3000);
                    }
                  })
                  .catch(() => {
                    // Thông báo lỗi
                    swal({
                      text: 'Sorry, something went wrong. Please contact to admin for support.',
                      buttons: false,
                      timer: 5000,
                      icon: 'error',
                    });
                  });
              }
            }
          }}
        >
          {({ errors, handleBlur, handleChange, handleSubmit, touched, values }) => (
            <form noValidate onSubmit={handleSubmit} {...others}>
              <FormControl fullWidth error={Boolean(touched.password && errors.password)} sx={{ ...theme.typography.customInput }}>
                <InputLabel htmlFor="outlined-adornment-current-password">Current Password</InputLabel>
                <OutlinedInput
                  id="outlined-adornment-current-password"
                  type={showCurrentPassword ? 'text' : 'password'}
                  value={values.currentPassword}
                  name="currentPassword"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowCurrentPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                        size="large"
                      >
                        {showCurrentPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Current Password"
                  inputProps={{}}
                />
                {touched.password && errors.password && (
                  <FormHelperText error id="standard-weight-helper-text-current-password">
                    {errors.password}
                  </FormHelperText>
                )}
              </FormControl>

              <FormControl fullWidth error={Boolean(touched.password && errors.password)} sx={{ ...theme.typography.customInput }}>
                <InputLabel htmlFor="outlined-adornment-new-password">New Password</InputLabel>
                <OutlinedInput
                  id="outlined-adornment-new-password"
                  type={showNewPassword ? 'text' : 'password'}
                  value={values.newPassword}
                  name="newPassword"
                  label="New Password"
                  onBlur={handleBlur}
                  onChange={(e) => {
                    handleChange(e);
                    handleChangePassword(e.target.value);
                  }}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowNewPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                        size="large"
                      >
                        {showNewPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  }
                  inputProps={{}}
                />
                {touched.password && errors.password && (
                  <FormHelperText error id="standard-weight-helper-text-new-password">
                    {errors.password}
                  </FormHelperText>
                )}
              </FormControl>

              {strength !== 0 && (
                <FormControl fullWidth>
                  <Box sx={{ mb: 2 }}>
                    <Grid container spacing={2} alignItems="center">
                      <Grid item>
                        <Box style={{ backgroundColor: level?.color }} sx={{ width: 85, height: 8, borderRadius: '7px' }} />
                      </Grid>
                      <Grid item>
                        <Typography variant="subtitle1" fontSize="0.75rem">
                          {level?.label}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Box>
                </FormControl>
              )}

              {errors.submit && (
                <Box sx={{ mt: 3 }}>
                  <FormHelperText error>{errors.submit}</FormHelperText>
                </Box>
              )}

              <Box sx={{ mt: 2 }}>
                <AnimateButton>
                  <Button fullWidth size="large" type="submit" variant="contained" color="secondary">
                    Save
                  </Button>
                </AnimateButton>
              </Box>
            </form>
          )}
        </Formik>
      </Grid>
    </>
  );
};

export default AuthChangePassword;
