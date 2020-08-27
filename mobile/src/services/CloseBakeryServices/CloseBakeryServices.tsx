import api from '../api'
import closeBakeryDAO from '../../dao/CloseBakeryDAO/CloseBakeryDAO'
import CloseBakeryDAOInterface from '../../dao/CloseBakeryDAO/CloseBakeryDAOInterface'
import { useState } from 'react';
import ChangePasswordDAOInterface from '../../dao/ChangePasswordDAO/ChangePasswordDAOInterface';

export default async function changeOpenedClosedBakery(cnpj: string, token: string, aberto_fechado: boolean) {
    if(!cnpj) {
        throw "CNPJ não pode ser vazio";
    }

    let obj : CloseBakeryDAOInterface = {}

    await closeBakeryDAO(token, cnpj, aberto_fechado).then(response=>{
        obj = response;
    });

    return obj
}