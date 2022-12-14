import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import { convertToRaw } from 'draft-js';
import draftToMarkdown from 'draftjs-to-markdown';
import '../../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

// material-ui
import { Button, OutlinedInput, Typography, Grid, Dialog, Box, DialogContent, MenuList, MenuItem } from '@mui/material';

// icons/img
import {
  IconAlignJustified,
  IconCreditCard,
  IconListDetails,
  IconPaperclip,
  IconUser,
  IconUsers,
  IconClock,
  IconArrowBigRightLines,
  IconArchive,
} from '@tabler/icons';

// project imports
import swal from 'sweetalert';
import TaskAPI from 'services/TaskAPI';
import BoardAPI from 'services/BoardAPI';
import AnimateButton from 'ui-component/extended/AnimateButton';
import DialogForm from 'ui-component/extended/DialogForm';
import AutocompleteBtn from 'ui-component/extended/AutocompleteBtn';
import CForm from './comment/CommentForm';
import io from 'socket.io-client';
import { host } from 'services/baseAPI';
import FileUpload from './FileUpload';

// ==============================|| BOARD FORM ||============================== //
const taskAPI = new TaskAPI();
const boardAPI = new BoardAPI();
const socket = io(host);

const TForm = (props) => {
  const { open, onClose, formData, bId, status, dialogForm } = props;

  const [task, setTask] = useState({});
  const [BId, setBId] = useState();
  const [Status, setStatus] = useState();

  const [editorState, setEditorState] = useState();
  const [describe, setDescribe] = useState();

  const [TMember, setTMember] = useState([]);
  const [BMember, setBMember] = useState([]);

  const [show, setShow] = useState();
  const [showMember, setShowMember] = useState(false);
  const [showAttach, setShowAttach] = useState(false);

  const handleClose = () => {
    onClose(!open);
  };

  const handleShowMember = (id) => {
    setShow(id);
    setShowMember(!showMember);
  };

  const handleShowAttach = (id) => {
    setShow(id);
    setShowAttach(!showAttach);
  };

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setTask({ ...task, [name]: value });
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
      setTask({
        _id: '',
        task: '',
      });
      setBId(bId);
      setStatus(status);
      setDescribe('');
      setTMember([]);
    } else if (dialogForm === 1) {
      setTask(formData);
      setStatus(formData.status);
      setDescribe(formData.describe);
      setTMember(formData.member);

      if (bId !== undefined) {
        boardAPI.getByID(bId).then((result) => {
          setBMember(result.data[0].member);
        });
      }

      socket.on('upload', () => {
        setShowAttach(true);
      });
    }
  }, [dialogForm, formData, bId, status]);

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="lg" scroll="body">
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <DialogContent>
          <DialogForm value={dialogForm} index={0}>
            <Grid sx={{ display: 'none' }}>
              <Typography variant="h4">Id:</Typography>

              <OutlinedInput id="_id" name="_id" value={task._id} onChange={handleChange} variant="standard" />
            </Grid>

            <Grid container alignItems="center" sx={{ height: 70 }}>
              <Typography sx={{ mr: 6 }} color="primary" variant="h5">
                Task title:
              </Typography>

              <OutlinedInput id="task" type="text" value={task.task} name="task" onChange={handleChange} placeholder="Enter task title" />
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

                  <OutlinedInput id="_id" name="_id" value={task._id} onChange={handleChange} variant="standard" />
                </Grid>

                <Grid item display="flex" alignItems="center">
                  <IconCreditCard />

                  <textarea id="task" className="task-title" value={task.task} name="task" onChange={handleChange} />
                </Grid>

                {showMember && show === task._id && (
                  <Grid>
                    <Grid container alignItems="center" sx={{ mt: 2, mb: 1 }}>
                      <IconUsers />

                      <Typography sx={{ ml: 1 }} color="primary" variant="h5">
                        Member:
                      </Typography>
                    </Grid>

                    <Grid sx={{ paddingLeft: 4 }}>
                      <AutocompleteBtn options={BMember} member={TMember} handleChange={handleMemberChange} />
                    </Grid>
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

                {showAttach && show === task._id && (
                  <Grid>
                    <Grid container alignItems="center" sx={{ mt: 4 }}>
                      <IconPaperclip />

                      <Typography sx={{ ml: 1 }} color="primary" variant="h5">
                        Attachments:
                      </Typography>
                    </Grid>

                    <FileUpload taskID={task._id} />
                  </Grid>
                )}

                <Grid>
                  <Grid container alignItems="center" sx={{ mt: 4 }}>
                    <IconListDetails />

                    <Typography sx={{ ml: 1 }} color="primary" variant="h5">
                      Work:
                    </Typography>
                  </Grid>

                  <CForm taskID={task._id} />
                </Grid>
              </Grid>

              <MenuList>
                <Typography variant="subtitle1" sx={{ mt: 4 }}>
                  Add to card
                </Typography>

                <MenuItem sx={{ mb: 2, boxShadow: 2 }} onClick={() => handleShowMember(task._id)}>
                  <Grid sx={{ mr: 1 }}>
                    <IconUser size={16} />
                  </Grid>
                  Member
                </MenuItem>

                <MenuItem sx={{ mb: 2, boxShadow: 2 }}>
                  <Grid sx={{ mr: 1 }}>
                    <IconClock size={16} />
                  </Grid>
                  Day
                </MenuItem>

                <MenuItem sx={{ mb: 2, boxShadow: 2 }} onClick={() => handleShowAttach(task._id)}>
                  <Grid sx={{ mr: 1 }}>
                    <IconPaperclip size={16} />
                  </Grid>
                  Attach
                </MenuItem>

                <Typography variant="subtitle1" sx={{ mt: 4 }}>
                  Manipulation
                </Typography>

                <MenuItem sx={{ mb: 2, boxShadow: 2 }}>
                  <Grid sx={{ mr: 1 }}>
                    <IconArrowBigRightLines size={16} />
                  </Grid>
                  Move
                </MenuItem>

                <MenuItem sx={{ mb: 2, boxShadow: 2 }}>
                  <Grid sx={{ mr: 1 }}>
                    <IconArchive size={16} />
                  </Grid>
                  Storage
                </MenuItem>

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
};

export default TForm;
