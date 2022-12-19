import PropTypes from 'prop-types';
import { useEffect, useState, createRef } from 'react';

// material-ui
import { Button, Grid, Avatar, IconButton } from '@mui/material';

// icons/img
import { IconMoodSmile, IconPaperclip, IconSend, IconX } from '@tabler/icons';
import Picker from 'emoji-picker-react';

// project imports
import CommentAPI from 'services/CommentAPI';
import UserAPI from 'services/UserAPI';
import UploadAPI from 'services/UploadAPI';
import AnimateButton from 'ui-component/extended/AnimateButton';
import EndcodeFileBase64 from 'utils/endcodeFileBase64';
import io from 'socket.io-client';
import { host } from 'services/baseAPI';

// ==============================|| INPUT COMMENT ||============================== //
const commentAPI = new CommentAPI();
const userAPI = new UserAPI();
const uploadAPI = new UploadAPI();
const socket = io(host, {
  transports: ['websocket', 'polling'],
  withCredentials: true,
});

const InputComment = (props) => {
  const { taskId, onEdit, onClose, editMessage, fileMessage, commentId, inputWidth } = props;

  const inputRef = createRef();
  const userID = sessionStorage.getItem('id');

  const [inputStr, setInputStr] = useState('');
  const [sender, setSender] = useState({});

  const [showEmoji, setShowEmoji] = useState(false);
  const [file, setFile] = useState(false);

  const handleClose = () => {
    onClose(!onEdit);
  };

  const onSelectFile = async (e) => {
    const upload = {
      taskID: taskId,
    };
    const base64 = await EndcodeFileBase64(e.target.files[0]);

    upload.file = base64;

    uploadAPI
      .uploadFile(upload)
      .then((res) => {
        if (res.data.success === true) {
          socket.emit('upload', res.data.data);

          setFile(true);
          setInputStr(res.data.data.file);
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
  };

  const handleShowEmoji = () => {
    inputRef.current.focus();
    setShowEmoji(!showEmoji);
  };

  const pickEmoji = ({ emoji }, e) => {
    const ref = inputRef.current;
    ref.focus();
    const start = inputStr.substring(0, ref.selectionStart);
    const end = inputStr.substring(ref.selectionStart);
    const text = start + emoji + end;
    setInputStr(text);
    setShowEmoji(false);
  };

  const handleComment = async (e) => {
    e.preventDefault();
    const comment = {
      message: inputStr,
      taskID: taskId,
    };

    if (file === true) {
      comment.message = fileMessage;
    }

    commentAPI
      .createNew(comment)
      .then((res) => {
        if (res.data.success === true) {
          socket.emit('comment', res.data.post);

          setInputStr('');
          setFile(false);
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
  };

  const handleEditComment = async (e) => {
    e.preventDefault();
    const comment = {
      message: inputStr,
      taskID: taskId,
    };

    commentAPI
      .updateByID(commentId, comment)
      .then((res) => {
        if (res.data.success === true) {
          socket.emit('comment', res.data.data);

          onClose(!onEdit);
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
  };

  useEffect(() => {
    userAPI.getByID(userID).then((res) => {
      setSender(res.data[0]);
    });

    if (editMessage) {
      setInputStr(editMessage);
    }

    if (fileMessage) {
      setFile(true);
      setInputStr(`[${fileMessage.name}]`);
    }
  }, [userID, editMessage, fileMessage]);

  return (
    <Grid container alignItems="flex-start" sx={{ mt: 1 }}>
      {!editMessage && <Avatar src={sender.avatar && sender.avatar.data} sx={{ width: 40, height: 40, mr: 1 }} />}

      <Grid sx={{ p: 1, borderRadius: 2, boxShadow: 4, position: 'relative', width: inputWidth }}>
        <textarea
          className="comment"
          placeholder="Write a comment..."
          value={inputStr}
          onChange={(e) => {
            e.target.style.height = 'auto';
            e.target.style.height = e.target.scrollHeight + 'px';

            setInputStr(e.target.value);
          }}
          ref={inputRef}
        />

        <Grid item display="flex" justifyContent="space-between" alignItems="center">
          <Grid item display="flex" alignItems="center">
            <AnimateButton>
              <Button
                disableElevation
                disabled={inputStr === '' ? true : false}
                type="submit"
                size="small"
                variant="contained"
                color="primary"
                onClick={!editMessage ? handleComment : handleEditComment}
              >
                {!editMessage ? <IconSend size={20} /> : 'Save'}
              </Button>
            </AnimateButton>

            {onEdit === true ? (
              <IconButton aria-label="image" component="label" onClick={handleClose}>
                <IconX />
              </IconButton>
            ) : null}
          </Grid>

          <Grid item display="flex" alignItems="center">
            <IconButton aria-label="image" component="label" onClick={handleShowEmoji}>
              <IconMoodSmile />
            </IconButton>

            <IconButton aria-label="image" component="label">
              <IconPaperclip />

              <input type="file" name="image" multiple hidden onChange={onSelectFile} />
            </IconButton>
          </Grid>
        </Grid>

        {showEmoji && (
          <div style={{ position: 'absolute', top: 95, right: 60 }}>
            <Picker previewConfig={{ showPreview: false }} emojiStyle="google" onEmojiClick={pickEmoji} />
          </div>
        )}
      </Grid>
    </Grid>
  );
};

InputComment.propTypes = {
  taskId: PropTypes.any.isRequired,
  onEdit: PropTypes.bool,
  onClose: PropTypes.func,
  editMessage: PropTypes.any,
  fileMessage: PropTypes.any,
  commentId: PropTypes.any,
  inputWidth: PropTypes.any,
};

export default InputComment;
