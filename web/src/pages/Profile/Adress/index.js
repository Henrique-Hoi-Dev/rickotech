import React from 'react';
import { Form, Input, Select } from '@rocketseat/unform';
import { useParams } from 'react-router';

import { Container } from './styles';
import { useDispatch, useSelector } from 'react-redux';
import { createAdressRequest, updateAdressRequest } from '~/store/modules/adress/actions';

export default function Adress() {
  const dispatch = useDispatch();
  const adresses = useSelector((state) => state.adress.adresses);
  const { id } = useParams();

  function handleSubmit(adress) {
    try {
      if(adresses === null) {
        dispatch(createAdressRequest(adress, id));
      } else {
        dispatch(updateAdressRequest(adress, adresses.id)); 
      }
    } catch {
      return 
    }
  }

  const estados = [
    { id: 'AC', title: 'Acre' },
    { id: 'AL', title: 'Alagoas' },
    { id: 'AP', title: 'Amapá' },
    { id: 'AM', title: 'Amazonas' },
    { id: 'BA', title: 'Bahia' },
    { id: 'CE', title: 'Ceará' },
    { id: 'DF', title: 'Distrito Federal' },
    { id: 'ES', title: 'Espírito Santo' },
    { id: 'GO', title: 'Goiás' },
    { id: 'MA', title: 'Maranhão' },
    { id: 'MT', title: 'Mato Grosso' },
    { id: 'MS', title: 'Mato Grosso do Sul' },
    { id: 'MG', title: 'Minas Gerais' },
    { id: 'PA', title: 'Pará' },
    { id: 'PB', title: 'Paraíba' },
    { id: 'PR', title: 'Paraná' },
    { id: 'PE', title: 'Pernambuco' },
    { id: 'PI', title: 'Piaui' },
    { id: 'RJ', title: 'Rio de Janeiro' },
    { id: 'RS', title: 'Rio Grande do Sul' },
    { id: 'RN', title: 'Rio Grande do Norte' },
    { id: 'RO', title: 'Rondônia' },
    { id: 'RR', title: 'Roraima' },
    { id: 'SC', title: 'Santa Catarina' },
    { id: 'SP', title: 'São Paulo' },
    { id: 'SE', title: 'Sergipe' },
    { id: 'TO', title: 'Tocantins' },
  ];

  function onBlurCep(ev) {
    const { value } = ev.target;
    const cep = value?.replace(/[^0-9]/g, '');

    if (cep?.length !== 8) {
      return;
    }

    fetch(`https://viacep.com.br/ws/${cep}/json/`)
      .then((res) => res.json())
      .then((data) => {
        document.querySelector("[name='cidade']").value = data.localidade;
        document.querySelector("[name='logradouro']").value = data.logradouro;
        document.querySelector("[name='bairro']").value = data.bairro;
        document.querySelector("[name='uf']").value = data.uf;
      });
  }

 return (
   <Container>
    <h2>Endereço</h2>
    <label htmlFor="adress">
     <Form initialData={adresses} onSubmit={handleSubmit} >
        <Input type="text" name="cep" placeholder="CEP" onBlur={(ev) => onBlurCep(ev)} />
        <Input type="text" name="logradouro" placeholder="Logradouro" />
        <Input type="text" name="complemento" placeholder="Complemento" />
        <Input type="text" name="numero" placeholder="Número" />
        <Input type="text" name="bairro" placeholder="Bairro" />
        <Input type="text" name="cidade" placeholder="Cidade" />
        <Select options={estados} name="uf" placeholder="UF" />
        <hr/>
        <button className="adresses" type="submit">
          Atulizar seu endereço
        </button>
     </Form>
     </label>
   </Container>
  ); 
}