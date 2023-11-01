import type {
  OpenAPIClient,
  Parameters,
  UnknownParamsObject,
  OperationResponse,
  AxiosRequestConfig,
} from 'openapi-client-axios'; 

declare namespace Paths {
    namespace GetAuthAggieAuthCallback {
        namespace Parameters {
            export type Token = string;
        }
        export interface QueryParameters {
            token: Parameters.Token;
        }
        namespace Responses {
            export interface $200 {
                sessionId: string;
            }
        }
    }
    namespace GetAuthLogout {
        namespace Responses {
            export interface $200 {
                success: boolean;
            }
        }
    }
    namespace GetAuthMe {
        namespace Responses {
            export interface $200 {
                username?: string;
            }
        }
    }
    namespace GetGridById {
        namespace Parameters {
            export type Id = any;
            export type Last = string;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        export interface QueryParameters {
            last: Parameters.Last;
        }
        namespace Responses {
            export interface $200 {
                name: string;
                rows: number;
                columns: number;
                updates: any[];
            }
        }
    }
    namespace GetGridList {
        namespace Responses {
            export type $200 = any[];
        }
    }
    namespace GetGridSnapshotById {
        namespace Parameters {
            export type Id = any;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export interface $200 {
            }
        }
    }
    namespace PostAuthAggie {
        export interface RequestBody {
            anumber: string; // ^a[0-9]{8}$
        }
        namespace Responses {
            export interface $200 {
                success: boolean;
            }
        }
    }
    namespace PostGridByIdPixel {
        namespace Parameters {
            export type Id = any;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        export interface RequestBody {
            column: number;
            row: number;
            color: number;
        }
        namespace Responses {
            export interface $200 {
                success: boolean;
            }
        }
    }
    namespace PostGridNew {
        export interface RequestBody {
            name: string;
            columns: number;
            rows: number;
        }
        namespace Responses {
            export interface $200 {
                success: boolean;
            }
        }
    }
}

export interface OperationMethods {
  /**
   * postAuthAggie
   */
  'postAuthAggie'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.PostAuthAggie.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.PostAuthAggie.Responses.$200>
  /**
   * getAuthAggie_auth_callback
   */
  'getAuthAggie_auth_callback'(
    parameters?: Parameters<Paths.GetAuthAggieAuthCallback.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetAuthAggieAuthCallback.Responses.$200>
  /**
   * getAuthMe
   */
  'getAuthMe'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetAuthMe.Responses.$200>
  /**
   * getAuthLogout
   */
  'getAuthLogout'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetAuthLogout.Responses.$200>
  /**
   * getGridList
   */
  'getGridList'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetGridList.Responses.$200>
  /**
   * postGridByIdPixel
   */
  'postGridByIdPixel'(
    parameters?: Parameters<Paths.PostGridByIdPixel.PathParameters> | null,
    data?: Paths.PostGridByIdPixel.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.PostGridByIdPixel.Responses.$200>
  /**
   * postGridNew
   */
  'postGridNew'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.PostGridNew.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.PostGridNew.Responses.$200>
  /**
   * getGridSnapshotById
   */
  'getGridSnapshotById'(
    parameters?: Parameters<Paths.GetGridSnapshotById.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetGridSnapshotById.Responses.$200>
  /**
   * getGridById
   */
  'getGridById'(
    parameters?: Parameters<Paths.GetGridById.PathParameters & Paths.GetGridById.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetGridById.Responses.$200>
}

export interface PathsDictionary {
  ['/auth/aggie']: {
    /**
     * postAuthAggie
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.PostAuthAggie.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.PostAuthAggie.Responses.$200>
  }
  ['/auth/aggie_auth_callback']: {
    /**
     * getAuthAggie_auth_callback
     */
    'get'(
      parameters?: Parameters<Paths.GetAuthAggieAuthCallback.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetAuthAggieAuthCallback.Responses.$200>
  }
  ['/auth/me']: {
    /**
     * getAuthMe
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetAuthMe.Responses.$200>
  }
  ['/auth/logout']: {
    /**
     * getAuthLogout
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetAuthLogout.Responses.$200>
  }
  ['/grid/list']: {
    /**
     * getGridList
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetGridList.Responses.$200>
  }
  ['/grid/{id}/pixel']: {
    /**
     * postGridByIdPixel
     */
    'post'(
      parameters?: Parameters<Paths.PostGridByIdPixel.PathParameters> | null,
      data?: Paths.PostGridByIdPixel.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.PostGridByIdPixel.Responses.$200>
  }
  ['/grid/new']: {
    /**
     * postGridNew
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.PostGridNew.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.PostGridNew.Responses.$200>
  }
  ['/grid/snapshot/{id}']: {
    /**
     * getGridSnapshotById
     */
    'get'(
      parameters?: Parameters<Paths.GetGridSnapshotById.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetGridSnapshotById.Responses.$200>
  }
  ['/grid/{id}']: {
    /**
     * getGridById
     */
    'get'(
      parameters?: Parameters<Paths.GetGridById.PathParameters & Paths.GetGridById.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetGridById.Responses.$200>
  }
}

export type Client = OpenAPIClient<OperationMethods, PathsDictionary>
