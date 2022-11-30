import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';

// material-ui
import { Avatar, Typography, Grid, Card, CardMedia, Button } from '@mui/material';

// icons
import { IconPencil, IconTrash, IconUsers } from '@tabler/icons';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import BoardAPI from 'services/BoardAPI';
import BackgroundLetterAvatars from 'ui-component/BackgroundLetterAvatar';
import BForm from 'views/board/BoardForm';
import io from 'socket.io-client';
import AnimateButton from 'ui-component/extended/AnimateButton';
import SocketIo from 'utils/socket.io';

// ==============================|| BOARD DETAIL ||============================== //
const boardAPI = new BoardAPI();

const Detail = () => {
  return <></>;
};

export default Detail;
