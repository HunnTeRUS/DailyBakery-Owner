import UserInterface from "./UserInterface";
import getLoggedUser, { setAndChangeLoggedUser } from "./LoggedUser";

export default async function changeLoggedUserInfo(obj : UserInterface) {
    var currentObj = await getLoggedUser();

    if(currentObj) {
        currentObj.aberto_fechado = obj.aberto_fechado ? obj.aberto_fechado : currentObj.aberto_fechado
        currentObj.bairro = obj.bairro ? obj.bairro : currentObj.bairro
        currentObj.cep = obj.cep ? obj.cep : currentObj.cep
        currentObj.cidade = obj.cidade ? obj.cidade : currentObj.cidade
        currentObj.cnpj = obj.cnpj ? obj.cnpj : currentObj.cnpj
        currentObj.email = obj.email ? obj.email : currentObj.email
        currentObj.estado = obj.estado ? obj.estado : currentObj.estado
        currentObj.nome = obj.nome ? obj.nome : currentObj.nome
        currentObj.numero = obj.numero ? obj.numero : currentObj.numero
        currentObj.numero_celular = obj.numero_celular ? obj.numero_celular : currentObj.numero_celular
        currentObj.numero_telefone = obj.numero_telefone ? obj.numero_telefone : currentObj.numero_telefone
        currentObj.rua = obj.rua ? obj.rua : currentObj.rua
        currentObj.senha = obj.senha ? obj.senha : currentObj.senha
        currentObj.tempo_espera = obj.tempo_espera ? obj.tempo_espera : currentObj.tempo_espera
        currentObj.token = obj.token ? obj.token : currentObj.token
        currentObj.ultima_fornada = obj.ultima_fornada ? obj.ultima_fornada : currentObj.ultima_fornada
    }

    await setAndChangeLoggedUser(currentObj as UserInterface);
}