import api from '../api'
import changeContactInfoDAO from '../../dao/ChangeContactInfoDAO'
import { AsyncStorage } from 'react-native';
import UserInterface from '../Utils/UserInterface';
import { useState } from 'react';

export default async function changeContactInfoServices(numero_celular?: string, numero_telefone?: string) {
    async function getLoggedUser() {
        const objUser = await AsyncStorage.getItem('loggedUser');

        if (!objUser)
            return null;

        return JSON.parse(objUser) as UserInterface;
    }

    async function changeValue() {
        const obj = await getLoggedUser();

        if (!obj) return false;

        return await changeContactInfoDAO(obj.cnpj, obj.token, numero_celular, numero_telefone);
    }

    return changeValue();

}