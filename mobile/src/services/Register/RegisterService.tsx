import RegisterInterface from '../../services/Utils/RegisterInterface'
import register from '../../dao/RegisterDAO'
import { AsyncStorage } from 'react-native'
import UserInterface from '../../services/Utils/RegisterInterface'
import verifyLoginCredentialsService from '../Login/LoginService'


export default async function RegisterService(
  nome: string,
  email: string,
  senha: string,
  numero_celular: string,
  numero_telefone: string,
  cnpj: string,
  cep: String,
  rua: String,
  numero: String,
  bairro: String,
  cidade: String,
  estado: String,
  latitude: string,
  longitude: string,
) {

  let obj: RegisterInterface = {}

  await register(
    nome,
    email,
    senha,
    numero_celular,
    numero_telefone,
    cnpj,
    cep,
    rua,
    numero,
    bairro,
    cidade,
    estado,
    latitude,
    longitude).then(response => {
      obj = response
    })

  return obj;
}
