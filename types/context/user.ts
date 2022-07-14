export interface User {
  displayName: string[];
  mail: string;
}

export interface UserContextInterface {
  logout: () => void;
  user: User | null;
}
