import api from '../api'
import sendVerificationEmail from '../../dao/ForgotPasswordDAO'

export default async function sendVerificationEmailServices(emails: string){
    if(!emails) {
        throw "Email não pode ser vazio";
    }
   
    const obj = sendVerificationEmail(emails);

    console.log((await obj).codigoEnviado)
}