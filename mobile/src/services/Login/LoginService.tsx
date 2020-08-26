import verifyLoginCredentials from '../../dao/LoginDAO'
import { View } from '../../components/Themed';
import UserInterface from '../Utils/UserInterface';

export default async function verifyLoginCredentialsService(cnpj: string, password: string) {
  if (!cnpj) {
    throw "CNPJ dever ser preenchido";
  } else if (!password) {
    throw "Senha dever ser preenchida";
  }

  let obj : UserInterface = {}

  await verifyLoginCredentials(cnpj, password).then(response => {
      obj = response;
  })

  return obj;
}