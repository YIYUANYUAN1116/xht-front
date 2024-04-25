// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

export enum ACTIVITI_URL {
  APPLY_URL = "/api/activiti/apply",
  DEPLOY_URL = "/api/activiti/deploy",
  DEPLOYLIST_URL = "/api/activiti/deployList",
  GETCURTASKBYID_URL = "/api/activiti/getCurTaskById",
  GETHITASKBYID_URL = "/api/activiti/getHiTaskById",
}

/** 开启一个流程 POST /activiti/apply */
export async function apply(body: API.ApplyDto, options?: { [key: string]: any }) {
  return request<API.Result>(ACTIVITI_URL.APPLY_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 部署 POST /activiti/deploy */
export async function deploy(body: {}, options?: { [key: string]: any }) {
  return request<API.Result>(ACTIVITI_URL.DEPLOY_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: body,
    ...(options || {}),
  });
}

/** 流程定义信息 GET /activiti/deployList */
export async function deployList(options?: { [key: string]: any }) {
  return request<API.Result>(ACTIVITI_URL.DEPLOYLIST_URL, {
    method: 'GET',
    ...(options || {}),
  });
}

/** 获取用户待处理task GET /activiti/getCurTaskById */
export async function getCurTaskById(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getCurTaskByIdParams,
  options?: { [key: string]: any },
) {
  return request<API.Result>(ACTIVITI_URL.GETCURTASKBYID_URL, {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获取用户task GET /activiti/getHiTaskById */
export async function getHiTaskById(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getHiTaskByIdParams,
  options?: { [key: string]: any },
) {
  return request<API.Result>(ACTIVITI_URL.GETHITASKBYID_URL, {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
