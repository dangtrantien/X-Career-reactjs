import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

// material-ui
import { Button, OutlinedInput, Typography, Grid, Dialog, Box, DialogContent, Autocomplete, TextField, Chip } from '@mui/material';

// icons

// project imports
import swal from 'sweetalert';
import PropTypes from 'prop-types';
import WorkSpaceAPI from 'services/WorkSpaceAPI';
import UserAPI from 'services/UserAPI';
import AnimateButton from 'ui-component/extended/AnimateButton';
import InputFileButton from 'ui-component/extended/InputFileButton';
import SocketIo from 'utils/socket.io';
import DialogForm from 'ui-component/extended/DialogForm';
import EndcodeFileBase64 from 'utils/endcodeFileBase64';

// ==============================|| WORKSPACE FORM ||============================== //
const workSpaceAPI = new WorkSpaceAPI();
const userAPI = new UserAPI();
const socket = new SocketIo();

const WSForm = (props) => {
  const { open, onClose, formData, dialogForm } = props;
  const navigate = useNavigate();
  const userID = sessionStorage.getItem('id');

  const [workspace, setWorkSpace] = useState({});

  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});
  const [member, setMember] = useState([]);

  const handleClose = () => {
    onClose(!open);
  };

  const handleChange = (event, value) => {
    const name = event.target.name;
    const data = event.target.value;
    setWorkSpace({ ...workspace, [name]: data });
    setMember(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const workSpace = {
      name: data.get('name'),
      userIDs: member,
    };

    //Kiểm tra có tên workspace hay không
    if (workSpace.name === '') {
      swal({
        text: 'Work space must have a name.',
        buttons: false,
        timer: 3000,
        icon: 'warning',
      });
    } else {
      if (data.get('_id') === '') {
        workSpaceAPI
          .createNew(workSpace)
          .then((res) => {
            if (res.status === 200) {
              swal({
                text: 'Successfully create new work space.',
                buttons: false,
                timer: 3000,
                icon: 'success',
              });

              setTimeout(() => {
                navigate(`/w/detail/${res.data._id}`, { replace: true });
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
        if (data.get('logo').name !== '') {
          //Convert file to base64 string
          const base64 = await EndcodeFileBase64(data.get('logo'));

          //Kiểm tra có đúng là image hay không
          if (base64.match(/[^:/]\w+\//)[0] === 'image/') {
            workSpace.logo = base64;

            workSpaceAPI
              .updateById(data.get('_id'), workSpace)
              .then((res) => {
                if (res.data.success === true) {
                  socket.workspace(res.data.data);

                  swal({
                    text: 'Successfully update work space.',
                    buttons: false,
                    timer: 2000,
                    icon: 'success',
                  });

                  setTimeout(() => {
                    onClose(!open);
                  }, 2000);
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
          workSpaceAPI
            .updateById(data.get('_id'), workSpace)
            .then((res) => {
              if (res.data.success === true) {
                socket.workspace(res.data.data);

                swal({
                  text: 'Successfully update work space.',
                  buttons: false,
                  timer: 2000,
                  icon: 'success',
                });

                setTimeout(() => {
                  onClose(!open);
                }, 2000);
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
    }
  };

  useEffect(() => {
    userAPI.getAll({ skip: 0, limit: 1000, orderBy: 'name' }).then((res) => {
      setUsers(res.data.data);

      res.data.data.map((value) => {
        if (value._id === userID) {
          setUser(value);
        }
      });
    });

    if (dialogForm === 0) {
      setWorkSpace({
        _id: '',
        name: '',
        logo: '',
      });
      setMember([]);
    } else if (dialogForm === 1) {
      setWorkSpace(formData);
      setMember(formData.userIDs);
    }
  }, [dialogForm, formData, userID]);

  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <DialogContent spacing={2}>
            <DialogForm value={dialogForm} index={0}>
              <Grid sx={{ display: 'none' }}>
                <Typography variant="h4">Id:</Typography>

                <OutlinedInput id="_id" name="_id" value={workspace._id} onChange={handleChange} variant="standard" />
              </Grid>

              <Grid container alignItems="center" sx={{ height: 70 }}>
                <Typography sx={{ mr: 2 }} color="primary" variant="h5">
                  Work space name:
                </Typography>

                <OutlinedInput
                  id="name"
                  type="text"
                  value={workspace.name}
                  name="name"
                  onChange={handleChange}
                  placeholder="Enter work space name"
                />
              </Grid>
            </DialogForm>

            <DialogForm value={dialogForm} index={1}>
              <Grid sx={{ display: 'none' }}>
                <Typography variant="h4">Id:</Typography>

                <OutlinedInput id="_id" name="_id" value={workspace._id} onChange={handleChange} variant="standard" />
              </Grid>

              <Grid container alignItems="center">
                <Typography sx={{ mr: 2 }} color="primary" variant="h5">
                  Work space logo:
                </Typography>

                <InputFileButton defaultValue={workspace.logo} logo={workspace.name} name="logo" type="image" />
              </Grid>

              <Grid container alignItems="center" sx={{ height: 70 }}>
                <Typography sx={{ mr: 2 }} color="primary" variant="h5">
                  Work space name:
                </Typography>

                <OutlinedInput
                  id="name"
                  type="text"
                  value={workspace.name}
                  name="name"
                  onChange={handleChange}
                  placeholder="Enter work space name"
                />
              </Grid>

              <Grid>
                <Typography sx={{ mr: 2 }} color="primary" variant="h5">
                  Add member to workspace:
                </Typography>

                <Autocomplete
                  sx={{ mt: 2 }}
                  multiple
                  filterSelectedOptions
                  limitTags={2}
                  id="userIDs"
                  value={member}
                  onChange={handleChange}
                  options={users}
                  getOptionLabel={(option) => option.name}
                  getOptionDisabled={(option) => option === user}
                  renderTags={(tagValue, getTagProps) =>
                    tagValue.map((option, index) => <Chip label={option.name} {...getTagProps({ index })} disabled={user} />)
                  }
                  renderInput={(params) => <TextField {...params} label="Search..." />}
                />
              </Grid>
            </DialogForm>

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

WSForm.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  formData: PropTypes.object,
  dialogForm: PropTypes.number,
};

export default WSForm;
