import api from '../services/api'
import RegisterInterface from '../services/Utils/RegisterInterface'
export default async function register(nome: string,email: string,senha: string,numero_celular: string,numero_telefone: string,cnpj: string,cep: String,rua: String,
  numero: String,bairro: String,cidade: String,estado: String,latitude: string,longitude: string) {
  
  let obj: RegisterInterface = {}
  
  if (!nome || !email || !senha || !numero_celular || !cnpj || !cep || !rua || !numero || !bairro || !cidade || !estado || !latitude || !longitude) {
    throw "Não pode haver campos vazios"
  }

  let objSend;
  
  if(numero_telefone)
    objSend = {
      nome: nome,
      email: email,
      senha: senha,
      numero_celular: numero_celular,
      numero_telefone: numero_telefone,
      cnpj: cnpj,
      aberto_fechado: true,
      cep: cep,
      rua: rua,
      numero: numero,
      bairro: bairro,
      cidade: cidade,
      estado: estado,
      latitude: latitude,
      longitude: longitude,
    }
  else objSend = {
    nome: nome,
    email: email,
    senha: senha,
    numero_celular: numero_celular,
    cnpj: cnpj,
    aberto_fechado: true,
    cep: cep,
    rua: rua,
    numero: numero,
    bairro: bairro,
    cidade: cidade,
    estado: estado,
    latitude: latitude,
    longitude: longitude,
  }

  await api.post('/insertBakery', objSend).then(Response => {
    obj = {
      token: Response.headers['x-access-token'],
      nome: Response.data.nome,
      email: Response.data.email,
      senha: Response.data.senha,
      numero_celular: Response.data.numero_celular,
      numero_telefone: Response.data.numero_telefone,
      cnpj: Response.data.cnpj,
      cep: Response.data.cep,
      rua: Response.data.rua,
      numero: Response.data.numero,
      bairro: Response.data.bairro,
      cidade: Response.data.cidade,
      estado: Response.data.estado,
      error: "",
    }
  }).catch(error => {
      console.log(error.response.data.message)
      obj = {
        error: error.response.data.message ? error.response.data.message : error.response.data.error
      }
    })

    console.log("\n" + obj);
  return obj;
}