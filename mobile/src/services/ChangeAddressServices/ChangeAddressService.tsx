import getLoggedUser from '../Utils/LoggedUser';
import CepInterface from '../Utils/CepInterface';
import ChangeAdress from '../../dao/ChangeAddressDAO'

export default async function ChangeAdressService( cep: string, street: string, neighbourhood: string, state: string, city: string, latitude: string, longitude: string, number: string,) {
  if (!cep || !street || !neighbourhood || !state || !city || !number || !latitude || !longitude) {
    throw "CNPJ e/ou numero de celular não podem ser vazios."
  }  
  
  let objResponse: CepInterface = {};


    const obj = await getLoggedUser();

    if(obj?._id && obj?.token)
        await ChangeAdress(obj._id ? obj._id : "", obj.token ? obj.token : "", cep, street, neighbourhood, state, city, latitude, longitude, number)
        .then(response => {
            objResponse = response;
        });
    else {
        objResponse.error = "Não foi possivel recuperar o usuario logado";
        return objResponse;
    }

    return objResponse;
}