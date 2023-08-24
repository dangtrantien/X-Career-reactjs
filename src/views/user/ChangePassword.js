// material-ui
import { Grid } from '@mui/material';

// project import
import AuthCardWrapper from '../authentication/AuthCardWrapper';
import AuthWrapper1 from '../authentication/AuthWrapper1';
import AuthChangePassword from '../authentication/auth-forms/AuthChangePassword';

// ==============================|| USER CHANGE PASSWORD PAGE ||============================== //

const ChangePassword = () => (
  <AuthWrapper1>
    <Grid container direction="column" justifyContent="flex-start" sx={{ minHeight: '100vh' }}>
      <Grid item xs={12}>
        <Grid container justifyContent="center" alignItems="center" sx={{ minHeight: 'calc(100vh - 68px)' }}>
          <Grid item sx={{ m: { xs: 1, sm: 3 }, mb: 0 }}>
            <AuthCardWrapper>
              <Grid container spacing={2} alignItems="center" justifyContent="center">
                <Grid item xs={12}>
                  <AuthChangePassword />
                </Grid>
              </Grid>
            </AuthCardWrapper>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  </AuthWrapper1>
);

export default ChangePassword;
