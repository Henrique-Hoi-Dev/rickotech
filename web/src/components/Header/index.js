import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { signOut } from '../../store/modules/auth/actions';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';

import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import ListItemIcon from '@mui/material/ListItemIcon';
import Logout from '@mui/icons-material/Logout';

// import { TiThMenu } from 'react-icons/ti';
import { Container, Header, Perfil } from './styles';

export default function Home() {
  const profile = useSelector((state) => state.user.profile);

  const [anchorEl, setAnchorEl] = React.useState(null);

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // função para deslogar
  const dispatch = useDispatch();
  function handleSignOut() {
    dispatch(signOut());
  }

  const useStyles = makeStyles({
    root: {
      borderRadius: 3,
      border: 0,
      height: '20px',
      color: '#9c98a6',
      textDecoration: 'none',
      fontWeight: 'bold',
      fontSize: '16px',
    },
    exit: {
      color: 'red',
    },
  });

  const classes = useStyles();

  return (
    <Container>
      <Header>
        <Perfil>
          <nav>
            <h4>Profissional:</h4>
            <strong>{profile.name}</strong>
            <h4>Cargo:</h4>
            <strong>{profile.cargo ? profile.cargo : 'sem cargo'}</strong>
        
          </nav>
               <img onClick={handleClick} 
                src={
                  profile.avatar
                  ? profile.avatar.url
                    : 'https://i.pinimg.com/474x/a6/70/05/a67005e9bf90bc529088205650784bba.jpg'
                  }
                alt="avatar"
              />
              <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                  elevation: 0,
                  sx: {
                    overflow: 'visible',
                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                    mt: 1.5,
                    '& .MuiAvatar-root': {
                      width: 32,
                      height: 32,
                      ml: -0.5,
                      mr: 1,
                    },
                    '&:before': {
                      content: '""',
                      display: 'block',
                      position: 'absolute',
                      top: 0,
                      right: 14,
                      width: 10,
                      height: 10,
                      bgcolor: 'background.paper',
                      transform: 'translateY(-50%) rotate(45deg)',
                      zIndex: 0,
                    },
                  },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
              >
                <MenuItem>
                  <Avatar />
                  <Link className={classes.root} to="/perfil">
                    Profile
                  </Link>
                </MenuItem>
                <Divider />
                <MenuItem className={classes.exit} onClick={handleSignOut}>
                  <ListItemIcon>
                    <Logout fontSize="small" />
                  </ListItemIcon>
                  Logout
                </MenuItem>
              </Menu> 
        </Perfil>
      </Header>
    </Container>
  );
}
