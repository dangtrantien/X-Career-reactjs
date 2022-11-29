import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';

// material-ui
import { Avatar, Typography, Grid, Card, CardMedia } from '@mui/material';

// icons
import { IconPencil, IconUsers } from '@tabler/icons';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import WorkSpaceAPI from 'services/WorkSpaceAPI';
import BackgroundLetterAvatars from 'ui-component/BackgroundLetterAvatar';
import WSForm from './WorkSpaceForm';
import BForm from 'views/board/BoardForm';

// ==============================|| WORKSPACE DETAIL ||============================== //
const workSpaceAPI = new WorkSpaceAPI();

const Detail = () => {
  const navigate = useNavigate();
  const { workSpaceId } = useParams();

  const [openWS, setOpenWS] = useState(false);
  const [openB, setOpenB] = useState(false);

  const [workspace, setWorkSpace] = useState({});
  const [member, setMember] = useState();
  const [board, setBoard] = useState([]);

  const loadData = (id) => {
    workSpaceAPI.getById(id).then((result) => {
      setWorkSpace(result.data[0]);
      setMember(result.data[0].userIDs.length);
      setBoard(result.data[0].boards);
    });
  };

  const handleEditWS = () => {
    setOpenWS(true);
  };

  const handleCloseWS = () => {
    setOpenWS(false);
    loadData(workSpaceId);
  };

  const handleCreateB = () => {
    setOpenB(true);
  };

  const handleCloseB = () => {
    setOpenB(false);
    loadData(workSpaceId);
  };

  useEffect(() => {
    loadData(workSpaceId);
  }, [workSpaceId]);

  return (
    <>
      <Grid container justifyContent="space-between" alignItems="center" sx={{ px: 16, py: 6 }}>
        <Grid item display="flex" alignItems="center">
          {workspace.logo === '' ? (
            <BackgroundLetterAvatars name={workspace.name} h={80} w={80} f={50} />
          ) : (
            <Avatar src={workspace.logo} variant="rounded" sx={{ height: 80, width: 80 }} />
          )}

          <Typography variant="h1" sx={{ ml: 2 }}>
            {workspace.name}
          </Typography>

          <Grid item sx={{ cursor: 'pointer', ml: 1 }} onClick={handleEditWS}>
            <IconPencil />
          </Grid>
        </Grid>

        <Typography variant="h2" sx={{ fontWeight: 500 }}>
          <IconUsers /> Member ({member})
        </Typography>
      </Grid>

      <WSForm open={openWS} onClose={handleCloseWS} formData={workspace} dialogForm={1} />

      <BForm open={openB} onClose={handleCloseB} formData={board} wsId={workspace._id} dialogForm={0} />

      <MainCard sx={{ height: '100%' }}>
        <Typography variant="h2" sx={{ mb: 4, fontWeight: 500 }}>
          Board
        </Typography>

        <Grid container spacing={4}>
          <Typography
            variant="h3"
            sx={{ cursor: 'pointer', bgcolor: 'rgba(128, 0, 128, 0.4)', ml: 4, mt: 5, px: 2, borderRadius: 4 }}
            height={100}
            display="flex"
            alignItems="center"
            onClick={handleCreateB}
          >
            Create a new board
          </Typography>

          {board.map((value) => (
            <Grid item xs={10} sm={10} md={3} key={value._id} sx={{ position: 'relative' }}>
              <Card>
                <CardMedia
                  sx={{ cursor: 'pointer' }}
                  component="img"
                  alt="board"
                  src={value.bgImg}
                  //   onClick={() => navigate(`/board/${value._id}`, { replace: true })}
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
        </Grid>
      </MainCard>
    </>
  );
};

export default Detail;
