import PropTypes from 'prop-types';

// material-ui
import { Avatar } from '@mui/material';

// ==============================|| CUSTOM AVATAR ||============================== //

function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name) {
  let arr = name.split(' ')[name.split(' ').length - 1].split('.');

  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name && arr.length === 1 ? name.split(' ')[0][0].toUpperCase() : arr[arr.length - 1]}`,
  };
}

export default function BackgroundLetterAvatars({ defaultValue, name, h, w, f }) {
  return (
    <>
      <Avatar src={defaultValue} {...stringAvatar(`${name}`)} variant="rounded" sx={{ height: h, width: w, fontSize: f }} />
    </>
  );
}

BackgroundLetterAvatars.propTypes = {
  defaultValue: PropTypes.any,
  name: PropTypes.string,
  h: PropTypes.any,
  w: PropTypes.any,
  f: PropTypes.any,
};
