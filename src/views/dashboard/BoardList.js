import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// material-ui
import { Card, CardMedia, Grid, Typography } from '@mui/material';

// project import
import WorkSpaceAPI from 'services/WorkSpaceAPI';
import io from 'socket.io-client';
import { host } from 'services/baseAPI';

// ==============================|| BOARD LIST ||============================== //
const workSpaceAPI = new WorkSpaceAPI();
const socket = io(host);

const BoardList = ({ id }) => {
  const navigate = useNavigate();

  const [board, setBoard] = useState([]);

  const loadData = (id) => {
    workSpaceAPI.getByID(id).then((result) => {
      setBoard(result.data[0].boards);
    });
  };

  useEffect(() => {
    loadData(id);

    socket.on('board', () => {
      loadData(id);
    });
  }, [id]);

  return (
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
              overflow: 'hidden',
              wordBreak: 'break-word',
            }}
            variant="h3"
          >
            {value.name}
          </Typography>
        </Grid>
      ))}
    </>
  );
};

BoardList.propTypes = {
  id: PropTypes.any.isRequired,
};

export default BoardList;
