import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, ContentState, convertFromHTML, convertToRaw } from 'draft-js';
import draftToMarkdown from 'draftjs-to-markdown';
import '../../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

// material-ui
import { Button, OutlinedInput, Typography, Grid, Dialog, Box, DialogContent, MenuList, MenuItem, Checkbox, Chip } from '@mui/material';

// icons/img
import { IconAlignJustified, IconCreditCard, IconPaperclip, IconUser, IconUsers, IconClock, IconArrowBigRightLines } from '@tabler/icons';

// project imports
import swal from 'sweetalert';
import TaskAPI from '../../../services/TaskAPI';
import BoardAPI from '../../../services/BoardAPI';
import UploadAPI from '../../../services/UploadAPI';
import AnimateButton from '../../../ui-component/extended/AnimateButton';
import DialogForm from '../../../ui-component/extended/DialogForm';
import AutocompleteBtn from '../../../ui-component/extended/AutocompleteBtn';
import FileUpload from './FileUpload';
import MoveTaskBtn from '../../../ui-component/MenuButton/MoveTaskBtn';
import CalendarBtn from '../../../ui-component/MenuButton/CalendarBtn';
import io from 'socket.io-client';
import { host } from '../../../services/baseAPI';

// ==============================|| BOARD FORM ||============================== //
const taskAPI = new TaskAPI();
const boardAPI = new BoardAPI();
const uploadAPI = new UploadAPI();
const socket = io(host, {
  transports: ['websocket'],
  withCredentials: true,
});

const TForm = (props) => {
  const { open, onClose, formData, bId, status, dialogForm, formDataID } = props;

  const [taskForm, setTaskForm] = useState({});
  const [BId, setBId] = useState();
  const [Status, setStatus] = useState();

  const [editorState, setEditorState] = useState();
  const [describe, setDescribe] = useState();

  const [TMember, setTMember] = useState([]);
  const [BMember, setBMember] = useState([]);

  const [show, setShow] = useState();
  const [showMember, setShowMember] = useState(false);
  const [showAttach, setShowAttach] = useState(false);

  const [anchorElCalendar, setAnchorElCalendar] = useState(null);
  const openCalendar = Boolean(anchorElCalendar);

  const [anchorElTask, setAnchorElTask] = useState(null);
  const openMoveTask = Boolean(anchorElTask);

  const [check, setCheck] = useState(false);
  const [expiredDate, setExpiredDate] = useState();

  const handleClose = () => {
    onClose(!open);
  };

  const handleShowMember = (id) => {
    setShow(id);
    setShowMember(!showMember);
  };

  const handleCalendar = (event) => {
    setAnchorElCalendar(event.currentTarget);
  };

  const handleCloseCalendar = () => {
    setAnchorElCalendar(null);
  };

  const handleCheck = () => {
    setCheck(!check);
    setExpiredDate('done');
  };

  const handleShowAttach = (id) => {
    setShow(id);
    setShowAttach(!showAttach);
  };

  const handleMoveTask = (event) => {
    setAnchorElTask(event.currentTarget);
  };

  const handleCloseMoveTask = () => {
    setAnchorElTask(null);
  };

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setTaskForm({ ...taskForm, [name]: value });
  };

  const handleMemberChange = (event, value) => {
    setTMember(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const task = {
      task: data.get('task'),
      describe: describe,
      member: TMember,
    };

    if (taskForm.day) {
      task.day = {
        startTime: taskForm.day.startTime,
        expirationDate: taskForm.day.expirationDate,
        expirationTime: taskForm.day.expirationTime,
        expired: check === true ? 'done' : '',
      };
    }

    if (task.task === '') {
      swal({
        text: 'Please enter a title for the task.',
        buttons: false,
        timer: 3000,
        icon: 'info',
      });
    } else {
      if (data.get('_id') === '') {
        task.status = Status;
        task.boardID = BId;

        taskAPI
          .createNew(task)
          .then((res) => {
            if (res.data.success === true) {
              socket.emit('task', res.data.data);

              onClose(!open);
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
        taskAPI
          .updateByID(data.get('_id'), task)
          .then((res) => {
            if (res.data.success === true) {
              socket.emit('task', res.data.data);

              //Thông báo thành công
              swal({
                text: 'Successfully update task.',
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
  };

  useEffect(() => {
    if (dialogForm === 0) {
      setTaskForm({
        _id: '',
        task: '',
        day: {
          startTime: '',
          expirationDate: '',
          expirationTime: '',
          expired: '',
        },
      });
      setBId(bId);
      setStatus(status);
      setDescribe('');
      setTMember([]);
    } else if (dialogForm === 1) {
      setTaskForm(formData);
      setStatus(formData.status);
      setEditorState(EditorState.createWithContent(ContentState.createFromBlockArray(convertFromHTML(`<p>${formData.describe}</p>`))));
      setDescribe(formData.describe);

      if (bId !== undefined) {
        boardAPI.getByID(bId).then((result) => {
          setBMember(result.data[0].member);
        });
      }

      if (formData.member.length !== 0) {
        setTMember(formData.member);
        setShow(formData._id);
        setShowMember(true);
      } else {
        setShowMember(false);
      }

      uploadAPI.getFromTask().then((result) => {
        const arr = [];

        result.data.data.map((res) => {
          if (res.taskID._id === formData._id) {
            arr.push(res);
          }
        });

        if (arr.length !== 0) {
          setShow(formData._id);
          setShowAttach(true);
        } else {
          setShowAttach(false);
        }
      });

      if (formData._id === formDataID && formData.day) {
        if (formData.day.expired === 'done') {
          setCheck(true);
          setExpiredDate('done');
        } else {
          if (new Date().toLocaleDateString() > formData.day.expirationDate) {
            setExpiredDate('expired');
          } else if (new Date().toLocaleDateString() === formData.day.expirationDate) {
            if (new Date().getHours() > formData.day.expirationTime.split(':')[0]) {
              setExpiredDate('expired');
            } else if (new Date().getHours() === formData.day.expirationTime.split(':')[0]) {
              if (new Date().getMinutes() > formData.day.expirationTime.split(':')[1]) {
                setExpiredDate('expired');
              } else {
                setExpiredDate('');
              }
            } else {
              setExpiredDate('');
            }
          } else {
            setExpiredDate('');
          }
        }
      }
    }
  }, [dialogForm, formData, bId, status, formDataID]);

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="lg" scroll="body">
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <DialogContent>
          <DialogForm value={dialogForm} index={0}>
            <Grid sx={{ display: 'none' }}>
              <Typography variant="h4">Id:</Typography>

              <OutlinedInput id="_id" name="_id" value={taskForm._id} onChange={handleChange} variant="standard" />
            </Grid>

            <Grid container alignItems="center" sx={{ height: 70 }}>
              <Typography sx={{ mr: 6 }} color="primary" variant="h5">
                Task title:
              </Typography>

              <OutlinedInput
                id="task"
                type="text"
                value={taskForm.task}
                name="task"
                onChange={handleChange}
                placeholder="Enter task title"
              />
            </Grid>

            <Grid container alignItems="center" justifyContent="space-evenly" sx={{ mt: 4 }}>
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
          </DialogForm>

          <DialogForm value={dialogForm} index={1}>
            <Grid item display="flex">
              <Grid sx={{ width: 500, mr: 1 }}>
                <Grid sx={{ display: 'none' }}>
                  <Typography variant="h4">Id:</Typography>

                  <OutlinedInput id="_id" name="_id" value={taskForm._id} onChange={handleChange} variant="standard" />
                </Grid>

                <Grid item display="flex" alignItems="center">
                  <IconCreditCard />

                  <textarea id="task" className="task-title" value={taskForm.task} name="task" onChange={handleChange} />
                </Grid>

                {show === taskForm._id && showMember && (
                  <Grid>
                    <Grid container alignItems="center" sx={{ mt: 2, mb: 1 }}>
                      <IconUsers />

                      <Typography sx={{ ml: 1 }} color="primary" variant="h5">
                        Member:
                      </Typography>
                    </Grid>

                    <Grid sx={{ pl: 4, pr: 2 }}>
                      <AutocompleteBtn options={BMember} member={TMember} handleChange={handleMemberChange} />
                    </Grid>
                  </Grid>
                )}

                {taskForm.day && taskForm.day.startTime !== '' && taskForm.day.expirationDate !== '' && taskForm.day.expirationTime !== '' && (
                  <Grid container alignItems="center" sx={{ mt: 2, mb: 1 }}>
                    <Grid item display="flex" alignItems="center">
                      <IconClock />

                      <Typography sx={{ ml: 1 }} color="primary" variant="h5">
                        Expiration date:
                      </Typography>
                    </Grid>

                    <Checkbox checked={check} onChange={handleCheck} />

                    <Typography color="black" variant="h5">
                      {taskForm.day.startTime} - {taskForm.day.expirationDate} at {taskForm.day.expirationTime}
                      {check === false && expiredDate === 'expired' && <Chip sx={{ ml: 1 }} size="small" label="expired" color="error" />}
                      {check === true && expiredDate === 'done' && <Chip sx={{ ml: 1 }} size="small" label="done" color="success" />}
                    </Typography>
                  </Grid>
                )}

                <Grid>
                  <Grid container alignItems="center" sx={{ mt: 4 }}>
                    <IconAlignJustified />

                    <Typography sx={{ ml: 1 }} color="primary" variant="h5">
                      Describe:
                    </Typography>
                  </Grid>

                  <Grid sx={{ paddingLeft: 4 }}>
                    <Editor
                      editorState={editorState}
                      toolbarStyle={{ width: 439, border: '1px solid' }}
                      editorStyle={{
                        color: 'black',
                        border: '1px solid',
                        width: 450,
                        paddingRight: 10,
                        paddingLeft: 10,
                      }}
                      onEditorStateChange={(newState) => {
                        setEditorState(newState);
                        setDescribe(editorState && draftToMarkdown(convertToRaw(editorState.getCurrentContent())));
                      }}
                      toolbar={{
                        options: ['inline', 'fontSize', 'fontFamily', 'list', 'textAlign', 'embedded', 'emoji', 'image', 'history'],
                        list: { inDropdown: true },
                        textAlign: { inDropdown: true },
                        link: { inDropdown: true },
                      }}
                      placeholder="Add more detailed description..."
                    />
                  </Grid>
                </Grid>

                <Grid>
                  {show === taskForm._id && showAttach && (
                    <Grid container alignItems="center" sx={{ mt: 4 }}>
                      <IconPaperclip />

                      <Typography sx={{ ml: 1 }} color="primary" variant="h5">
                        Attachments:
                      </Typography>
                    </Grid>
                  )}

                  <FileUpload taskID={taskForm._id} show={showAttach} />
                </Grid>
              </Grid>

              <MenuList>
                <Typography variant="subtitle1" sx={{ mt: 4 }}>
                  Add to card
                </Typography>

                <MenuItem sx={{ mb: 2, boxShadow: 2 }} onClick={() => handleShowMember(taskForm._id)}>
                  <Grid sx={{ mr: 1 }}>
                    <IconUser size={16} />
                  </Grid>
                  Member
                </MenuItem>

                <MenuItem sx={{ mb: 2, boxShadow: 2 }} onClick={handleCalendar}>
                  <Grid sx={{ mr: 1 }}>
                    <IconClock size={16} />
                  </Grid>
                  Day
                </MenuItem>
                <CalendarBtn
                  task={taskForm}
                  anchorEl={anchorElCalendar}
                  open={openCalendar}
                  handleClose={handleCloseCalendar}
                  expiredDate={expiredDate}
                />

                <MenuItem sx={{ mb: 2, boxShadow: 2 }} onClick={() => handleShowAttach(taskForm._id)}>
                  <Grid sx={{ mr: 1 }}>
                    <IconPaperclip size={16} />
                  </Grid>
                  Attach
                </MenuItem>

                <Typography variant="subtitle1" sx={{ mt: 4 }}>
                  Manipulation
                </Typography>

                <MenuItem sx={{ mb: 2, boxShadow: 2 }} onClick={handleMoveTask}>
                  <Grid sx={{ mr: 1 }}>
                    <IconArrowBigRightLines size={16} />
                  </Grid>
                  Move
                </MenuItem>
                <MoveTaskBtn task={taskForm} anchorEl={anchorElTask} open={openMoveTask} handleClose={handleCloseMoveTask} />

                {/* <MenuItem sx={{ mb: 2, boxShadow: 2 }}>
                  <Grid sx={{ mr: 1 }}>
                    <IconArchive size={16} />
                  </Grid>
                  Storage
                </MenuItem> */}

                <AnimateButton>
                  <Button sx={{ mt: 4, ml: 3 }} disableElevation size="small" type="submit" variant="contained" color="primary">
                    Save
                  </Button>
                </AnimateButton>
              </MenuList>
            </Grid>
          </DialogForm>
        </DialogContent>
      </Box>
    </Dialog>
  );
};

TForm.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  formData: PropTypes.object,
  bId: PropTypes.any,
  status: PropTypes.number,
  dialogForm: PropTypes.number.isRequired,
  formDataID: PropTypes.any,
};

export default TForm;
