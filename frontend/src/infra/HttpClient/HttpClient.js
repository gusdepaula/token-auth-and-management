import { tokenService } from '../../services/auth/tokenService';

export async function HttpClient(fetchURL, fetchOptions) {
  const options = {
    ...fetchOptions,
    headers: {
      'Content-Type': 'application/json',
      ...fetchOptions.headers,
    },
    body: fetchOptions.body ? JSON.stringify(fetchOptions.body) : null,
  };
  return fetch(fetchURL, options)
    .then(async res => {
      return {
        ok: res.ok,
        status: res.status,
        statusText: res.statusText,
        body: await res.json(),
      };
    })
    .then(async response => {
      if (!fetchOptions.refresh) return response;
      if (response.status !== 401) return response;
      console.log('Middleware: rodar código para atualizar o token');

      const refreshResponse = await HttpClient(
        'http://localhost:3000/api/refresh',
        {
          method: 'GET',
        }
      );
      const newAccessToken = refreshResponse.body.data.access_token;
      const newRefreshToken = refreshResponse.body.data.refresh_token;

      tokenService.save(newAccessToken);

      const retryResponse = await HttpClient(fetchURL, {
        ...options,
        refresh: false,
        headers: {
          Authorization: `Bearer ${newAccessToken}`,
        },
      });

      return retryResponse;
    });
}
