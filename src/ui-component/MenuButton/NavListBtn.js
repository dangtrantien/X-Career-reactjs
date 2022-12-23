import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

// material-ui
import { styled, alpha } from '@mui/material/styles';
import { Grid, Button, Menu, MenuItem, Avatar, Typography } from '@mui/material';

// icons
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

// project imports
import WorkSpaceAPI from 'services/WorkSpaceAPI';
import BoardAPI from 'services/BoardAPI';
import BackgroundLetterAvatars from 'ui-component/BackgroundLetterAvatar';
import io from 'socket.io-client';
import { host } from 'services/baseAPI';

// ==============================|| NAVIGATE LIST BUTTON ||============================== //
const workSpaceAPI = new WorkSpaceAPI();
const boardAPI = new BoardAPI();
const socket = io(host, {
  transports: ['websocket'],
  withCredentials: true,
});

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color: theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      '&:active': {
        backgroundColor: alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity),
      },
    },
  },
}));

export default function NavListBtn() {
  const navigate = useNavigate();
  const userId = sessionStorage.getItem('id');

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const [workspace, setWorkSpace] = useState([]);
  const [board, setBoard] = useState([]);

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
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    loadData(userId);

    socket.on('workspace', () => {
      loadData(userId);
    });

    socket.on('board', () => {
      loadData(userId);
    });
  }, [userId]);

  return (
    <Grid sx={{ ml: 2 }}>
      <Button
        id="demo-customized-button"
        aria-controls={open ? 'demo-customized-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        variant="contained"
        disableElevation
        onClick={handleClick}
        endIcon={open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
      >
        workspaces
      </Button>
      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          'aria-labelledby': 'demo-customized-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <Typography variant="subtitle1" sx={{ p: 1 }}>
          Workspaces
        </Typography>

        {workspace.map((value) => (
          <MenuItem
            key={value._id}
            onClick={() => {
              handleClose();
              navigate(`/w/detail/${value._id}`, { replace: true });
            }}
            disableRipple
          >
            {value.logo.data === '' ? (
              <BackgroundLetterAvatars name={value.name} h={30} w={30} f={24} />
            ) : (
              <Avatar src={value.logo.data} variant="rounded" sx={{ height: 30, width: 30 }} />
            )}

            <Typography variant="h3" sx={{ ml: 1, fontWeight: 500 }}>
              {value.name}
            </Typography>
          </MenuItem>
        ))}

        <Typography variant="subtitle1" sx={{ p: 1 }}>
          Boards
        </Typography>

        {board.map((value) => (
          <MenuItem
            key={value._id}
            onClick={() => {
              handleClose();
              navigate(`/b/${value._id}`, { replace: true });
            }}
            disableRipple
          >
            <Avatar src={value.bgImg.data} variant="rounded" sx={{ height: 30, width: 30 }} />

            <Typography variant="h3" sx={{ ml: 1, fontWeight: 500 }}>
              {value.name}
            </Typography>
          </MenuItem>
        ))}
      </StyledMenu>
    </Grid>
  );
}
