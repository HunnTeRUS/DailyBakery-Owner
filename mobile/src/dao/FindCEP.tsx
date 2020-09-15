import api from '../services/api'
import CepInterface from '../services/Utils/CepInterface'
export default async function findCEP(cep: string, number: string, cnpj: string) {
  if (!cep || !number ) {
    throw "CEP não pode ser vazio";
  }
  let data;
  if (cnpj) {
    data = {
      cep: cep,
      numero: number,
      cnpj: cnpj,
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
  }).catch(Error => {
    obj = {
      error: Error.response.data.message ? Error.response.data.message : Error.response.data.Error
    };
  })

  return obj;
}