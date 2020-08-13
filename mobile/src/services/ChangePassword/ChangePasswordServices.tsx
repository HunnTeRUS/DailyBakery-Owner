import api from '../api'
import changePasswordDAO from '../../dao/ChangePasswordDAO'
import { useState } from 'react';

export default async function sendVerificationEmailServices(email: string, cnpj: string, newPass: string) {
    if(!cnpj || !email || !newPass) {
        throw "Não podem existir campos vazios";
    }

    try{
        await changePasswordDAO(email, cnpj, newPass);
    } catch(e){
        return e;
    }
}