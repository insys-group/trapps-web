export class LoginCredentials {
  username: string;
  password: string;
  grant_type: string = 'password';
}

export class AuthToken {
  accessToken: string;
  refreshToken: string;
  tokenType: string;
  expiresIn: number;
  expiration: Date;
  scopes: Array<string>;
  error: string;
  errorDescription: string;
}