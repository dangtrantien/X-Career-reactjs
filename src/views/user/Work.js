import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';

// material-ui
import {
  Typography,
  Grid,
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
  Avatar,
  TablePagination,
  TableContainer,
  Chip,
} from '@mui/material';

// icons
import { IconList, IconUsers } from '@tabler/icons';

// project import
import WorkSpaceAPI from 'services/WorkSpaceAPI';
import BoardAPI from 'services/BoardAPI';
import TaskAPI from 'services/TaskAPI';
import BackgroundLetterAvatars from 'ui-component/BackgroundLetterAvatar';
import FilterBtn from 'ui-component/MenuButton/FilterBtn';
import io from 'socket.io-client';
import { host } from 'services/baseAPI';

// ==============================|| WORK ||============================== //
const workSpaceAPI = new WorkSpaceAPI();
const boardAPI = new BoardAPI();
const taskAPI = new TaskAPI();
const socket = io(host, {
  transports: ['websocket', 'polling'],
  withCredentials: true,
});

const lists = [
  {
    id: 0,
    title: 'Backlog',
  },
  {
    id: 1,
    title: 'To-Do',
  },
  {
    id: 2,
    title: 'Doing',
  },
  {
    id: 3,
    title: 'Done',
  },
];

const date = [
  {
    id: 0,
    label: 'No expiration date',
    iconColor: 'grey',
    task: [],
  },
  {
    id: 1,
    label: 'Task done',
    iconColor: 'green',
    task: [],
  },
  {
    id: 2,
    label: 'Out of date',
    iconColor: 'red',
    task: [],
  },
];

const Work = () => {
  const { userId } = useParams();
  const navigate = useNavigate();

  const [workspace, setWorkSpace] = useState([]);
  const [board, setBoard] = useState([]);
  const [task, setTask] = useState([]);

  const [wsPage, setWSPage] = useState(0);
  const [wsRowsPerPage, setWSRowsPerPage] = useState(5);

  const [taskPage, setTaskPage] = useState(0);
  const [taskRowsPerPage, setTaskRowsPerPage] = useState(5);

  const [boardID, setBoardID] = useState();
  const [check, setCheck] = useState(false);

  const [dateID, setDateID] = useState();
  const [checkDate, setCheckDate] = useState(false);

  const loadData = (id) => {
    workSpaceAPI.getAll().then((result) => {
      let arr = [];

      result.data.data.map((res) => {
        res.member.map((value) => {
          if (value._id === id) {
            arr.push(res);
          }
        });
      });

      setWorkSpace(arr);
    });

    boardAPI.getAll().then((result) => {
      let arr = [];

      result.data.data.map((res) => {
        res.member.map((value) => {
          if (value._id === id) {
            arr.push(res);
          }
        });
      });

      setBoard(arr);
    });

    taskAPI.getAll().then((result) => {
      let arr = [];
      let noDate = [];
      let taskDone = [];
      let expired = [];

      result.data.data.map((res) => {
        res.member.map((value) => {
          if (value._id === id) {
            arr.push(res);

            if (res.day) {
              if (res.day.expired === 'done') {
                taskDone.push(res);
              } else if (res.day.startTime !== '' && res.day.expirationDate !== '' && res.day.expirationTime !== '') {
                if (new Date().toLocaleDateString() > res.day.expirationDate) {
                  expired.push(res);
                } else if (new Date().toLocaleDateString() === res.day.expirationDate) {
                  if (new Date().getHours() > res.day.expirationTime.split(':')[0]) {
                    expired.push(res);
                  } else if (new Date().getHours() === res.day.expirationTime.split(':')[0]) {
                    if (new Date().getMinutes() > res.day.expirationTime.split(':')[1]) {
                      expired.push(res);
                    }
                  }
                }
              }
            } else {
              noDate.push(res);
            }
          }
        });
      });

      date[0].task = noDate;
      date[1].task = taskDone;
      date[2].task = expired;

      setTask(arr);
    });
  };

  const handleChangeWSPage = (event, newPage) => {
    setWSPage(newPage);
  };

  const handleChangeWSRowsPerPage = (event) => {
    setWSRowsPerPage(+event.target.value);
    setWSPage(0);
  };

  const handleChangeTaskPage = (event, newPage) => {
    setTaskPage(newPage);
  };

  const handleChangeTaskRowsPerPage = (event) => {
    setTaskRowsPerPage(+event.target.value);
    setTaskPage(0);
  };

  const handleFilterBoard = (event, id) => {
    setBoardID(id);
    setCheck(event.target.checked);

    taskAPI.getAll().then((result) => {
      let arr = [];
      let filter = [];

      result.data.data.map((res) => {
        res.member.map((value) => {
          if (value._id === userId) {
            arr.push(res);

            if (res.boardID._id === id) {
              filter.push(res);
            }
          }
        });
      });

      if (event.target.checked === true) {
        setTask(filter);
      } else {
        setTask(arr);
      }
    });
  };

  const handleFilterDate = (event, id) => {
    setDateID(id);
    setCheckDate(event.target.checked);

    taskAPI.getAll().then((result) => {
      let arr = [];

      result.data.data.map((res) => {
        res.member.map((value) => {
          if (value._id === userId) {
            arr.push(res);
          }
        });
      });

      if (event.target.checked === true) {
        if (id === 0) {
          setTask(date[0].task);
        } else if (id === 1) {
          setTask(date[1].task);
        } else if (id === 2) {
          setTask(date[2].task);
        }
      } else {
        setTask(arr);
      }
    });
  };

  useEffect(() => {
    loadData(userId);

    socket.on('workspace', () => {
      loadData(userId);
    });

    socket.on('board', () => {
      loadData(userId);
    });

    socket.on('task', () => {
      loadData(userId);
    });
  }, [userId]);

  return (
    <Grid sx={{ my: 5, px: 20 }}>
      <Grid sx={{ px: 30 }}>
        <Grid item display="flex" alignItems="center">
          <IconUsers />

          <Typography variant="h3" sx={{ ml: 2 }}>
            Workspaces
          </Typography>
        </Grid>
        {workspace.length === 0 ? (
          <Grid container justifyContent="center" alignItems="center" sx={{ mt: 2, height: 150, bgcolor: 'rgba(128, 128, 128, 0.1)' }}>
            <Typography variant="h4">Can't see any workspace. You must be added to the workspace to see them.</Typography>
          </Grid>
        ) : (
          <>
            <TableContainer
              sx={{
                maxHeight: 500,
                overflow: 'hidden',
                '&:hover': {
                  overflow: 'auto',
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
              <Table>
                <TableBody>
                  {workspace.slice(wsPage * wsRowsPerPage, wsPage * wsRowsPerPage + wsRowsPerPage).map((data) => (
                    <TableRow
                      key={data._id}
                      hover
                      onClick={() => {
                        navigate(`/w/detail/${data._id}`, { replace: true });
                      }}
                      sx={{ cursor: 'pointer' }}
                    >
                      <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
                        {data.logo && (
                          <>
                            {data.logo.data === '' ? (
                              <BackgroundLetterAvatars name={data.name} h={30} w={30} f={24} />
                            ) : (
                              <Avatar src={data.logo.data} variant="rounded" sx={{ height: 30, width: 30 }} />
                            )}
                          </>
                        )}

                        <Typography variant="h5" sx={{ ml: 2 }}>
                          {data.name}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              sx={{ overflow: 'hidden' }}
              rowsPerPageOptions={[5, 10, 25, 50, 100]}
              component="div"
              count={workspace.length}
              rowsPerPage={wsRowsPerPage}
              page={wsPage}
              onPageChange={handleChangeWSPage}
              onRowsPerPageChange={handleChangeWSRowsPerPage}
            />
          </>
        )}
      </Grid>

      <Grid>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item display="flex" alignItems="center">
            <IconList />

            <Typography variant="h3" sx={{ ml: 2 }}>
              Work
            </Typography>
          </Grid>

          <FilterBtn
            page="user"
            boardId={boardID}
            checkBoard={check}
            board={board}
            handleFilterBoard={handleFilterBoard}
            checkDate={checkDate}
            date={date}
            dateId={dateID}
            handleFilterDate={handleFilterDate}
          />
        </Grid>

        {task.length === 0 ? (
          <Grid container justifyContent="center" alignItems="center" sx={{ mt: 2, height: 150, bgcolor: 'rgba(128, 128, 128, 0.1)' }}>
            <Typography variant="h3">Can't see any task. You must be added to the task to see them.</Typography>
          </Grid>
        ) : (
          <>
            <TableContainer
              sx={{
                maxHeight: 500,
                '&::-webkit-scrollbar': {
                  width: 10,
                  height: 10,
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
              }}
            >
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell>#</TableCell>
                    <TableCell sx={{ minWidth: 300 }}>Task</TableCell>
                    <TableCell sx={{ minWidth: 300 }}>Describe</TableCell>
                    <TableCell sx={{ minWidth: 200 }}>Member</TableCell>
                    <TableCell sx={{ minWidth: 100 }}>Status</TableCell>
                    <TableCell sx={{ minWidth: 250 }}>Board</TableCell>
                    <TableCell sx={{ minWidth: 250 }}>Expiration date</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {task.slice(taskPage * taskRowsPerPage, taskPage * taskRowsPerPage + taskRowsPerPage).map((data, index) => (
                    <TableRow
                      key={data._id}
                      hover
                      onClick={() => {
                        navigate(`/b/${data.boardID._id}`, { replace: true });
                      }}
                      sx={{ cursor: 'pointer', borderTop: '2px solid', borderBottom: '2px solid' }}
                    >
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>
                        <Typography variant="h5">{data.task}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="h5">{data.describe}</Typography>
                      </TableCell>
                      <TableCell>
                        {data.member !== [] && (
                          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                            {data.member.map((user) => (
                              <Avatar key={user._id} src={user.avatar.data} sx={{ width: 24, height: 24 }} />
                            ))}
                          </div>
                        )}
                      </TableCell>
                      <TableCell>
                        <Typography variant="h5">
                          {lists.map((value) => (
                            <div key={value.id}>{value.id === data.status && <>{value.title}</>}</div>
                          ))}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="h5">{data.boardID.name}</Typography>
                      </TableCell>
                      <TableCell>
                        {data.day && data.day.startTime !== '' && data.day.expirationDate !== '' && data.day.expirationTime !== '' ? (
                          <Typography variant="h5">
                            {data.day.startTime} - {data.day.expirationDate} at {data.day.expirationTime}
                          </Typography>
                        ) : (
                          <Typography variant="h5">The task has no expiration date</Typography>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, 50, 100]}
              component="div"
              count={task.length}
              rowsPerPage={taskRowsPerPage}
              page={taskPage}
              onPageChange={handleChangeTaskPage}
              onRowsPerPageChange={handleChangeTaskRowsPerPage}
            />
          </>
        )}
      </Grid>
    </Grid>
  );
};

export default Work;
