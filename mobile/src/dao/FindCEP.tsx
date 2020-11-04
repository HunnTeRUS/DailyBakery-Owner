import api from '../services/api'
import CepInterface from '../services/Utils/CepInterface'
export default async function findCEP(cep: string, number: string, _id: string) {
  if (!cep || !number ) {
    throw "CEP não pode ser vazio";
  }
  let data;
  if (_id) {
    data = {
      cep: cep,
      numero: number,
      _id: _id,
    }
  } else {
    data = {
      cep: cep,
      numero: number,
    }
  }
  let obj: CepInterface = {};
  await api({
    method: "post",
    url: "/getAddressByCep",
    data,
  }).then(response => {
    obj = {
      cep: response.data.cep,
      latitude: response.data.latitude ? response.data.latitude : "-23.4813265",
      longitude: response.data.longitude? response.data.longitude: "-46.4281922",
      logradouro: response.data.logradouro ? response.data.logradouro : "",
      bairro: response.data.bairro ? response.data.bairro : "",
      cidade: response.data.cidade ? response.data.cidade : "",
      estado: response.data.estado ? response.data.estado : "",
      error: ""
    }
  }).catch(error => {
    console.log(error.response.data.message ? error.response.data.message : error.response.data.error)
    obj = {
      error: error.response.data.message ? error.response.data.message : error.response.data.error
    };
  })

  return obj;
}