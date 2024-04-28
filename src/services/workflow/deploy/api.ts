// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';


/** 开启一个流程 POST /activiti/apply */
export async function apply(body: API.ApplyDto, options?: { [key: string]: any }) {
  return request<API.Result>("/api/activiti/apply", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 完成任务 GET /activiti/completeTask */
export async function completeTask(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.completeTaskParams,
  options?: { [key: string]: any },
) {
  return request<API.Result>('/api/activiti/completeTask', {
    method: 'GET',
    params: {
      ...params,
      completeTaskDto: undefined,
      ...params['completeTaskDto'],
    },
    ...(options || {}),
  });
}

/** 部署 POST /activiti/deploy */
export async function deploy(body: {}, options?: { [key: string]: any }) {
  return request<API.Result>('/api/activiti/deploy', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 流程定义信息 GET /activiti/deployList */
export async function deployList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deployListParams,
  options?: { [key: string]: any },
) {
  return request<API.Result>('/api/activiti/deployList', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获取用户待处理task GET /activiti/getCurTaskById */
export async function getCurTaskById(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getCurTaskByIdParams,
  options?: { [key: string]: any },
) {
  return request<API.Result>('/api/activiti/getCurTaskById', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获取用户历史task GET /activiti/getHiTaskById */
export async function getHiTaskById(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getHiTaskByIdParams,
  options?: { [key: string]: any },
) {
  return request<API.Result>('/api/activiti/getHiTaskById', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}