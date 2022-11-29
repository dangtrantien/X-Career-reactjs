// project imports
import PropTypes from 'prop-types';

// ==============================|| DIALOG FORM WRAPPER ||============================== //

export default function DialogForm({ children, value, index }) {
  return (
    <div role="tabpanel" hidden={value !== index} id={`profile-tabpanel-${index}`} aria-labelledby={`profile-tab-${index}`}>
      {value === index && children}
    </div>
  );
}

DialogForm.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};
