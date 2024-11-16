import { defineEventHandler, readBody } from 'h3';

interface AuthRequestBody {
  login: string;
  password: string;
}

export default defineEventHandler(async (event) => {
  try {
    const body: AuthRequestBody = await readBody(event);
    const { login, password } = body;
    console.log(login)

    const response = await $fetch('http://127.0.0.1:8000/api/authorization/', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        login,
        password,
      }),
    });
    console.log(response)

    return  {
      data: response,
      statusCode: 200
    }; 

  } catch (error: any) {
    console.error('Ошибка при выполнении запроса:', error);

    return {
      data: {},
      statusCode: error.statusCode
    };
  }
});
