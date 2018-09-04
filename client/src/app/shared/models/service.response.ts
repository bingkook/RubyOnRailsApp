//返回的错误
export interface BusinessError {
    errorCode: number,
    message: string,
}

//返回值
export interface BaseRespose{
    error: BusinessError
}

//成功的返回值
export class ApiRespose<T> implements BaseRespose {
    ok: boolean;
    data: T;
    error: BusinessError
}

//成功的返回值
export class SuccessRespose implements BaseRespose {
    ok: boolean;
    data: string;
    error: BusinessError
}