import Cookies from 'js-cookie';

const COOKIE_EXPIRES_DAYS = 7;

export const setCookie = (key: string, value: string) => {
    Cookies.set(key, value, { expires: COOKIE_EXPIRES_DAYS, secure: false });
};

export const getCookie = (key: string) => {
    return Cookies.get(key);
};

export const removeCookie = (key: string) => {
    Cookies.remove(key);
};

export const clearCookies = () => {
    Cookies.remove('authToken');
    Cookies.remove('authUsername');
    Cookies.remove('authRoles');
};
