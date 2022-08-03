

export interface LoginCriteria {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface LoginResult {
  firstName: string;
  lastName: string;
  email: string;
  id: string;
  loggedIn: boolean;
}
