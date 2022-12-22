import PropTypes from 'prop-types';
import { useState } from 'react';

// material-ui
import { styled, alpha } from '@mui/material/styles';
import { Avatar, Button, Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, Grid, Menu } from '@mui/material';

// icons
import { IconClock, IconFilter } from '@tabler/icons';

// project imports

// ==============================|| FILTER BUTTON ||============================== //

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

const FilterBtn = (props) => {
  const {
    page,
    userId,
    check,
    checkNone,
    handleFilterMemberNone,
    handleFilterMember,
    member,
    board,
    date,
    dateID,
    handleFilterDate,
    checkDate,
  } = props;

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Button
        id="demo-customized-button"
        aria-controls={open ? 'demo-customized-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        variant="contained"
        disableElevation
        onClick={handleClick}
        startIcon={<IconFilter size={20} />}
      >
        filter
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
        {page === 'board' && (
          <Grid sx={{ display: 'flex', flexDirection: 'column' }}>
            <FormControl sx={{ m: '16px 16px 0 16px' }} component="fieldset" variant="standard">
              <FormLabel component="legend">Filter by member</FormLabel>

              <FormGroup>
                <FormControlLabel
                  control={
                    <>
                      <Checkbox
                        checked={checkNone}
                        onChange={(e) => {
                          handleFilterMemberNone(e);
                        }}
                      />
                      <Avatar src={''} sx={{ width: 20, height: 20, mr: 1 }} />
                    </>
                  }
                  label="No membres"
                />
                {member &&
                  member.map((user) => (
                    <FormControlLabel
                      key={user._id}
                      control={
                        <>
                          <Checkbox
                            checked={userId === user._id ? check : false}
                            onChange={(e) => {
                              handleFilterMember(e, user._id);
                            }}
                          />
                          <Avatar src={user.avatar.data} sx={{ width: 20, height: 20, mr: 1 }} />
                        </>
                      }
                      label={user.name}
                    />
                  ))}
              </FormGroup>
            </FormControl>

            <FormControl sx={{ m: 2 }} component="fieldset" variant="standard">
              <FormLabel component="legend">Filter by date</FormLabel>

              <FormGroup>
                {date &&
                  date.map((data) => (
                    <FormControlLabel
                      key={data.id}
                      control={
                        <>
                          <Checkbox
                            checked={dateID === data.id ? checkDate : false}
                            onChange={(e) => {
                              handleFilterDate(e, data.id);
                            }}
                          />
                          <IconClock size={20} color={data.iconColor} style={{ marginRight: '10px' }} />
                        </>
                      }
                      label={data.label}
                    />
                  ))}
              </FormGroup>
            </FormControl>
          </Grid>
        )}

        {page === 'user' && (
          <Grid sx={{ display: 'flex', flexDirection: 'column' }}>
            <FormControl sx={{ m: '16px 16px 0 16px' }} component="fieldset" variant="standard">
              <FormLabel component="legend">Filter by board</FormLabel>

              <FormGroup>
                {board &&
                  board.map((data) => (
                    <FormControlLabel
                      key={data._id}
                      control={
                        <>
                          <Checkbox
                            checked={userId === data._id ? check : false}
                            onChange={(e) => {
                              handleFilterMember(e, data._id);
                            }}
                          />
                        </>
                      }
                      label={data.name}
                    />
                  ))}
              </FormGroup>
            </FormControl>
          </Grid>
        )}
      </StyledMenu>
    </>
  );
};

FilterBtn.propTypes = {
  page: PropTypes.string,
  userId: PropTypes.any,
  check: PropTypes.bool,
  checkNone: PropTypes.bool,
  handleFilterMemberNone: PropTypes.any,
  handleFilterMember: PropTypes.any,
  member: PropTypes.array,
  board: PropTypes.array,
  date: PropTypes.array,
  dateID: PropTypes.any,
  handleFilterDate: PropTypes.any,
  checkDate: PropTypes.bool,
};

export default FilterBtn;
