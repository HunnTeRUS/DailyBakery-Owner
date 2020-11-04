import findCep from '../../dao/FindCEP'
import CepInterface from '../Utils/CepInterface';
import getLoggedUser from '../Utils/LoggedUser';

export default async function FindCEPService(cep: string, number: string) {
  if (!cep || !number) {
    throw "CEP não pode ser vazio"
  }
  const userObj = await getLoggedUser();
  let _id = userObj._id
  let obj: CepInterface = {}
  await findCep(cep, number, _id as string).then(
    response => {
      obj = response;
    }
  )

  return obj;
}