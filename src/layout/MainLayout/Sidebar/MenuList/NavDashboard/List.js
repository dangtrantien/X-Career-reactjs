import { useEffect, useState } from 'react';

// material-ui
import { Divider, Grid, Typography } from '@mui/material';

// icons
import { IconPlus } from '@tabler/icons';

// project imports
import NavDashboardItem from './Item';
import WorkSpaceAPI from 'services/WorkSpaceAPI';
import WSForm from 'views/workspace/WorkSpaceForm';
import io from 'socket.io-client';

// ==============================|| SIDEBAR DASHBOARD LIST ||============================== //
const workSpaceAPI = new WorkSpaceAPI();
const socketClient = io.connect('http://localhost:3002');

const DashboardList = () => {
  const [openWS, setOpenWS] = useState(false);

  const [workspace, setWorkSpace] = useState([]);

  const userId = sessionStorage.getItem('id');

  const handleCreateWS = () => {
    setOpenWS(true);
  };

  const handleCloseWS = () => {
    setOpenWS(false);
  };

  const loadData = (id) => {
    workSpaceAPI.getAll().then((result) => {
      const ws = [];

      result.data.data.map((res) => {
        if (res.userIDs) {
          res.userIDs.map((value) => {
            if (value._id === id) {
              ws.push(res);
            }
          });
        }
      });

      setWorkSpace(ws);
    });
  };

  useEffect(() => {
    loadData(userId);

    socketClient.on('edit_workspace', (data) => {
      workSpaceAPI.getAll().then((result) => {
        const ws = [];

        result.data.data.map((res) => {
          if (data._id === res._id) {
            res = data;
          }

          if (res.userIDs) {
            res.userIDs.map((value) => {
              if (value === userId) {
                ws.push(res);
              }
            });
          }
        });

        setWorkSpace(ws);
      });
    });

    socketClient.on('delete_workspace', () => {
      loadData(userId);
    });
  }, [userId]);

  return (
    <>
      <Grid container justifyContent="space-between" alignItems="center">
        <Typography variant="h4" fontWeight={300}>
          Workspaces
        </Typography>

        <Grid item sx={{ cursor: 'pointer' }} onClick={handleCreateWS}>
          <IconPlus />
        </Grid>
      </Grid>
      <Divider sx={{ borderBottom: '1px solid', mb: 2 }} />

      <WSForm open={openWS} onClose={handleCloseWS} dialogForm={0} />

      {workspace.map((item) => (
        <NavDashboardItem key={item._id} item={item} />
      ))}
    </>
  );
};

export default DashboardList;
