import AxiosInstance from "./AxiosInterceptor";

const domain = "http://localhost:8000/api/v1/users";

interface Login {
  email: string;
  password: string;
}

export interface Register {
  fullName: string;
  email: string;
  password: string;
  username: string;
  avatar: File | undefined;
  coverImage?: File | null;
}

export const postLogin = (data: Login) => {
  return AxiosInstance.post(`${domain}/login`, data);
};

export const postRegistration = (data: FormData) => {
  return AxiosInstance.post(`${domain}/register`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
