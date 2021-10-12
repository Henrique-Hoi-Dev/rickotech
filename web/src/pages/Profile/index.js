import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input, Select } from '@rocketseat/unform';

import { updateProfileRequest } from '~/store/modules/user/actions';

import AvatarInput from './AvatarInput';

import { Container } from './styles';

export default function Profile() {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.user.profile);

  function handleSubmit(data) {
    dispatch(updateProfileRequest(data));
  }

  const cargos = [
    { id: 'COLABORADOR', title: 'Colaborador' },
    { id: 'DIRETOR', title: 'Diretor' },
    { id: 'GERENTE', title: 'Gerente' },
    { id: 'CEO', title: 'CEO' },
  ];

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
      <Form initialData={profile} onSubmit={handleSubmit}>
        <AvatarInput name="avatar_id" />
        <h2>Informações básicas</h2>
        <Input name="name" placeholder="Seu nome completo" />
        <Input name="email" placeholder="Seu endereço e-mail" />
        <Input type="text" name="cpf" placeholder="CPF" />
        <Input
          type="date"
          name="data_nacimento"
          placeholder="Data de Nacimento"
        />
        <Select name="cargo" options={cargos} placeholder="Cargos" />
        <hr />
        <h2>Mudar para nova senha</h2>
        <Input type="password" name="oldPassword" placeholder="Sua Senha" />
        <Input type="password" name="password" placeholder="Sua nova senha" />
        <Input
          type="password"
          name="confirmPassword"
          placeholder="Confirme sua nova senha"
        />
        <hr />
        <h2>Endereço</h2>
        <Input
          type="text"
          name="cep"
          placeholder="CEP"
          onBlur={(ev) => onBlurCep(ev)}
        />
        <Input type="text" name="logradouro" placeholder="Logradouro" />
        <Input type="text" name="complemento" placeholder="Complemento" />
        <Input type="text" name="numero" placeholder="Número" />
        <Input type="text" name="bairro" placeholder="Bairro" />
        <Input type="text" name="cidade" placeholder="Cidade" />
        <Select options={estados} name="uf" placeholder="UF" />
        <button type="submit">Atualizar seu perfil</button>
      </Form>
    </Container>
  );
}
