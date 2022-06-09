import { USER_SIGNIN_API } from '../constants/Cyberbugs/Cyberbugs';

export const singinCyberbugAction = (email, password) => ({
  type: USER_SIGNIN_API,
  userLogin: {
    email,
    password,
  },
});
