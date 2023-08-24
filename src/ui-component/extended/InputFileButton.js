import PropTypes from 'prop-types';
import { useState } from 'react';

// material-ui
import { Avatar, Box, Button, Grid } from '@mui/material';

// project import
import AnimateButton from './AnimateButton';
import EndcodeFileBase64 from '../../utils/endcodeFileBase64';
import BackgroundLetterAvatars from '../BackgroundLetterAvatar';

// ==============================|| INPUT FILE BUTTON ||============================== //

export default function InputFileButton({ defaultValue, name, logo }) {
  const [selectedFile, setSelectedFile] = useState();

  const onSelectFile = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      return setSelectedFile(defaultValue);
    }

    EndcodeFileBase64(e.target.files[0]).then((res) => {
      setSelectedFile(res.data);
    });
  };

  return (
    <Box display="flex" alignItems="center">
      <Grid item sx={{ mr: 2 }}>
        {name === 'logo' ? (
          <>{!selectedFile && <BackgroundLetterAvatars defaultValue={defaultValue} name={logo} h={80} w={80} f={50} />} </>
        ) : (
          <>{!selectedFile && <Avatar variant="rounded" alt="profile user" src={defaultValue} sx={{ height: 80, width: 80 }} />}</>
        )}
        {selectedFile && <Avatar variant="rounded" alt="profile user" src={selectedFile} sx={{ height: 80, width: 80 }} />}
      </Grid>

      <AnimateButton>
        <Button variant="contained" color="primary" component="label">
          Choose file
          <input type="file" name={name} multiple hidden onChange={onSelectFile} />
        </Button>
      </AnimateButton>
    </Box>
  );
}

InputFileButton.propTypes = {
  defaultValue: PropTypes.any,
  name: PropTypes.any.isRequired,
  logo: PropTypes.any,
};
