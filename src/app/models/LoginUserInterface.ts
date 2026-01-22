export interface LoginUserInterface {
  id: number;
  username: string;
  email?: string;
  role: 'ADMIN' | 'USER';
}
