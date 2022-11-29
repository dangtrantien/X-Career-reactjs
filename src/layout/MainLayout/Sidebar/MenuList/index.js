import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// material-ui
import { Typography } from '@mui/material';

// icons

// project imports
import NavItem from './NavItem';
import WorkSpaceAPI from 'services/WorkSpaceAPI';

// ==============================|| SIDEBAR MENU LIST ||============================== //
const workSpaceAPI = new WorkSpaceAPI();

const MenuList = () => {
  const [workspace, setWorkSpace] = useState([]);

  const userId = sessionStorage.getItem('id');

  useEffect(() => {
    workSpaceAPI.getAll().then((result) => {
      const ws = [];

      result.data.data.map((res) => {
        if (res.userID._id === userId) {
          ws.push(res);
        }
      });

      setWorkSpace(ws);
    });
  }, [userId]);

  return (
    <>
      {workspace.map((item) => {
        console.log(item);
        <>
          <NavItem key={item._id} item={item.name} />
        </>;
      })}
    </>
  );
};

export default MenuList;
