import { useState } from 'react';

// material-ui
import { styled, alpha } from '@mui/material/styles';
import { Grid, Button, Menu, MenuItem } from '@mui/material';

// icons
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

// project imports
import WSForm from 'views/workspace/WorkSpaceForm';
import BForm from 'views/board/BoardForm';

// ==============================|| CREATE BUTTON ||============================== //

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

export default function CreateBtn() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const [openWS, setOpenWS] = useState(false);
  const [openB, setOpenB] = useState(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCreateWS = () => {
    setAnchorEl(null);
    setOpenWS(true);
  };

  const handleCreateB = () => {
    setAnchorEl(null);
    setOpenB(true);
  };

  const handleCloseForm = () => {
    setOpenWS(false);
    setOpenB(false);
  };

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
        create new
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
        <MenuItem onClick={handleCreateWS} disableRipple>
          create workspace
        </MenuItem>

        <MenuItem onClick={handleCreateB} disableRipple>
          create board
        </MenuItem>
      </StyledMenu>

      <WSForm open={openWS} onClose={handleCloseForm} dialogForm={0} />

      <BForm open={openB} onClose={handleCloseForm} dialogForm={0} />
    </Grid>
  );
}
