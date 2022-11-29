import { useState } from 'react';

// material-ui
import { Avatar, Box, Button, Grid, Typography } from '@mui/material';

// project import
import AnimateButton from 'ui-component/extended/AnimateButton';
import PropTypes from 'prop-types';
import EndcodeFileBase64 from 'utils/endcodeFileBase64';
import BackgroundLetterAvatars from 'ui-component/BackgroundLetterAvatar';

// ==============================|| INPUT FILE BUTTON ||============================== //
// dialog form wrapper
function DialogForm({ children, value, type }) {
  return (
    <div role="tabpanel" hidden={value !== type} id={`profile-tabpanel-${type}`} aria-labelledby={`profile-tab-${type}`}>
      {value === type && children}
    </div>
  );
}

DialogForm.propTypes = {
  children: PropTypes.node,
  type: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};
// ================================================================================ //

export default function InputFileButton({ defaultValue, name, type, logo }) {
  const [selectedFile, setSelectedFile] = useState();

  const onSelectFile = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      return setSelectedFile(defaultValue);
    }

    EndcodeFileBase64(e.target.files[0]).then((res) => {
      setSelectedFile(res);
    });
  };

  return (
    <>
      <DialogForm value={type} type="image">
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
            <input type="file" name={name} multiple style={{ display: 'none' }} onChange={onSelectFile} id="contained-button-file" />
            <label htmlFor="contained-button-file">
              <Button variant="contained" color="primary" component="span">
                Choose file
              </Button>
            </label>
          </AnimateButton>
        </Box>
      </DialogForm>

      <DialogForm value={type} type="audio">
        <AnimateButton>
          <input type="file" name={name} multiple style={{ display: 'none' }} onChange={onSelectFile} id="contained-button-file" />
          <label htmlFor="contained-button-file">
            <Button variant="contained" color="primary" component="span">
              Choose file
            </Button>
          </label>
        </AnimateButton>

        <Grid item>
          {selectedFile && (
            <Typography variant="h6" color="success.light">
              Your file is ready to upload
            </Typography>
          )}
        </Grid>
      </DialogForm>
    </>
  );
}

InputFileButton.propTypes = {
  defaultValue: PropTypes.any,
  name: PropTypes.any.isRequired,
  type: PropTypes.any.isRequired,
  logo: PropTypes.any,
};
