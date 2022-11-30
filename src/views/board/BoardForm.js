import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// material-ui
import { Button, OutlinedInput, Typography, Grid, Dialog, Box, DialogContent, Select } from '@mui/material';

// icons/img

// project imports
import swal from 'sweetalert';
import PropTypes from 'prop-types';
import BoardAPI from 'services/BoardAPI';
import WorkSpaceAPI from 'services/WorkSpaceAPI';
import AnimateButton from 'ui-component/extended/AnimateButton';
import InputFileButton from 'ui-component/extended/InputFileButton';
import SocketIo from 'utils/socket.io';
import DialogForm from 'ui-component/extended/DialogForm';
import EndcodeFileBase64 from 'utils/endcodeFileBase64';

// ==============================|| BOARD FORM ||============================== //
const boardAPI = new BoardAPI();
const workSpaceAPI = new WorkSpaceAPI();
const socket = new SocketIo();

const BForm = (props) => {
  const { open, onClose, formData, wsId, dialogForm } = props;
  const navigate = useNavigate();

  const [board, setBoard] = useState({});
  const [workSpace, setWorkSpace] = useState([]);
  const [WSId, setWSId] = useState();

  const userId = sessionStorage.getItem('id');

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const board = {
      name: data.get('name'),
      workSpaceID: WSId,
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
        if (board.workSpaceID === undefined) {
          swal({
            text: 'Please choose working space for board.',
            buttons: false,
            timer: 3000,
            icon: 'warning',
          });
        } else {
          boardAPI
            .createNew(board)
            .then((res) => {
              if (res.status === 200) {
                swal({
                  text: 'Successfully create new playlist.',
                  buttons: false,
                  timer: 3000,
                  icon: 'success',
                });

                setTimeout(() => {
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
        }
      } else {
        if (data.get('bgImg').name !== '') {
          //Convert file to base64 string
          const base64 = await EndcodeFileBase64(data.get('bgImg'));

          //Kiểm tra có đúng là image hay không
          if (base64.match(/[^:/]\w+\//)[0] === 'image/') {
            board.bgImg = base64;

            boardAPI
              .updateById(data.get('_id'), board)
              .then((res) => {
                if (res.data.success === true) {
                  socket.board(res.data.data);

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
            .updateById(data.get('_id'), board)
            .then((res) => {
              if (res.data.success === true) {
                socket.board(res.data.data);

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
        if (res.userID._id === userId) {
          ws.push(res);
        }
      });

      setWorkSpace(ws);
    });
  }, [userId]);

  useEffect(() => {
    if (dialogForm === 0) {
      setBoard({
        _id: '',
        name: '',
        workSpaceID: '',
        bgImg: '',
      });
    } else if (dialogForm === 1) {
      setBoard(formData);
      setWSId(wsId);
    }
  }, [dialogForm, formData, wsId]);

  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <DialogContent spacing={2}>
            <DialogForm value={dialogForm} index={0}>
              <Grid sx={{ display: 'none' }}>
                <Typography variant="h4">Id:</Typography>

                <OutlinedInput id="_id" name="_id" value={board._id} onChange={handleChange} variant="standard" />
              </Grid>

              <Grid container alignItems="center" sx={{ height: 70 }}>
                <Typography sx={{ mr: 6 }} color="primary" variant="h5">
                  Table title:
                </Typography>

                <OutlinedInput
                  id="name"
                  type="text"
                  value={board.name}
                  name="name"
                  onChange={handleChange}
                  placeholder="Enter table title"
                />
              </Grid>

              <Grid container alignItems="center" sx={{ height: 70 }}>
                <Typography sx={{ mr: 2 }} color="primary" variant="h5">
                  Working space:
                </Typography>

                <Select native id="workSpaceID" value={WSId} onChange={handleWSChange} inputProps={{ 'aria-label': 'Working space' }}>
                  <option label="Choose working space" value="Choose working space" />
                  {workSpace.map((data) => (
                    <option key={data._id} value={data._id}>
                      {data.name}
                    </option>
                  ))}
                </Select>
              </Grid>
            </DialogForm>

            <DialogForm value={dialogForm} index={1}>
              <Grid sx={{ display: 'none' }}>
                <Typography variant="h4">Id:</Typography>

                <OutlinedInput id="_id" name="_id" value={board._id} onChange={handleChange} variant="standard" />
              </Grid>

              <Grid container alignItems="center">
                <Typography sx={{ mr: 4 }} color="primary" variant="h5">
                  Background:
                </Typography>

                <InputFileButton defaultValue={board.bgImg} name="bgImg" type="image" />
              </Grid>

              <Grid container alignItems="center" sx={{ height: 70 }}>
                <Typography sx={{ mr: 6 }} color="primary" variant="h5">
                  Table title:
                </Typography>

                <OutlinedInput
                  id="name"
                  type="text"
                  value={board.name}
                  name="name"
                  onChange={handleChange}
                  placeholder="Enter table title"
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

BForm.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  formData: PropTypes.object,
  wsId: PropTypes.any,
  dialogForm: PropTypes.number,
};

export default BForm;
