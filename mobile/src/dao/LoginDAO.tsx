import api from '../services/api'
import UserInterface from '../services/Utils/UserInterface';

async function verifyLoginCredentials(cnpj: string, password: string) {
  if (!cnpj) {
    throw "CNPJ dever ser preenchido";
  } else if (!password) {
    throw "Senha dever ser preenchida";
  }

  let obj: UserInterface = {};

  await api.post('/bakeryLogin', { cnpj: cnpj, senha: password, }, {
    timeout: 1000
  }).then(response => {
    obj = {
      nome: response.data?.nome,
      email: response.data?.email,
      senha: response.data?.senha,
      numero_celular: response.data?.numero_celular,
      numero_telefone: response.data?.numero_telefone,
      cnpj: response.data?.cnpj,
      aberto_fechado: response.data?.aberto_fechado,
      ultima_fornada: response.data?.ultima_fornada,
      cep: response.data?.cep,
      rua: response.data?.rua,
      numero: response.data?.numero,
      bairro: response.data?.bairro,
      cidade: response.data?.cidade,
      estado: response.data?.estado,
      tempo_espera: response.data?.tempo_espera,
      token: response.headers['x-access-token'],
      error: ""
    }
    return obj

  }).catch(error => {
    obj = {
      error: error.response.data.message ? error.response.data.message : error.response.data.error
    }
    return obj

  });

  return obj
}

export default verifyLoginCredentials;