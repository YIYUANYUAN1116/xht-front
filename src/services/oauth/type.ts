declare namespace API {
  type UserInfo = {
    username?: string;
    avatar?: string;
    userid?: string;
    email?: string;
    signature?: string;
    title?: string;
    group?: string;
    tags?: { key?: string; label?: string }[];
    notifyCount?: number;
    unreadCount?: number;
    country?: string;
    access?: string;
    geographic?: {
      province?: { label?: string; key?: string };
      city?: { label?: string; key?: string };
    };
    address?: string;
    phone?: string;
  };
  
  

  
  //定义全部接口返回数据都拥有ts类型
  interface ResponseData {
    errorCode: number;
    errorMessage: string;
    success: boolean;
  }

  interface UserInfoResponseData extends ResponseData{
    data: UserInfo;
  }


  //定义登录接口返回数据类型
  interface LoginResponseData extends ResponseData {
    data: string;
  }
    
}




