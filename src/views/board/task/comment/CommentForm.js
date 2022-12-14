import PropTypes from 'prop-types';
import { useEffect, useState, createRef } from 'react';

// material-ui
import { Button, Grid, Box, Avatar, GlobalStyles, IconButton, Typography, ButtonGroup } from '@mui/material';

// icons/img
import { IconMoodSmile, IconPaperclip } from '@tabler/icons';

// project imports
import CommentAPI from 'services/CommentAPI';
import AnimateButton from 'ui-component/extended/AnimateButton';
import EndcodeFileBase64 from 'utils/endcodeFileBase64';
import InputComment from './Input';
import io from 'socket.io-client';
import { host } from 'services/baseAPI';

// ==============================|| COMMENT FORM ||============================== //
const commentAPI = new CommentAPI();
const socket = io(host);

const CForm = ({ taskID }) => {
  const userId = sessionStorage.getItem('id');

  const [message, setMessage] = useState([]);

  const [editMS, setEditMS] = useState(false);
  const [messageId, setMessageId] = useState();

  const loadData = (id) => {
    commentAPI.getByTaskID(id).then((result) => {
      setMessage(result.data.comment);
    });
  };

  const handleEdit = (id) => {
    setMessageId(id);
    setEditMS(true);
  };

  const handleCloseEdit = () => {
    setEditMS(false);
  };

  const handleReply = () => {};

  const handleDelete = (id) => {
    swal({
      title: 'Are you sure?',
      text: 'Once deleted, you will not be able to recover.',
      icon: 'warning',
      buttons: [true, 'Delete'],
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        commentAPI
          .deleteByID(id)
          .then((res) => {
            if (res.status === 200) {
              socket.emit('comment', res.data);
            }
          })
          .catch(() => {
            //Thông báo lỗi
            swal({
              text: 'Sorry, something went wrong. Please contact to admin for support.',
              buttons: false,
              timer: 5000,
              icon: 'error',
            });
          });
      }
    });
  };

  useEffect(() => {
    loadData(taskID);

    socket.on('comment', () => {
      loadData(taskID);
    });
  }, [taskID]);

  return (
    <>
      <InputComment taskId={taskID} />

      <Grid
        height={400}
        sx={{
          mt: 4,
          overflow: 'hidden',
          '&:hover': {
            overflowY: 'auto',
            '&::-webkit-scrollbar': {
              width: 7,
            },
            '&::-webkit-scrollbar-track': {
              background: '#f1f1f1',
              borderRadius: 10,
            },
            '&::-webkit-scrollbar-thumb': {
              background: '#888',
              borderRadius: 10,
            },
            '&::-webkit-scrollbar-thumb:hover': {
              background: '#555',
            },
          },
        }}
      >
        {message.map((data) => {
          let createDate = new Date(data.createdAt).toLocaleString();
          let updateDate = new Date(data.updatedAt).toLocaleString();

          return (
            <Grid key={data._id} item display="flex" alignItems="flex-start" sx={{ mt: 2 }}>
              <Avatar src={data.senderID.avatar.data} sx={{ width: 40, height: 40, mr: 1 }} />

              <Grid>
                <Grid item display="flex" alignItems="center">
                  <Typography variant="h3" sx={{ mr: 1 }}>
                    {data.senderID.name}
                  </Typography>

                  <Typography variant="subtitle1">{createDate === updateDate ? createDate : `${updateDate} (fixed)`}</Typography>
                </Grid>

                {editMS === false ? (
                  <>
                    <Grid sx={{ width: 435, p: 1, borderRadius: 2, boxShadow: 4 }}>
                      <Typography variant="h4" sx={{ mr: 1 }}>
                        {data.message}
                      </Typography>
                    </Grid>

                    <Grid item display="flex" alignItems="center" sx={{ position: 'relative' }}>
                      {data.senderID._id === userId ? (
                        <Typography
                          variant="subtitle1"
                          sx={{ mr: 1, cursor: 'pointer', textDecoration: 'underline', '&:hover': { color: '#90CAF9' } }}
                          onClick={() => handleEdit(data._id)}
                        >
                          Edit
                        </Typography>
                      ) : (
                        <Typography
                          variant="subtitle1"
                          sx={{ mr: 1, cursor: 'pointer', textDecoration: 'underline', '&:hover': { color: '#90CAF9' } }}
                          onClick={handleReply}
                        >
                          Reply
                        </Typography>
                      )}

                      <Typography
                        variant="subtitle1"
                        sx={{ cursor: 'pointer', textDecoration: 'underline', '&:hover': { color: '#90CAF9' } }}
                        onClick={() => handleDelete(data._id)}
                      >
                        Delete
                      </Typography>
                    </Grid>
                  </>
                ) : (
                  <>
                    {messageId === data._id ? (
                      <InputComment
                        taskId={taskID}
                        onEdit={editMS}
                        onClose={handleCloseEdit}
                        message={data.message}
                        commentId={messageId}
                      />
                    ) : (
                      <>
                        <Grid sx={{ width: 450, p: 1, borderRadius: 2, boxShadow: 4 }}>
                          <Typography variant="h4" sx={{ mr: 1 }}>
                            {data.message}
                          </Typography>
                        </Grid>

                        <Grid item display="flex" alignItems="center">
                          {data.senderID._id === userId ? (
                            <Typography
                              variant="subtitle1"
                              sx={{ mr: 1, cursor: 'pointer', textDecoration: 'underline', '&:hover': { color: '#90CAF9' } }}
                              onClick={() => handleEdit(data._id)}
                            >
                              Edit
                            </Typography>
                          ) : (
                            <Typography
                              variant="subtitle1"
                              sx={{ mr: 1, cursor: 'pointer', textDecoration: 'underline', '&:hover': { color: '#90CAF9' } }}
                              onClick={handleReply}
                            >
                              Reply
                            </Typography>
                          )}

                          <Typography
                            variant="subtitle1"
                            sx={{ cursor: 'pointer', textDecoration: 'underline', '&:hover': { color: '#90CAF9' } }}
                            onClick={() => handleDelete(data._id)}
                          >
                            Delete
                          </Typography>
                        </Grid>
                      </>
                    )}
                  </>
                )}
              </Grid>
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};

CForm.propTypes = {
  taskID: PropTypes.any,
};

export default CForm;
