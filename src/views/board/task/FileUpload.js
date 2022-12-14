import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

// material-ui
import { Button, Grid, Avatar, Typography, ListItemButton } from '@mui/material';

// icons/img
import { IconPoint } from '@tabler/icons';

// project imports
import UploadAPI from 'services/UploadAPI';
import AnimateButton from 'ui-component/extended/AnimateButton';
import EndcodeFileBase64 from 'utils/endcodeFileBase64';
import BackgroundLetterAvatars from 'ui-component/BackgroundLetterAvatar';
import io from 'socket.io-client';
import { host } from 'services/baseAPI';

// ==============================|| FILE UPLOAD ||============================== //
const uploadAPI = new UploadAPI();
const socket = io(host);

const FileUpload = ({ taskID }) => {
  const navigate = useNavigate();

  const [file, setFile] = useState([]);

  const loadData = (id) => {
    uploadAPI.getFromTask().then((result) => {
      const arr = [];

      result.data.data.map((res) => {
        if (res.taskID._id === id) {
          arr.push(res);
        }
      });

      setFile(arr);
    });
  };

  const onSelectFile = async (e) => {
    const upload = {
      taskID: taskID,
    };
    const base64 = await EndcodeFileBase64(e.target.files[0]);

    upload.file = base64;

    uploadAPI
      .uploadFile(upload)
      .then((res) => {
        if (res.data.success === true) {
          socket.emit('upload', res.data.data);
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

  const handleDelete = (id) => {
    swal({
      title: 'Are you sure?',
      text: 'Once deleted, you will not be able to recover.',
      icon: 'warning',
      buttons: [true, 'Delete'],
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        uploadAPI
          .deleteByID(id)
          .then((res) => {
            if (res.status === 200) {
              socket.emit('upload', res.data);
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

    socket.on('upload', () => {
      loadData(taskID);
    });
  }, [taskID]);

  return (
    <>
      <Grid sx={{ mt: 2, paddingLeft: 4 }}>
        <AnimateButton>
          <Button variant="contained" color="primary" component="label">
            Choose file
            <input type="file" name="file" multiple hidden onChange={onSelectFile} />
          </Button>
        </AnimateButton>
      </Grid>

      <Grid
        maxHeight={250}
        sx={{
          paddingLeft: 4,
          overflowY: 'hidden',
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
        {file.map((item) => {
          let createDate = new Date(item.createdAt).toLocaleString();

          return (
            <a key={item._id} href={item.file.url} target="_blank" style={{ textDecoration: 'none' }}>
              <ListItemButton
                sx={{
                  mt: 2,
                  p: 1,
                  width: 450,
                  boxShadow: 4,
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                {item.file.type.match(/[^:/]\w+\//)[0] === 'image/' ? (
                  <Avatar src={item.file.url} sx={{ borderRadius: 0, height: 70, width: 110 }} />
                ) : (
                  <BackgroundLetterAvatars name={item.file.name} h={70} w={110} f={32} />
                )}

                <Grid sx={{ ml: 2 }}>
                  <Typography variant="h3">{item.file.name}</Typography>

                  <Grid container alignItems="center">
                    <Typography variant="subtitle1">Added</Typography>

                    <Typography variant="subtitle2">
                      <IconPoint />
                    </Typography>

                    <Typography variant="subtitle1">{createDate}</Typography>

                    <Typography variant="subtitle2">
                      <IconPoint />
                    </Typography>

                    <Typography
                      variant="subtitle1"
                      sx={{ cursor: 'pointer', textDecoration: 'underline', '&:hover': { color: '#90CAF9' } }}
                      onClick={() => handleDelete(item._id)}
                    >
                      Delete
                    </Typography>
                  </Grid>
                </Grid>
              </ListItemButton>
            </a>
          );
        })}
      </Grid>
    </>
  );
};

FileUpload.propTypes = {
  taskID: PropTypes.any,
};

export default FileUpload;
