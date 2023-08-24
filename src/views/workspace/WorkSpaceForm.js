import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

// material-ui
import { Button, OutlinedInput, Typography, Grid, Dialog, Box, DialogContent, DialogTitle } from '@mui/material';

// icons

// project imports
import swal from 'sweetalert';
import WorkSpaceAPI from '../../services/WorkSpaceAPI';
import UserAPI from '../../services/UserAPI';
import AnimateButton from '../../ui-component/extended/AnimateButton';
import InputFileButton from '../../ui-component/extended/InputFileButton';
import DialogForm from '../../ui-component/extended/DialogForm';
import EndcodeFileBase64 from '../../utils/endcodeFileBase64';
import AutocompleteBtn from '../../ui-component/extended/AutocompleteBtn';
import io from 'socket.io-client';
import { host } from '../../services/baseAPI';

// ==============================|| WORKSPACE FORM ||============================== //
const workSpaceAPI = new WorkSpaceAPI();
const userAPI = new UserAPI();
const socket = io(host, {
  transports: ['websocket'],
  withCredentials: true,
});

const WSForm = (props) => {
  const { open, onClose, formData, dialogForm } = props;
  const navigate = useNavigate();

  const [workspace, setWorkSpace] = useState({});

  const [users, setUsers] = useState([]);
  const [member, setMember] = useState([]);

  const handleClose = () => {
    onClose(!open);
  };

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setWorkSpace({ ...workspace, [name]: value });
  };

  const handleMemberChange = (event, value) => {
    setMember(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const workSpace = {
      name: data.get('name'),
      member: member,
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
                onClose(!open);
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
          if (base64.type.match(/[^:/]\w+\//)[0] === 'image/') {
            workSpace.logo = base64;

            workSpaceAPI
              .updateByID(data.get('_id'), workSpace)
              .then((res) => {
                if (res.data.success === true) {
                  socket.emit('workspace', res.data.data);

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
            .updateByID(data.get('_id'), workSpace)
            .then((res) => {
              if (res.data.success === true) {
                socket.emit('workspace', res.data.data);

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
    if (dialogForm === 0) {
      setWorkSpace({
        _id: '',
        name: '',
        logo: {
          name: '',
          data: '',
        },
      });
      setMember([]);
    } else if (dialogForm === 1) {
      setWorkSpace(formData);
      setMember(formData.member);

      userAPI.getAll({ skip: 0, limit: 100, orderBy: 'name' }).then((res) => {
        setUsers(res.data.data);
      });
    }
  }, [dialogForm, formData]);

  return (
    <Dialog open={open} onClose={handleClose} scroll="body">
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <DialogForm value={dialogForm} index={0} width={400}>
          <DialogTitle display="flex" justifyContent="center" sx={{ fontSize: 20, fontWeight: 700 }}>
            Create Work Space
          </DialogTitle>

          <DialogContent spacing={2} dividers>
            <Grid sx={{ display: 'none' }}>
              <Typography variant="h4">Id:</Typography>

              <OutlinedInput id="_id" name="_id" value={workspace._id} onChange={handleChange} variant="standard" />
            </Grid>

            <Grid container justifyContent="space-between" alignItems="center" sx={{ height: 70 }}>
              <Typography color="primary" variant="h5">
                Work space name:
              </Typography>

              <OutlinedInput
                sx={{ width: 2 / 3 }}
                id="name"
                type="text"
                value={workspace.name}
                name="name"
                onChange={handleChange}
                placeholder="Enter work space name"
              />
            </Grid>
          </DialogContent>
        </DialogForm>

        <DialogForm value={dialogForm} index={1} width={500}>
          <DialogTitle display="flex" justifyContent="center" sx={{ fontSize: 20, fontWeight: 700 }}>
            Edit Work Space
          </DialogTitle>

          <DialogContent spacing={2} dividers>
            <Grid sx={{ display: 'none' }}>
              <Typography variant="h4">Id:</Typography>

              <OutlinedInput id="_id" name="_id" value={workspace._id} onChange={handleChange} variant="standard" />
            </Grid>

            <Grid container alignItems="center">
              <Typography sx={{ mr: 8 }} color="primary" variant="h5">
                Work space logo:
              </Typography>

              <InputFileButton defaultValue={workspace.logo && workspace.logo.data} logo={workspace.name} name="logo" />
            </Grid>

            <Grid container justifyContent="space-between" alignItems="center" sx={{ height: 70 }}>
              <Typography color="primary" variant="h5">
                Work space name:
              </Typography>

              <OutlinedInput
                sx={{ width: 2 / 3 }}
                id="name"
                type="text"
                value={workspace.name}
                name="name"
                onChange={handleChange}
                placeholder="Enter work space name"
              />
            </Grid>

            <Grid>
              <Typography sx={{ mt: 2 }} color="primary" variant="h5">
                Add member to workspace:
              </Typography>

              <AutocompleteBtn options={users} member={member} handleChange={handleMemberChange} />
            </Grid>
          </DialogContent>
        </DialogForm>

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
  );
};

WSForm.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  formData: PropTypes.object,
  dialogForm: PropTypes.number.isRequired,
};

export default WSForm;
