import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

// material-ui
import { Box, Grid, Button, Menu, DialogTitle, DialogContent, Divider, Checkbox, OutlinedInput, Typography } from '@mui/material';

// icons

// project imports
import swal from 'sweetalert';
import TaskAPI from 'services/TaskAPI';
import AnimateButton from 'ui-component/extended/AnimateButton';
import Calendar from 'react-calendar';
import dayjs from 'dayjs';
import { checkValidDate, checkValidTime } from 'utils/validateDateFormat';
import io from 'socket.io-client';
import { host } from 'services/baseAPI';

// ==============================|| CALENDAR BUTTON ||============================== //
const taskAPI = new TaskAPI();
const socket = io(host, {
  transports: ['websocket'],
  withCredentials: true,
});

const CalendarBtn = (props) => {
  const { task, anchorEl, open, handleClose, expiredDate } = props;

  const [time, setTime] = useState(new Date());

  const [startTime, setStartTime] = useState();
  const [expirationDate, setExpirationDate] = useState();
  const [expirationTime, setExpirationTime] = useState();

  const [checkStart, setCheckStart] = useState(false);
  const [checkExpired, setCheckExpired] = useState(false);

  const handleChangeTime = (value) => {
    setTime(value);

    if (checkStart === true) {
      if (value.length > 0) {
        setStartTime(value[0].toLocaleDateString());
      }
    }

    if (checkExpired === true) {
      if (value.length > 0) {
        setExpirationDate(value[1].toLocaleDateString());
      }
    }
  };

  const handleCheckStart = (event) => {
    setCheckStart(event.target.checked);
  };

  const handleCheckExpired = (event) => {
    setCheckExpired(event.target.checked);

    if (time.length > 0) {
      setExpirationDate(time[1].toLocaleDateString());
    } else {
      setExpirationDate(time.toLocaleDateString());
    }
  };

  const handleStartTime = (event) => {
    setStartTime(event.target.value);
  };

  const handleExpirationDate = (event) => {
    setExpirationDate(event.target.value);
  };

  const handleExpirationTime = (event) => {
    setExpirationTime(event.target.value);
  };

  const handleSubmit = () => {
    const editTask = {
      day: {
        startTime: startTime,
        expirationDate: expirationDate,
        expirationTime: expirationTime,
        expired: expiredDate,
      },
    };

    const startTimeFormat = checkValidDate(editTask.day.startTime);
    const expirationDateFormat = checkValidDate(editTask.day.expirationDate);
    const expirationTimeFormat = checkValidTime(editTask.day.expirationTime);

    if (!startTimeFormat || !expirationDateFormat) {
      swal({
        title: 'Please enter correct date format.',
        text: `Example '${new Date().toLocaleDateString()}'.`,
        icon: 'warning',
        buttons: 'Ok',
      });
    } else if (!expirationTimeFormat) {
      swal({
        title: 'Please enter correct time format.',
        text: "Example '00:00'.",
        icon: 'warning',
        buttons: 'Ok',
      });
    } else {
      taskAPI
        .updateByID(task._id, editTask)
        .then((res) => {
          if (res.data.success === true) {
            socket.emit('task', res.data.data);

            handleClose();
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
    }
  };

  const handleRemoved = () => {
    const editTask = {
      day: {
        startTime: '',
        expirationDate: '',
        expirationTime: '',
      },
    };

    taskAPI
      .updateByID(task._id, editTask)
      .then((res) => {
        if (res.data.success === true) {
          socket.emit('task', res.data.data);

          handleClose();
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
    if (task.day) {
      if (task.day.startTime !== '' && task.day.expirationDate !== '' && task.day.expirationTime !== '') {
        setCheckStart(true);
        setStartTime(task.day.startTime);

        setCheckExpired(true);
        setExpirationDate(task.day.expirationDate);
        setExpirationTime(task.day.expirationTime);
      }
    }

    if (checkStart === false) {
      setStartTime(new Date().toLocaleDateString());
    }
  }, [task, checkStart, time]);

  return (
    <Menu
      anchorEl={anchorEl}
      id="account-menu"
      open={open}
      onClose={handleClose}
      PaperProps={{
        elevation: 0,
        sx: {
          overflow: 'visible',
          filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
          mt: 1.5,
          '& .MuiAvatar-root': {
            width: 80,
            height: 80,
            ml: -0.5,
            mr: 1,
          },
          '&:before': {
            content: '""',
            display: 'block',
            position: 'absolute',
            top: 0,
            right: 14,
            width: 10,
            height: 10,
            transform: 'translateY(-50%) rotate(45deg)',
            zIndex: 0,
          },
        },
      }}
      transformOrigin={{ horizontal: 'right', vertical: 'top' }}
      anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
    >
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ width: 400 }}>
        <DialogTitle display="flex" justifyContent="center" sx={{ fontSize: 16, fontWeight: 500 }}>
          Day
        </DialogTitle>
        <Divider />

        <DialogContent spacing={2}>
          <Calendar
            onChange={handleChangeTime}
            returnValue="range"
            selectRange={true}
            calendarType="US"
            formatMonthYear={(locale, date) => dayjs(date).format('MMMM YYYY')}
            formatShortWeekday={(locale, date) => dayjs(date).format('ddd')}
          />

          <Grid sx={{ mt: 4 }}>
            <Typography color="primary" variant="h5">
              Start day
            </Typography>

            <Grid item display="flex" alignItems="center">
              <Checkbox checked={checkStart} onChange={handleCheckStart} />

              <OutlinedInput
                sx={{ width: 120, mr: 2 }}
                disabled={checkStart === false ? true : false}
                id="startTime"
                type="text"
                value={startTime}
                name="startTime"
                onChange={handleStartTime}
                placeholder="MM/DD/YYYY"
              />
            </Grid>
          </Grid>

          <Grid sx={{ mt: 2 }}>
            <Typography color="primary" variant="h5">
              Expiration date
            </Typography>

            <Grid item display="flex" alignItems="center">
              <Checkbox checked={checkExpired} onChange={handleCheckExpired} />

              <OutlinedInput
                sx={{ width: 120, mr: 2 }}
                disabled={checkExpired === false ? true : false}
                id="expirationDate"
                type="text"
                value={expirationDate}
                name="expirationDate"
                onChange={handleExpirationDate}
                placeholder="MM/DD/YYYY"
              />

              <OutlinedInput
                sx={{ width: 100 }}
                disabled={checkExpired === false ? true : false}
                id="expirationTime"
                type="text"
                value={expirationTime}
                name="expirationTime"
                onChange={handleExpirationTime}
                placeholder="HH:MM"
              />
            </Grid>
          </Grid>
        </DialogContent>

        <Grid container alignItems="center" justifyContent="space-around" sx={{ my: 2 }}>
          <AnimateButton>
            <Button disableElevation size="small" onClick={handleRemoved} variant="contained" color="primary">
              Removed
            </Button>
          </AnimateButton>

          <AnimateButton>
            <Button disableElevation size="small" onClick={handleSubmit} variant="contained" color="primary">
              Save
            </Button>
          </AnimateButton>
        </Grid>
      </Box>
    </Menu>
  );
};

CalendarBtn.propTypes = {
  task: PropTypes.any,
  anchorEl: PropTypes.any,
  open: PropTypes.any,
  handleClose: PropTypes.any,
  expiredDate: PropTypes.any,
};

export default CalendarBtn;
