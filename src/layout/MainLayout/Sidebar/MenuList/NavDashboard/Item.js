import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Avatar, ListItemButton, ListItemIcon, ListItemText, Typography, useMediaQuery } from '@mui/material';

// project imports
import { MENU_OPEN, SET_MENU } from 'store/actions';
import BackgroundLetterAvatars from 'ui-component/BackgroundLetterAvatar';

// ==============================|| SIDEBAR DASHBOARD LIST ITEMS ||============================== //

const NavDashboardItem = ({ item }) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const dispatch = useDispatch();
  const customization = useSelector((state) => state.customization);
  const matchesSM = useMediaQuery(theme.breakpoints.down('lg'));

  const itemHandler = (id) => {
    navigate(`/w/${item._id}`, { replace: true });
    dispatch({ type: MENU_OPEN, id });
    if (matchesSM) dispatch({ type: SET_MENU, opened: false });
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
    <ListItemButton
      sx={{
        borderRadius: `${customization.borderRadius}px`,
        mb: 0.5,
        alignItems: 'center',
      }}
      selected={customization.isOpen.findIndex((id) => id === item._id) > -1}
      onClick={() => itemHandler(item._id)}
    >
      <ListItemIcon>
        {item.logo.data === '' ? (
          <BackgroundLetterAvatars name={item.name} w={30} h={30} />
        ) : (
          <Avatar src={item.logo.data} variant="rounded" sx={{ height: 30, width: 30 }} />
        )}
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
  );
};

NavDashboardItem.propTypes = {
  item: PropTypes.object,
};

export default NavDashboardItem;
