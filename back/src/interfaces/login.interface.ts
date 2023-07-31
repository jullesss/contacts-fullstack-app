type TLoginRequest = {
  email: string;
  password: string;
};

type TLoginResponse = {
  token: string;
};

export { TLoginRequest, TLoginResponse };
