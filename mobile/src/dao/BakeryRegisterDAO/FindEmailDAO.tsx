import api from '../../services/api';
import RegisterInterface from '../../services/Utils/RegisterInterface';
export default async function findEmailDAO(email: string) {
  if (!email) {
    throw 'E-mail não pode ser vazio';
  }
  let data;
  data = {
    email: email,
  };

  let obj: RegisterInterface = {};
  await api({
    method: 'post',
    url: '/findBakeryByEmail',
    data,
  })
    .then((response) => {
      obj = {
        error: response.data.error ? response.data.error : '',
      };
    })
    .catch((error) => {
      console.log(
        error.response.data.message
          ? error.response.data.message
          : error.response.data.error
      );
      obj = {
        error: error.response.data.message
          ? error.response.data.message
          : error.response.data.error,
      };
    });

  return obj;
}
