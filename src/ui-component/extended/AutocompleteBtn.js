import PropTypes from 'prop-types';
import { useAutocomplete } from '@mui/base/AutocompleteUnstyled';
import { styled } from '@mui/material/styles';
import { autocompleteClasses } from '@mui/material/Autocomplete';
import { Avatar, Chip, Typography } from '@mui/material';
import { useState, useEffect } from 'react';

// ==============================|| CUSTOMIZED AUTOCOMPLETE BUTTON ||============================== //
const InputWrapper = styled('div')(
  ({ theme }) => `
  border: 1px solid ${theme.palette.mode === 'dark' ? '#434343' : '#d9d9d9'};
  background-color: ${theme.palette.mode === 'dark' ? '#141414' : '#fff'};
  border-radius: 10px;
  padding: 5px;
  display: flex;
  flex-wrap: wrap;

  &:hover {
    border-color: ${theme.palette.mode === 'dark' ? '#177ddc' : '#40a9ff'};
  }

  &.focused {
    border-color: ${theme.palette.mode === 'dark' ? '#177ddc' : '#40a9ff'};
    box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
  }

  & input {
    background-color: ${theme.palette.mode === 'dark' ? '#141414' : '#fff'};
    color: ${theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.65)' : 'rgba(0,0,0,.85)'};
    height: 30px;
    box-sizing: border-box;
    padding: 4px 6px;
    width: 0;
    min-width: 30px;
    flex-grow: 1;
    border: 0;
    margin: 0;
    outline: 0;
  }
`
);

const Listbox = styled('ul')(
  ({ theme }) => `
  margin: 2px 0 0;
  padding: 0;
  list-style: none;
  background-color: ${theme.palette.mode === 'dark' ? 'black' : 'white'};
  max-height: 250px;
  overflow-y: hidden;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  z-index: 1;

  &:hover {
    overflow-y: auto;
    &::-webkit-scrollbar {
      width: 7px;
    }
    &::-webkit-scrollbar-track {
      background: #f1f1f1; 
      border-radius: 10px;
    }
    &::-webkit-scrollbar-thumb {
      background: #888; 
      border-radius: 10px;
    }
    &::-webkit-scrollbar-thumb:hover {
      background: #555; 
    }
  }

  & li {
    padding: 5px 12px;
    display: flex;
    align-items: center;
  }

  & li.${autocompleteClasses.focused} {
    background-color: ${theme.palette.mode === 'dark' ? '#e6f7ff' : 'rgba(128, 0, 128, 0.3)'};
    cursor: pointer;
  }
`
);

export default function AutocompleteBtn({ options, member, handleChange }) {
  const [users, setUsers] = useState([]);

  const { getRootProps, getInputProps, getTagProps, getListboxProps, getOptionProps, groupedOptions, value, focused, setAnchorEl } =
    useAutocomplete({
      id: 'customized-autocomplete',
      value: member,
      onChange: handleChange,
      multiple: true,
      filterSelectedOptions: true,
      options: users,
      getOptionLabel: (option) => option.email || option.name,
    });

  useEffect(() => {
    if (member !== []) {
      member.map((result) => {
        options.map((res, index) => {
          if (res._id === result._id) {
            options.splice(index, 1);
          }
        });
      });

      setUsers(options);
    } else {
      setUsers(options);
    }
  }, [options, member]);

  return (
    <>
      <div {...getRootProps()}>
        <InputWrapper ref={setAnchorEl} className={focused ? 'focused' : ''}>
          {value.map((option, index) => (
            <Chip
              key={option._id}
              avatar={<Avatar alt={option.name} src={option.avatar.data} />}
              label={option.name}
              variant="outlined"
              {...getTagProps({ index })}
            />
          ))}

          <input {...getInputProps()} placeholder="Looking for members" />
        </InputWrapper>
      </div>
      {groupedOptions.length > 0 ? (
        <Listbox {...getListboxProps()}>
          {groupedOptions.map((option, index) => (
            <li key={option._id} {...getOptionProps({ option, index })}>
              <Avatar alt={option.name} src={option.avatar.data} />
              <Typography sx={{ ml: 2 }} variant="h5">
                {option.name}
              </Typography>
            </li>
          ))}
        </Listbox>
      ) : null}
    </>
  );
}

AutocompleteBtn.propTypes = {
  options: PropTypes.array.isRequired,
  member: PropTypes.array,
  handleChange: PropTypes.any,
};
