import api from '../api'
import findCnpj from '../../dao/FindCnpjDAO'
import { useState } from 'react';
import CnpjInterface from '../Utils/CnpjInterface';

export default async function findCnpjService(cnpj: string) {
  if (!cnpj) {
    throw "CNPJ não pode ser vazio";
  }
  let obj: CnpjInterface = {}
  await findCnpj(cnpj).then(response => {
    obj = response;
   })

  return obj;
}