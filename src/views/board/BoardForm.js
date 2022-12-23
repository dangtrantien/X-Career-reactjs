import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// material-ui
import { Button, OutlinedInput, Typography, Grid, Dialog, Box, DialogContent, Select, DialogTitle } from '@mui/material';

// icons/img

// project imports
import swal from 'sweetalert';
import BoardAPI from 'services/BoardAPI';
import WorkSpaceAPI from 'services/WorkSpaceAPI';
import AnimateButton from 'ui-component/extended/AnimateButton';
import InputFileButton from 'ui-component/extended/InputFileButton';
import DialogForm from 'ui-component/extended/DialogForm';
import EndcodeFileBase64 from 'utils/endcodeFileBase64';
import AutocompleteBtn from 'ui-component/extended/AutocompleteBtn';
import io from 'socket.io-client';
import { host } from 'services/baseAPI';

// ==============================|| BOARD FORM ||============================== //
const boardAPI = new BoardAPI();
const workSpaceAPI = new WorkSpaceAPI();
const socket = io(host, {
  transports: ['websocket'],
  withCredentials: true,
});

const BForm = (props) => {
  const { open, onClose, formData, wsId, dialogForm } = props;
  const navigate = useNavigate();
  const userId = sessionStorage.getItem('id');

  const [WSId, setWSId] = useState();

  const [board, setBoard] = useState({});
  const [workSpace, setWorkSpace] = useState([]);

  const [BMember, setBMember] = useState([]);
  const [WSMember, setWSMember] = useState([]);

  const handleClose = () => {
    onClose(!open);
  };

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setBoard({ ...board, [name]: value });
  };

  const handleWSChange = (event) => {
    setWSId(event.target.value);
  };

  const handleMemberChange = (event, value) => {
    setBMember(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const board = {
      name: data.get('name'),
      member: BMember,
    };

    //Kiểm tra có tên board hay không
    if (board.name === '') {
      swal({
        text: 'Board must have a name.',
        buttons: false,
        timer: 3000,
        icon: 'warning',
      });
    } else {
      if (data.get('_id') === '') {
        board.workSpaceID = WSId;

        boardAPI
          .createNew(board)
          .then((res) => {
            if (res.status === 200) {
              swal({
                text: 'Successfully create new board.',
                buttons: false,
                timer: 3000,
                icon: 'success',
              });

              setTimeout(() => {
                onClose(!open);
                navigate(`/b/${res.data._id}`, { replace: true });
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
        if (data.get('bgImg').name !== '') {
          //Convert file to base64 string
          const base64 = await EndcodeFileBase64(data.get('bgImg'));

          //Kiểm tra có đúng là image hay không
          if (base64.type.match(/[^:/]\w+\//)[0] === 'image/') {
            board.bgImg = base64;

            boardAPI
              .updateByID(data.get('_id'), board)
              .then((res) => {
                if (res.data.success === true) {
                  socket.emit('board', res.data.data);

                  //Thông báo thành công
                  swal({
                    text: 'Successfully update board.',
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
          boardAPI
            .updateByID(data.get('_id'), board)
            .then((res) => {
              if (res.data.success === true) {
                socket.emit('board', res.data.data);

                //Thông báo thành công
                swal({
                  text: 'Successfully update board.',
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
    workSpaceAPI.getAll().then((result) => {
      const ws = [];

      result.data.data.map((res) => {
        res.member.map((value) => {
          if (value._id === userId) {
            ws.push(res);
          }
        });
      });

      setWorkSpace(ws);
    });

    if (dialogForm === 0) {
      setBoard({
        _id: '',
        name: '',
        bgImg: {
          name: '',
          data: '',
        },
      });
      setWSId(wsId);
      setBMember([]);
    } else if (dialogForm === 1) {
      setBoard(formData);
      setBMember(formData.member);

      if (wsId !== undefined) {
        workSpaceAPI.getByID(wsId).then((result) => {
          setWSMember(result.data[0].member);
        });
      }
    }
  }, [userId, dialogForm, formData, wsId]);

  return (
    <Dialog open={open} onClose={handleClose} scroll="body">
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <DialogForm value={dialogForm} index={0} width={400}>
          <DialogTitle display="flex" justifyContent="center" sx={{ fontSize: 20, fontWeight: 700 }}>
            Create Table
          </DialogTitle>

          <DialogContent spacing={2} dividers>
            <Grid sx={{ display: 'none' }}>
              <Typography variant="h4">Id:</Typography>

              <OutlinedInput id="_id" name="_id" value={board._id} onChange={handleChange} variant="standard" />
            </Grid>

            <Grid container justifyContent="space-between" alignItems="center" sx={{ height: 70 }}>
              <Typography color="primary" variant="h5">
                Table title:
              </Typography>

              <OutlinedInput
                sx={{ width: 2 / 3 }}
                id="name"
                type="text"
                value={board.name}
                name="name"
                onChange={handleChange}
                placeholder="Enter table title"
              />
            </Grid>

            <Grid container justifyContent="space-between" alignItems="center" sx={{ height: 70 }}>
              <Typography color="primary" variant="h5">
                Working space:
              </Typography>

              <Select
                sx={{ width: 2 / 3 }}
                native
                id="workSpaceID"
                value={WSId}
                onChange={handleWSChange}
                inputProps={{ 'aria-label': 'Working space' }}
              >
                {WSId === undefined && <option>-- Choose a workspace --</option>}

                {workSpace.map((data) => (
                  <option key={data._id} value={data._id}>
                    {data.name}
                  </option>
                ))}
              </Select>
            </Grid>
          </DialogContent>
        </DialogForm>

        <DialogForm value={dialogForm} index={1} width={500}>
          <DialogTitle display="flex" justifyContent="center" sx={{ fontSize: 20, fontWeight: 700 }}>
            Edit Table
          </DialogTitle>

          <DialogContent spacing={2} dividers>
            <Grid sx={{ display: 'none' }}>
              <Typography variant="h4">Id:</Typography>

              <OutlinedInput id="_id" name="_id" value={board._id} onChange={handleChange} variant="standard" />
            </Grid>

            <Grid container alignItems="center">
              <Typography sx={{ mr: 12 }} color="primary" variant="h5">
                Background:
              </Typography>

              <InputFileButton defaultValue={board.bgImg && board.bgImg.data} name="bgImg" />
            </Grid>

            <Grid container justifyContent="space-between" alignItems="center" sx={{ height: 70 }}>
              <Typography color="primary" variant="h5">
                Table title:
              </Typography>

              <OutlinedInput
                sx={{ width: 2 / 3 }}
                id="name"
                type="text"
                value={board.name}
                name="name"
                onChange={handleChange}
                placeholder="Enter table title"
              />
            </Grid>

            <Grid>
              <Typography sx={{ mt: 2 }} color="primary" variant="h5">
                Add member to board:
              </Typography>

              <AutocompleteBtn options={WSMember} member={BMember} handleChange={handleMemberChange} />
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

BForm.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  formData: PropTypes.object,
  wsId: PropTypes.any,
  dialogForm: PropTypes.number.isRequired,
};

export default BForm;
