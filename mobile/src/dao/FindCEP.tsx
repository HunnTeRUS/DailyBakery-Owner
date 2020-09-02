import api from '../services/api'
import CepInterface from '../services/Utils/CepInterface'
export default async function findCEP(cep: string) {
  if (!cep) {
    throw "CEP não pode ser vazio";
  }
  let obj: CepInterface = {};
  await api({
    method: "GET",
    url: "/getAddressByCep",
    params: {
      cep
    },
  }).then(response => {
    obj = {
      cep: response.data.cep,
      latitude: response.data.latitude,
      longitude: response.data.longitude,
      logradouro: response.data.logradouro ? response.data.logradouro : "",
      bairro: response.data.bairro ? response.data.bairro : "",
      cidade: response.data.cidade.nome ? response.data.cidade.nome : "",
      estado: response.data.estado.sigla ? response.data.estado.sigla : "",
      error: ""
    }
  }).catch(error => {
    console.log(error);
    obj = {
      error: error.response.data.Error
    };
  })

  return obj;
}