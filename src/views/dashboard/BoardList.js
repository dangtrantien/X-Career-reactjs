import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// material-ui
import { Card, CardMedia, Grid, Typography } from '@mui/material';

// project import
import WorkSpaceAPI from '../../services/WorkSpaceAPI';
import BForm from '../board/BoardForm';
import io from 'socket.io-client';
import { host } from '../../services/baseAPI';

// ==============================|| BOARD LIST ||============================== //
const workSpaceAPI = new WorkSpaceAPI();
const socket = io(host, {
  transports: ['websocket'],
  withCredentials: true,
});

const BoardList = ({ id, page }) => {
  const navigate = useNavigate();
  const userId = sessionStorage.getItem('id');

  const [board, setBoard] = useState([]);

  const [open, setOpen] = useState(false);
  const [count, setCount] = useState();

  const loadData = (id) => {
    workSpaceAPI.getByID(id).then((result) => {
      let arr = [];
      let count = 0;

      if (result.data[0].boards) {
        result.data[0].boards.map((res) => {
          res.member.map((data) => {
            if (data._id === userId) {
              arr.push(res);
              count++;
            }
          });
        });
      }

      setBoard(arr);
      setCount(count);
    });
  };

  const handleCreate = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    loadData(id);

    socket.on('board', () => {
      loadData(id);
    });
  }, [id]);

  return (
    <>
      {count === 0 && page === 'dashboard' ? (
        <Grid container alignItems="center">
          <Typography variant="h4" fontWeight={300} sx={{ my: 2, mr: 1 }}>
            You don't have any panels in this Workspace yet. The boards you create or join will show up here.
          </Typography>

          <Typography
            variant="subtitle1"
            sx={{ cursor: 'pointer', textDecoration: 'underline', '&:hover': { color: '#90CAF9' } }}
            onClick={handleCreate}
          >
            Create Table
          </Typography>
        </Grid>
      ) : (
        <>
          {board.map((value) => (
            <Grid item xs={3} sm={3} md={3} key={value._id} sx={{ position: 'relative' }}>
              <Card>
                <CardMedia
                  height={130}
                  sx={{ cursor: 'pointer' }}
                  component="img"
                  alt="board"
                  src={value.bgImg.data}
                  onClick={() => navigate(`/b/${value._id}`, { replace: true })}
                />
              </Card>

              <Typography
                sx={{
                  position: 'absolute',
                  top: 40,
                  left: 40,
                  color: 'white',
                }}
                variant="h3"
              >
                {value.name}
              </Typography>
            </Grid>
          ))}
        </>
      )}

      <BForm open={open} onClose={handleClose} wsId={id} dialogForm={0} />
    </>
  );
};

BoardList.propTypes = {
  id: PropTypes.any.isRequired,
  page: PropTypes.any,
};

export default BoardList;
