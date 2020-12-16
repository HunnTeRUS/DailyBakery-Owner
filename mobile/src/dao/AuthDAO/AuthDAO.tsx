import api from '../../services/api'
import AuthDAOInterface from './AuthDAOInterface';
import UserInterface from '../../services/Utils/UserInterface';

export default async function verifyToken(token:string, cnpj :string){
    let obj : UserInterface = {}

    if(!token)
        return obj;
    
    await api.post(`/verifyToken`, {
        token: token,
        cnpj: cnpj
    }).then(response =>{
        obj =  {
            nome: response.data.nome,
            email: response.data.email,
            senha: response.data.senha,
            numero_celular: response.data.numero_celular,
            numero_telefone: response.data.numero_telefone,
            cnpj: response.data.cnpj,
            aberto_fechado: response.data.aberto_fechado,
            ultima_fornada: response.data.ultima_fornada,
            cep: response.data.cep,
            rua: response.data.rua,
            numero: response.data.numero,
            bairro: response.data.bairro,
            cidade: response.data.cidade,
            estado: response.data.estado,
            tempo_espera: response.data.tempo_espera,
            token: response.headers['x-access-token'],
            error: ""
          }
          return obj 
    }).catch(error => {
        console.log(error.response.data.message ? error.response.data.message : error.response.data.error)
        obj =  {
            error: error.response.data.message ? error.response.data.message : error.response.data.error 
        }
        return obj       
    }); 
    return obj;
}
