import api from '../services/api'

export default async function changePasswordDAO(email: string, cnpj: string, newPass: string) {
    if (!email) {
        throw "Email não pode ser vazio";
    }

    try {
        await api.post('/updatePassword', {
            email: email,
            cnpj: cnpj,
            novaSenha: newPass
        });
    }
    catch (e) {
        return e;
    }
}
