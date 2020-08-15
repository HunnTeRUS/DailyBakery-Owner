import api from '../services/api'
import { View } from '../components/Themed';
import ModalPopupInfos from '../components/ModalPopup/ModalPopupInfo/ModalPopupInfos';
import { useState } from 'react';

export default async function verifyLoginCredentials(cnpj: string, password: string) {
  if (!cnpj) {
    throw "CNPJ dever ser preenchido";
  } else if (!password) {
    throw "Senha dever ser preenchida";
  }

  const response = await api.post('/bakeryLogin', {
    cnpj: cnpj,
    senha: password,
  });

  if (response.status !== 200) {
    throw "CNPJ e/ou senha inválidos"
  }
  const obj = {
    nome: response.data.nome,
    email: response.data.email,
    senha: response.data.senha,
    numero_celular: response.data.numero_celular,
    numero_telefone: response.data.numero_telefone,
    cnpj: response.data.cnpj,
    aberto_fechado: response.data.aberto_fechado,
    ultima_fornada: response.data.ultima_fornada,
    cep: response.data.cep,
    rua: response.data.rua,
    numero: response.data.numero,
    bairro: response.data.bairro,
    cidade: response.data.cidade,
    estado: response.data.estado,
    ibge: response.data.ibge,
    gia: response.data.gia,
    tempo_espera: response.data.tempo_espera,
  }


  return obj;
}