export class PasswordCredentials {
  username: string;
  password: string;
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