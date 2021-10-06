import React from 'react';
import { Link } from 'react-router-dom';

import { PageHeader } from './styles';
import backIcon from '../../assets/back.svg';
import logo from '../../assets/logo-logo.png';

function HeaderList() {
  return (
    <PageHeader>
      <div className="header">
        <Link to="/dashboard/inicio">
          <img src={backIcon} alt="voltar" height="40px" />
        </Link>
        <img src={logo} alt="voltar" height="100px" />
      </div>

      <div className="header-content">
        <h2>Venda de Produto</h2>
      </div>
    </PageHeader>
  );
}

export default HeaderList;
