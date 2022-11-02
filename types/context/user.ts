export interface User {
  displayName: string[];
  mail: string;
}

export interface UserContextInterface {
  user: User | null;
}

export interface UserNUSSO {
  displayName: string[];
  givenName: string[];
  sn: string[];
  eduPersonNickname: string[];
  mail: string;
  nuStudentEmail: string;
  title: string[];
  telephoneNumber: string;
  nuTelephoneNumber2: string;
  nuTelephoneNumber3: string;
  nuOtherTitle: string;
  iat: number;
}
