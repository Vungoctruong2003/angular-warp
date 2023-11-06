export const RouterPath = {
  auth: {
    login: 'login',
    register: 'register',
    logout: 'logout',
  },

  users: {
    getAll: 'users'
  },

  roles: {
    getAll: 'roles'
  }

}

export const API_DOMAIN = 'http://localhost:4001/';
export const AUTH_PATH_PREFIX = 'auth';
export const USER_PATH_PREFIX = 'users';
export const ROLE_PATH_PREFIX = 'roles';

export const MESSAGE = {
  VALIDATE: {
    'required': 'Trường này là bắt buộc',
    'email': 'Không đúng định dạng'
  }
}
