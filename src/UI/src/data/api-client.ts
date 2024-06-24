import ky from 'ky';

/**
 * https://github.com/sindresorhus/ky
 */

const ERROR_CODE_HEADER = 'X-Error-Code';
const VALIDATION_ERROR_HEADER = 'X-Validation-Error';

const apiClient = ky.create({
   redirect: 'manual', // Throw for redirects
   hooks: {
      afterResponse: [
         (_request, _options, response) => {
            handleUnauthorizedResponse(response);
            handleErrorCodeResponse(response);
            handleValidationErrorResponse(response);
         }
      ]
   }
});

function handleUnauthorizedResponse(response: Response) {
   if (response.status !== 401) return;

   // If the user gets 401 response, we know the session has expired
   // -> Redirect user to `loginPath` where the login process will kick in.

   // If the user logs back in, they will be redirected back
   // to the page they were before the redirect happened with
   // the help of the `redirectTo` url-parameter.

   const params = new URLSearchParams({
      redirectTo: location.pathname + location.search
   });

   const loginPath = `${import.meta.env.VITE_LOGIN_PATH}?${params.toString()}`;

   location.assign(loginPath);
}

function handleErrorCodeResponse(response: Response) {
   if (!response.headers.has(ERROR_CODE_HEADER)) return;

   console.error('Error code', response.headers.get(ERROR_CODE_HEADER));
}

async function handleValidationErrorResponse(response: Response) {
   if (!response.headers.has(VALIDATION_ERROR_HEADER)) return;

   const responseJson = await response.json();

   const errors = responseJson;
   for (const error of errors) {
      console.info('Validation error', error.message);
   }
}

export { apiClient };
