import RegisterInterface from '../../services/Utils/RegisterInterface'
import register from '../../dao/RegisterDAO'


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

  console.log(
    "\n" + nome,
    "\n" + email,
    "\n" + senha,
    "\n" + numero_celular,
    "\n" + numero_telefone,
    "\n" + cnpj,
    "\n" + cep,
    "\n" + rua,
    "\n" + numero,
    "\n" + bairro,
    "\n" + cidade,
    "\n" + estado,
    "\n" + latitude,
    "\n" + longitude
  )
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
