import api from '../api'
import sendVerificationEmail from '../../dao/ForgotPasswordDAO'
import { useState } from 'react';

export default async function sendVerificationEmailServices(cnpj: string) {
    if(!cnpj) {
        throw "CNPJ não pode ser vazio";
    }

    const response = await sendVerificationEmail(cnpj);

    const obj = {
        email: response.email,
        cnpj: response.cnpj,
        codigoEnviado: response.codigoEnviado,
    }

    return obj;
}