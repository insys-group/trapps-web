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
  local_expires_date?: Date;

  constructor(access_token: string, token_type: string, refresh_token: string, expires_in: number, scope: string) {
    this.access_token = access_token;
    this.token_type = token_type;
    this.refresh_token = refresh_token;
    this.expires_in = expires_in;
    this.scope = scope;
    this.local_expires_date = new Date(Date.now() + expires_in);
  }
}