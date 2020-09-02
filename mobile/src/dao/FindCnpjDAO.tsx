import api from '../services/api'
import CnpjInterface from '../services/Utils/CnpjInterface';

export default async function findCnpj(cnpj: string) {
  if (!cnpj) {
    throw "CNPJ não pode ser vazio";
  }
  let obj: CnpjInterface = {}
  await api({
    method: 'get',
    url: '/verifyCnpj',
    params: {
      cnpj: cnpj
    },
  }).then(response => {
    obj = {
      cnpj: response.data.cnpj,
      error: ""
    }
  }).catch(error => {
    obj = {
      error: error.response.data.Error
    }
  })
  return obj;
}
