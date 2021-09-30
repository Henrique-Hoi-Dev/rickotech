import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { signOut } from '../../store/modules/auth/actions';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';

import { TiThMenu } from 'react-icons/ti';
import { Container, Header, Perfil } from './styles';

export default function Home() {
  const profile = useSelector((state) => state.user.profile);

  const [anchorEl, setAnchorEl] = React.useState(null);

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
          <TiThMenu onClick={handleClick} size={50} color="#4D4C4C" />
          <Menu
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>
              <Link className={classes.root} to="/dashboard/inicio">
                Inicio
              </Link>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <Link className={classes.root} to="/perfil">
                Perfil
              </Link>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <Link className={classes.root} to="/product">
                Cadastrar produtos
              </Link>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <Link className={classes.root} to="/list">
                Lista de produtos
              </Link>
            </MenuItem>
            <MenuItem className={classes.root} onClick={handleClose}>
              <Link className={classes.root} to="/venda">
                Venda
              </Link>
            </MenuItem>
            <MenuItem className={classes.exit} onClick={handleSignOut}>
              Sair
            </MenuItem>
          </Menu>
        </div>

        <Perfil>
          <nav>
            <h4>Profissional:</h4>
            <strong>{profile.name}</strong>
            <h4>Cargo:</h4>
            <strong>{profile.cargo ? profile.cargo : 'sem cargo'}</strong>
          </nav>

          <img
            src={
              profile.avatar
                ? profile.avatar.url
                : 'https://i.pinimg.com/474x/a6/70/05/a67005e9bf90bc529088205650784bba.jpg'
            }
            alt="avatar"
          />
        </Perfil>
      </Header>
    </Container>
  );
}
