import findCep from '../../dao/FindCEP'
import CepInterface from '../Utils/CepInterface';

export default async function FindCEPService(cep: string) {
  if (!cep) {
    throw "CEP não pode ser vazio"
  }

  let obj: CepInterface = {}
  await findCep(cep).then(
    response => {
      obj = response;
    }
  )

  
  return obj;
}