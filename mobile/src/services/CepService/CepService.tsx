import findCep from '../../dao/FindCEP'
import CepInterface from '../Utils/CepInterface';
import getLoggedUser from '../Utils/LoggedUser';

export default async function FindCEPService(cep: string, number: string) {
  if (!cep || !number) {
    throw "CEP não pode ser vazio"
  }
  const userObj = await getLoggedUser();
  let cnpj = userObj.cnpj
  let obj: CepInterface = {}
  await findCep(cep, number, cnpj as string).then(
    response => {
      obj = response;
    }
  )

  
  return obj;
}