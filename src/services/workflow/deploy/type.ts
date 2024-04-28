declare namespace API {
  type ApplyDto = {
    procDefId?: string;
    paramMap?: Record<string, any>;
  };

  type CompleteTaskDto = {
    taskId?: string;
    operation?: string;
    paramMap?: Record<string, any>;
  };

  type completeTaskParams = {
    completeTaskDto: CompleteTaskDto;
  };

  type deployListParams = {
    current: number;
    pageSize: number;
    procDefName?: string;
  };

  type getCurTaskByIdParams = {
    userId: number;
  };

  type getHiTaskByIdParams = {
    userId: number;
  };

  type Result = {
    /** 业务状态码 */
    errorCode?: number;
    /** 响应状态 */
    success?: boolean;
    /** 响应消息 */
    errorMessage?: string;
    /** 响应类型 */
    showType?: string;
    /** 业务数据 */
    data?: Record<string, any>;
  };
}
