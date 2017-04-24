export class LoginCredentials {
  username: string;
  password: string;
  repeatPassword: string;
  grant_type: string = 'password';
}

export class AuthToken {
  access_token: string;
  token_type: string;
  refresh_token: string;
  expires_in: number;
  scope: string;
}