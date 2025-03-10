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
  postedTasks: taskType[];
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
export type taskType = {
  id: number;
  status: string;
  clientId: number;
  client: User;
  createdAt: any;
  updatedAt: any;
} & postTaskType;

export type postTaskType = {
  title: string;
  description: string;
  skills: string[];
  reward: string;
};

export type createSubmissionType = {
  demoLinks: string[];
  description: string;
};
export type submissionType = {
  id: number;
  taskId: number;
  userId: number;
  task: taskType;
  user: User;

  rating?: number;
  feedback?: string;
  status: string;
  createdAt: any;
  updatedAt: any;
} & createSubmissionType;
export type notificationType = {
  id: number;
  toId: number;
  fromId: number;
  fromUser: User;
  message: string;
};
export type useAppStore = {
  user: User | null;
  notifications: notificationType[];
  signup: (formData: signupType) => void;
  login: (formData: loginType) => void;
  fetchUser: () => void;
  logout: () => void;
  addExperience: (formData: addExperienceType) => void;
  updateProfile: (formData: updateProfile) => void;
  updateExperience: (formData: addExperienceType, id: number) => void;
  deleteExperience: (id: number) => void;
  postTask: (formData: postTaskType) => void;
  fetchPostedTasks: () => Promise<taskType[]>;
  updateTaskStatus: (status: string, id: number) => void;
  deleteTask: (id: number) => void;
  fetchOpenTasks: () => Promise<taskType[]>;
  fetchTask: (id: string | undefined) => Promise<taskType | null>;
  createSubmisson: (
    id: string | undefined,
    formData: createSubmissionType
  ) => void;
  fetchAllSubmissions: (
    id: string | undefined
  ) => Promise<{ success: true; submissions: submissionType[] | undefined }>;
  acceptSubmission: (id: number | undefined) => void;
  rejectSubmission: (id: number | undefined) => void;
  fetchMyNotifications: () => void;
  deleteNotification: (id: number | undefined) => void;
};
