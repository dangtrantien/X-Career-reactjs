import { useState, useRef, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
  Avatar,
  Box,
  Chip,
  ClickAwayListener,
  Divider,
  Grid,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Popper,
  Stack,
  Typography,
} from '@mui/material';

// third-party

// project imports
import MainCard from 'ui-component/cards/MainCard';
import Transitions from 'ui-component/extended/Transitions';
import UserAPI from 'services/UserAPI';

// icons
import { IconId, IconLogout, IconSettings, IconUser } from '@tabler/icons';
import io from 'socket.io-client';

// ==============================|| PROFILE MENU ||============================== //
const userAPI = new UserAPI();
const socket = io.connect('http://localhost:3002');

const ProfileSection = () => {
  const theme = useTheme();
  const customization = useSelector((state) => state.customization);
  const navigate = useNavigate();

  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState({
    avatar: '',
    name: '',
    email: '',
  });
  /**
   * anchorRef is used on different componets and specifying one type leads to other components throwing an error
   * */
  const anchorRef = useRef(null);
  const userId = sessionStorage.getItem('id');

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  const handleListItemClick = (event, index, route = '') => {
    setSelectedIndex(index);
    handleClose(event);

    if (route && route !== '') {
      navigate(route);
    }
  };
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleLogout = async (e) => {
    e.preventDefault();

    userAPI.sigOut();
    navigate('/login', { replace: true });
  };

  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  useEffect(() => {
    userAPI.getById(userId).then((res) => {
      setUser(res.data[0]);
    });

    socket.on('user', (data) => {
      setUser(data);
    });
  }, [userId]);

  return (
    <>
      <Chip
        sx={{
          height: '48px',
          alignItems: 'center',
          borderRadius: '27px',
          transition: 'all .2s ease-in-out',
          borderColor: theme.palette.primary.light,
          backgroundColor: theme.palette.primary.light,
          '&[aria-controls="menu-list-grow"], &:hover': {
            borderColor: theme.palette.primary.main,
            background: `${theme.palette.primary.main}!important`,
            color: theme.palette.primary.light,
            '& svg': {
              stroke: theme.palette.primary.light,
            },
          },
          '& .MuiChip-label': {
            lineHeight: 0,
          },
        }}
        icon={
          <Avatar
            src={user.avatar}
            sx={{
              ...theme.typography.mediumAvatar,
              margin: '8px 0 8px 8px !important',
              cursor: 'pointer',
            }}
            ref={anchorRef}
            aria-controls={open ? 'menu-list-grow' : undefined}
            aria-haspopup="true"
            color="inherit"
          />
        }
        label={<IconSettings stroke={1.5} size="1.5rem" color={theme.palette.primary.main} />}
        variant="outlined"
        ref={anchorRef}
        aria-controls={open ? 'menu-list-grow' : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
        color="primary"
      />
      <Popper
        placement="bottom-end"
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
        popperOptions={{
          modifiers: [
            {
              name: 'offset',
              options: {
                offset: [0, 14],
              },
            },
          ],
        }}
      >
        {({ TransitionProps }) => (
          <Transitions in={open} {...TransitionProps}>
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MainCard border={false} elevation={16} content={false} boxShadow shadow={theme.shadows[16]}>
                  <Box sx={{ p: 2, pb: 0 }}>
                    <Stack>
                      <Stack spacing={0.5}>
                        <Typography variant="h4">Good Morning</Typography>

                        <Typography component="span" variant="h4" sx={{ fontWeight: 400 }}>
                          {user.name}
                        </Typography>
                      </Stack>

                      <Typography variant="subtitle2">{user.email}</Typography>
                    </Stack>
                    <Divider />
                  </Box>

                  <List
                    component="nav"
                    sx={{
                      width: '100%',
                      maxWidth: 350,
                      minWidth: 300,
                      backgroundColor: theme.palette.background.paper,
                      borderRadius: '10px',
                      [theme.breakpoints.down('md')]: {
                        minWidth: '100%',
                      },
                    }}
                  >
                    <ListItemButton
                      sx={{ borderRadius: `${customization.borderRadius}px` }}
                      selected={selectedIndex === 0}
                      onClick={(event) => handleListItemClick(event, 0, '/u/profile')}
                    >
                      <ListItemIcon>
                        <IconId stroke={1.5} size="1.3rem" />
                      </ListItemIcon>
                      <ListItemText primary={<Typography variant="body2">Profile</Typography>} />
                    </ListItemButton>

                    <ListItemButton
                      sx={{ borderRadius: `${customization.borderRadius}px` }}
                      selected={selectedIndex === 1}
                      onClick={(event) => handleListItemClick(event, 1, '/u/profile/change-password')}
                    >
                      <ListItemIcon>
                        <IconSettings stroke={1.5} size="1.3rem" />
                      </ListItemIcon>
                      <ListItemText primary={<Typography variant="body2">Change password</Typography>} />
                    </ListItemButton>

                    <ListItemButton
                      sx={{ borderRadius: `${customization.borderRadius}px` }}
                      selected={selectedIndex === 2}
                      onClick={(event) => handleListItemClick(event, 2, '/u/social-profile/posts')}
                    >
                      <ListItemIcon>
                        <IconUser stroke={1.5} size="1.3rem" />
                      </ListItemIcon>
                      <ListItemText
                        primary={
                          <Grid container spacing={1} justifyContent="space-between">
                            <Grid item>
                              <Typography variant="body2">Social Profile</Typography>
                            </Grid>
                            <Grid item>
                              <Chip
                                label="02"
                                size="small"
                                sx={{
                                  bgcolor: theme.palette.warning.dark,
                                  color: theme.palette.background.default,
                                }}
                              />
                            </Grid>
                          </Grid>
                        }
                      />
                    </ListItemButton>

                    <ListItemButton sx={{ borderRadius: `${customization.borderRadius}px` }} onClick={handleLogout}>
                      <ListItemIcon>
                        <IconLogout stroke={1.5} size="1.3rem" />
                      </ListItemIcon>
                      <ListItemText primary={<Typography variant="body2">Logout</Typography>} />
                    </ListItemButton>
                  </List>
                </MainCard>
              </ClickAwayListener>
            </Paper>
          </Transitions>
        )}
      </Popper>
    </>
  );
};

export default ProfileSection;
