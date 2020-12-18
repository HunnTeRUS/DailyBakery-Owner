import RegisterInterface from '../../services/Utils/RegisterInterface';
import findEmailDAO from '../../dao/BakeryRegisterDAO/FindEmailDAO';

export default async function RegisterService(email: string) {
  let obj: RegisterInterface = {};

  await findEmailDAO(email).then((response) => {
    obj = response;
  });

  return obj;
}
