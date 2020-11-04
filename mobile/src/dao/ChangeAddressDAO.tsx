import api from '../services/api'
import CepInterface from '../services/Utils/CepInterface';

export default async function changeAddressDAO(_id: string, token: string, cep: string, street: string, neighbourhood: string, state: string, city: string, latitude: string, longitude: string, number: string,) {
  if (!_id || !token || !cep || !street || !neighbourhood || !state || !city || !number || !latitude || !longitude ) {
    throw "CNPJ e/ou numero de celular não podem ser vazios."
  }

  var data = {
    "cep": cep,
    "rua": street,
    "bairro": neighbourhood,
    "estado": state,
    "cidade": city,
    "numero": number,
    "latitude": latitude,
    "longitude": longitude,
  };

  let obj: CepInterface = {}

  await api({
    method: 'put', //you can set what request you want to be
    url: '/updateBakeryAddress',
    data,
    headers: {
      'x-auth-token': token
    },
    params: {
      _id: _id
    }
  }).catch(error => {
    console.log(error.response.data.message ? error.response.data.message : error.response.data.error)

    obj = {
      error: error.response.data.message ? error.response.data.message : error.response.data.error
    }
  });

  return obj;
}

