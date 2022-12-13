export interface User {
  sub: string;
  name: string;
  email: string;
  isLoggedIn: boolean;
  isReadingRoom: boolean;
  iat?: number;
  exp?: number;
  iss?: string;
}

export interface UserContextInterface {
  user: User | null;
}
