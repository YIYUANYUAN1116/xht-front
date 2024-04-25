// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';


//项目用户相关的请求地址
export enum OAUTH_URL {
  LOGIN_URL = "/api/oauth/login",
  USERINFO_URL = "/api/oauth/user/currentUserInfo",
  LOGOUT_URL = "/api/oauth/logout",
}

/** 登录接口 POST /api/login/account */
export async function myLogin(body: API.LoginParams, options?: { [key: string]: any }) {
    const formData = new FormData();
    formData.append('username', body.username?body.username:"");
    formData.append('password', body.password?body.password:"");
    
    return request<API.LoginResponseData>(OAUTH_URL.LOGIN_URL, {
      method: 'POST',
      data: formData,
      ...(options || {}),
    });
  }

export async function myCurrentUser(options?: { [key: string]: any }) {
  return request<API.UserInfoResponseData>(OAUTH_URL.USERINFO_URL, {
      method: 'GET',
      ...(options || {}),
  });
}