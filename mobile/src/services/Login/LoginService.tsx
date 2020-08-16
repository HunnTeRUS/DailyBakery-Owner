import verifyLoginCredentials from '../../dao/LoginDAO'
import { View } from '../../components/Themed';

export default async function verifyLoginCredentialsService(cnpj: string, password: string) {
  if (!cnpj) {
    throw "CNPJ dever ser preenchido";
  } else if (!password) {
    throw "Senha dever ser preenchida";
  }
  try {
    const response = await verifyLoginCredentials(cnpj, password)

    const obj = {
      nome: response?.nome,
      email: response?.email,
      senha: response?.senha,
      numero_celular: response?.numero_celular,
      numero_telefone: response?.numero_telefone,
      cnpj: response?.cnpj,
      aberto_fechado: response?.aberto_fechado,
      ultima_fornada: response?.ultima_fornada,
      cep: response?.cep,
      rua: response?.rua,
      numero: response?.numero,
      bairro: response?.bairro,
      cidade: response?.cidade,
      estado: response?.estado,
      ibge: response?.ibge,
      gia: response?.gia,
      tempo_espera: response?.tempo_espera,
    }

    return obj;
  } catch (error) {
    return error
  }
}