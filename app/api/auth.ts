import api from './api';

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface AuthResponse {
  name: string;
  email: string;
  token: string;
  refreshToken: string;
}

export interface CurrentUsers {
  _id: string;
  name: string;
  email: string;
  token: string;
  refreshToken: string;
}

export interface UsersCurrentRefreshResponse {
  token: string;
  refreshToken: string;
}

export const register = async (
  userData: RegisterData,
): Promise<AuthResponse> => {
  const { data } = await api.post<AuthResponse>('/users/signup', userData);
  return data;
};

export const login = async (userData: LoginData): Promise<AuthResponse> => {
  const { data } = await api.post<AuthResponse>('/users/signin', userData);
  return data;
};

export const logout = async (): Promise<void> => {
  await api.post('/users/signout');
};

export const usersCurrent = async (): Promise<CurrentUsers> => {
  const { data } = await api.get<CurrentUsers>('/users/current');
  return data;
};
export const usersCurrentRefresh = async (
  refreshToken: string,
): Promise<UsersCurrentRefreshResponse> => {
  const { data } = await api.get<UsersCurrentRefreshResponse>(
    '/users/current/refresh',
    {
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
    },
  );
  return data;
};
