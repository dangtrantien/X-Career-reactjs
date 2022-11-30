import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// material-ui
import { Card, CardMedia, Grid, Typography } from '@mui/material';
import PropTypes from 'prop-types';

// project import
import WorkSpaceAPI from 'services/WorkSpaceAPI';

// ==============================|| BOARD LIST ||============================== //
const workSpaceAPI = new WorkSpaceAPI();

const BoardList = ({ id }) => {
  const navigate = useNavigate();

  const [board, setBoard] = useState([]);

  useEffect(() => {
    workSpaceAPI.getById(id).then((result) => {
      setBoard(result.data[0].boards);
    });
  }, [id]);

  return (
    <>
      {board.map((data) => (
        <Grid item xs={3} sm={3} md={3} key={data._id} sx={{ position: 'relative' }}>
          <Card>
            <CardMedia
              height={130}
              sx={{ cursor: 'pointer' }}
              component="img"
              alt="board"
              src={data.bgImg}
              onClick={() => navigate(`/b/${data._id}`, { replace: true })}
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
            {data.name}
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
