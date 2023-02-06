import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Avatar, Grid, ListItemButton, ListItemIcon, ListItemText, Typography, useMediaQuery } from '@mui/material';

// icon
import { IconTrash } from '@tabler/icons';

// project imports
import { MENU_OPEN, SET_MENU } from 'store/actions';
import swal from 'sweetalert';
import BoardAPI from 'services/BoardAPI';
import io from 'socket.io-client';
import { host } from 'services/baseAPI';

// ==============================|| SIDEBAR WORK SPACE LIST ITEMS ||============================== //
const boardAPI = new BoardAPI();
const socket = io(host, {
  transports: ['websocket'],
  withCredentials: true,
});

const NavWorkSpaceItem = ({ item, wsId }) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const dispatch = useDispatch();
  const customization = useSelector((state) => state.customization);
  const matchesSM = useMediaQuery(theme.breakpoints.down('lg'));

  const itemHandler = (id) => {
    navigate(`/b/${item._id}`, { replace: true });
    dispatch({ type: MENU_OPEN, id });
    if (matchesSM) dispatch({ type: SET_MENU, opened: false });
  };

  const handleDeleteB = (id) => {
    swal({
      title: 'Are you sure?',
      text: 'Once deleted, you will not be able to recover.',
      icon: 'warning',
      buttons: [true, 'Delete'],
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        boardAPI
          .deleteByID(id)
          .then((res) => {
            if (res.status === 200) {
              //Thông báo thành công
              swal({
                text: 'Successfully delete board.',
                buttons: false,
                timer: 2000,
                icon: 'success',
              });

              navigate(`/w/detail/${wsId}`, { replace: true });
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

  // active menu item on page load
  useEffect(() => {
    const currentIndex = document.location.pathname
      .toString()
      .split('/')
      .findIndex((id) => id === item._id);
    if (currentIndex > -1) {
      dispatch({ type: MENU_OPEN, id: item._id });
    }
    // eslint-disable-next-line
  }, []);

  return (
    <Grid container sx={{ position: 'relative' }}>
      <ListItemButton
        className="show"
        sx={{
          borderRadius: `${customization.borderRadius}px`,
          mb: 0.5,
          alignItems: 'center',
          '&:hover + .hide': {
            display: 'block',
          },
        }}
        selected={customization.isOpen.findIndex((id) => id === item._id) > -1}
        onClick={() => itemHandler(item._id)}
      >
        <ListItemIcon>
          <Avatar src={item.bgImg.data} variant="rounded" sx={{ height: 25, width: 30 }} />
        </ListItemIcon>

        <ListItemText
          primary={
            <Typography
              fontWeight={700}
              variant={customization.isOpen.findIndex((id) => id === item._id) > -1 ? 'h5' : 'body1'}
              color="inherit"
            >
              {item.name}
            </Typography>
          }
        />
      </ListItemButton>

      <Grid
        className="hide"
        sx={{
          display: 'none',
          cursor: 'pointer',
          position: 'absolute',
          top: 12,
          right: 0,
          minWidth: 30,
          p: '0 0 0 0',
          '&:hover': { display: 'block', color: '#90CAF9' },
        }}
        onClick={() => {
          handleDeleteB(item._id);
        }}
      >
        <IconTrash />
      </Grid>
    </Grid>
  );
};

NavWorkSpaceItem.propTypes = {
  item: PropTypes.object,
  wsId: PropTypes.any,
};

export default NavWorkSpaceItem;
