// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.

export const API_URL='http://trapps-api.apps.luxoft-pcf.com/api/v1/';

export const environment = {
  production: false,
  name: 'dev',
  PERSON_URL:  API_URL + 'persons/',
  PERSON_UPDATE_URL: API_URL + 'persons/put/',
  PERSON_DOCUMENT_URL: API_URL + 'persondocuments/',
  BUSINESS_URL: API_URL + 'businesses/',
  STATE_URL: API_URL + 'states/'
};
