export type User = {
  sub?: string;
  name?: string;
  primaryAffiliation?: string;
  email?: string;
  isLoggedIn: boolean;
  isReadingRoom: boolean;
  iat?: number;
  exp?: number;
  iss?: string;
  scopes: string[];
  provider?: string;
  isInstitution: boolean;
};

export type UserContext = {
  user: User | null;
};
