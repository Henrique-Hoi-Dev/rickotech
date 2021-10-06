import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { signOut } from '../../store/modules/auth/actions';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';

import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import ListItem from '@mui/material/ListItem';
import ListAltIcon from '@mui/icons-material/ListAlt';
import ListItemIcon from '@mui/material/ListItemIcon';
import Logout from '@mui/icons-material/Logout';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

import { TiThMenu } from 'react-icons/ti';
import { Container, Header, Perfil } from './styles';

export default function Home() {
  const profile = useSelector((state) => state.user.profile);

  const [state, setState] = React.useState({
    top: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <ListItem >
         <DashboardIcon /> <Link to="/dashboard/inicio"> Dashboard </Link> 
        </ListItem >
        <ListItem >
         <AttachMoneyIcon /> <Link to="/caixa"> Caixa </Link> 
        </ListItem >
        <ListItem >
         <PointOfSaleIcon /> <Link to="/venda"> Fazer uma venda </Link> 
        </ListItem >
        <ListItem >
         <ProductionQuantityLimitsIcon /> <Link to="/product">Registro de produto</Link> 
        </ListItem >
        <ListItem >
         <ListAltIcon /> <Link to="/list"> Lista produtos </Link> 
        </ListItem >
      </List>
      <Divider />
      <List>
        <ListItem >
         <ListAltIcon /> <Link to="#">Todos os dividendos</Link> 
        </ListItem >
        <ListItem >
         <ListAltIcon /> <Link to="#">Lista pagos </Link> 
        </ListItem >
        <ListItem >
         <ListAltIcon /> <Link to="#">Lista pendentes </Link> 
        </ListItem >
        <ListItem >
         <ListAltIcon /> <Link to="#">Lista cancelados</Link> 
        </ListItem >
        <ListItem >
         <ListAltIcon /> <Link to="#">Lista vencidos</Link> 
        </ListItem >
        <ListItem >
         <ProductionQuantityLimitsIcon /> <Link to="#">Registro de dividendo</Link> 
        </ListItem >
      </List>
    </Box>
  );

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
        <div>
          {['left'].map((anchor) => (
            <React.Fragment key={anchor}>
              <Button onClick={toggleDrawer(anchor, true)}>
                <TiThMenu size={50} color="#4D4C4C" onClick={toggleDrawer(true)} />
              </Button>
              <Drawer
                anchor={anchor}
                open={state[anchor]}
                onClose={toggleDrawer(anchor, false)}
              >
                {list(anchor)}
              </Drawer>
            </React.Fragment>
          ))}
        </div>
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
