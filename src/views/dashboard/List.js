import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// material-ui
import { Card, CardMedia, Grid, Typography } from '@mui/material';
import PropTypes from 'prop-types';

// project import
import WorkSpaceAPI from 'services/WorkSpaceAPI';
import BForm from 'views/board/BoardForm';

// ==============================|| BOARD LIST ||============================== //
const workSpaceAPI = new WorkSpaceAPI();

const List = ({ id }) => {
  const navigate = useNavigate();
  const [openB, setOpenB] = useState(false);

  const [board, setBoard] = useState([]);

  const loadData = (id) => {
    workSpaceAPI.getById(id).then((result) => {
      setBoard(result.data[0].boards);
    });
  };

  const handleCreateB = () => {
    setOpenB(true);
  };

  const handleCloseB = () => {
    setOpenB(false);
    loadData(id);
  };

  useEffect(() => {
    loadData(id);
  }, [id]);

  return (
    <>
      <BForm open={openB} onClose={handleCloseB} formData={board} dialogForm={0} />

      <Grid container spacing={2}>
        <Typography
          variant="h3"
          sx={{ cursor: 'pointer', bgcolor: 'rgba(128, 0, 128, 0.4)', ml: 2, mt: 3, px: 2, borderRadius: 4 }}
          height={100}
          display="flex"
          alignItems="center"
          onClick={handleCreateB}
        >
          Create a new board
        </Typography>

        {board.map((data) => (
          <Grid item xs={3} sm={3} md={3} key={data._id} sx={{ position: 'relative' }}>
            <Card>
              <CardMedia
                sx={{ cursor: 'pointer' }}
                component="img"
                alt="board"
                src={data.bgImg}
                //   onClick={() => navigate(`/board/${data._id}`, { replace: true })}
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
      </Grid>
    </>
  );
};

List.propTypes = {
  id: PropTypes.any.isRequired,
};

export default List;
