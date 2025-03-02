export type signupType = {
  firstName: string;
  lastName: string;
  role: string;
} & loginType;
export type loginType = {
  email: string;
  password: string;
};
export type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
};

export type useAppStore = {
  user: User | null;
  signup: (formData: signupType) => void;
  login: (formData: loginType) => void;
  fetchUser: () => void;
  logout: () => void;
};
