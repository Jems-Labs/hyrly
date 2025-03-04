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
  skills: string[];
  workExperience: ExperienceType[];
};
export type addExperienceType = {
  company: string;
  title: string;
  fromMonth: string;
  fromYear: string;
  isCurrentlyWorking: boolean;
  toMonth: string;
  toYear: string;
  description: string;
};

export type ExperienceType = {
  id: number;
  userId: number;
} & addExperienceType;

export type updateProfile = {
  firstName: string;
  lastName: string;
  email: string;
  skills: string[];
};

export type useAppStore = {
  user: User | null;
  signup: (formData: signupType) => void;
  login: (formData: loginType) => void;
  fetchUser: () => void;
  logout: () => void;
  addExperience: (formData: addExperienceType) => void;
  updateProfile: (formData: updateProfile) => void;
  updateExperience: (formData: addExperienceType, id: number) => void;
  deleteExperience: (id: number) => void;
};
