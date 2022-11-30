import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
  Button,
  ButtonGroup,
  Fade,
  GlobalStyles,
  Grid,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useMediaQuery,
} from '@mui/material';

// icon
import { IconDots, IconPencil, IconTrash } from '@tabler/icons';

// project imports
import { MENU_OPEN, SET_MENU } from 'store/actions';
import swal from 'sweetalert';
import BoardAPI from 'services/BoardAPI';
import SocketIo from 'utils/socket.io';
import BForm from 'views/board/BoardForm';

// ==============================|| SIDEBAR BOARD LIST ITEMS ||============================== //
const boardAPI = new BoardAPI();
const socket = new SocketIo();

const NavBoardItem = ({ item, index, wsId }) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const dispatch = useDispatch();
  const customization = useSelector((state) => state.customization);
  const matchesSM = useMediaQuery(theme.breakpoints.down('lg'));

  const [openB, setOpenB] = useState(false);

  const [moreVertIndex, setMoreVertIndex] = useState(0);
  const [checked, setChecked] = useState(false);

  const itemHandler = (id) => {
    navigate(`/b/${item._id}`, { replace: true });
    dispatch({ type: MENU_OPEN, id });
    if (matchesSM) dispatch({ type: SET_MENU, opened: false });
  };

  const handleMoreVert = (index) => {
    setMoreVertIndex(index);
    setChecked((prev) => !prev);
  };

  const handleEditB = () => {
    setOpenB(true);
  };

  const handleCloseB = () => {
    setOpenB(false);
    loadData(boardId);
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
          .deleteById(id)
          .then((res) => {
            if (res.status === 200) {
              socket.board(res.data);

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
    <>
      <GlobalStyles
        styles={{
          '.hide': {
            display: 'none',
          },
          '.show:hover + .hide': {
            display: 'block',
          },
        }}
      />

      <Grid container sx={{ position: 'relative' }}>
        <ListItemButton
          className="show"
          key={item._id}
          sx={{
            borderRadius: `${customization.borderRadius}px`,
            mb: 0.5,
            alignItems: 'flex-end',
          }}
          selected={customization.isOpen.findIndex((id) => id === item._id) > -1}
          onClick={() => itemHandler(item._id)}
        >
          <ListItemIcon>
            <img src={item.bgImg} alt={item.name} height={25} width={30} />
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
            cursor: 'pointer',
            position: 'absolute',
            top: 12,
            right: 0,
            minWidth: 30,
            p: '0 0 0 0',
            '&:hover': { display: 'block', color: '#90CAF9' },
          }}
          onClick={() => {
            handleMoreVert(index);
          }}
        >
          <IconDots />
        </Grid>
      </Grid>

      <BForm open={openB} onClose={handleCloseB} formData={item} dialogForm={1} />

      {checked === true && (
        <Fade in={moreVertIndex === index ? checked : !checked}>
          <ButtonGroup sx={{ ml: 5 }} size="small" orientation="horizontal" aria-label="small button group" variant="contained">
            <Button key="edit" onClick={handleEditB}>
              <IconPencil />
              Edit
            </Button>
            <Button
              key="delete"
              onClick={() => {
                handleDeleteB(item._id);
              }}
            >
              <IconTrash />
              Delete
            </Button>
          </ButtonGroup>
        </Fade>
      )}
    </>
  );
};

NavBoardItem.propTypes = {
  item: PropTypes.object,
  index: PropTypes.number,
  wsId: PropTypes.any,
};

export default NavBoardItem;
