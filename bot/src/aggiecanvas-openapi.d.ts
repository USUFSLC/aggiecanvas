import type {
  OpenAPIClient,
  Parameters,
  UnknownParamsObject,
  OperationResponse,
  AxiosRequestConfig,
} from 'openapi-client-axios'; 

declare namespace Paths {
    namespace DeleteGridById {
        namespace Parameters {
            export type Id = any;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export interface $200 {
                success: boolean;
            }
        }
    }
    namespace GetAuthAggieAuthCallback {
        namespace Parameters {
            export type Redirect = string;
            export type Token = string;
        }
        export interface QueryParameters {
            token: Parameters.Token;
            redirect: Parameters.Redirect;
        }
        namespace Responses {
            export interface $200 {
                id: string;
                user_id: number;
                expires: string; // date-time
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
                grid: {
                    id: number;
                    rows: number;
                    columns: number;
                    name: string;
                    latest_snapshot?: {
                        id: number;
                        grid_id: number;
                        rows: number;
                        columns: number;
                        snapshot_location: string;
                        created_at: string; // date-time
                    };
                };
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
    namespace GetHealth {
        namespace Responses {
            export type $200 = string;
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
    namespace PostGrid {
        export interface RequestBody {
            name: string;
            columns: number;
            rows: number;
        }
        namespace Responses {
            export interface $200 {
                id: number;
                rows: number;
                columns: number;
                name: string;
                latest_snapshot?: {
                    id: number;
                    grid_id: number;
                    rows: number;
                    columns: number;
                    snapshot_location: string;
                    created_at: string; // date-time
                };
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
    namespace PutGridById {
        namespace Parameters {
            export type Id = any;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        export interface RequestBody {
            name: string;
            columns: number;
            rows: number;
        }
        namespace Responses {
            export interface $200 {
                id: number;
                rows: number;
                columns: number;
                name: string;
                latest_snapshot?: {
                    id: number;
                    grid_id: number;
                    rows: number;
                    columns: number;
                    snapshot_location: string;
                    created_at: string; // date-time
                };
            }
        }
    }
}

export interface OperationMethods {
  /**
   * getHealth
   */
  'getHealth'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetHealth.Responses.$200>
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
  /**
   * putGridById
   */
  'putGridById'(
    parameters?: Parameters<Paths.PutGridById.PathParameters> | null,
    data?: Paths.PutGridById.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.PutGridById.Responses.$200>
  /**
   * deleteGridById
   */
  'deleteGridById'(
    parameters?: Parameters<Paths.DeleteGridById.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.DeleteGridById.Responses.$200>
  /**
   * postGrid
   */
  'postGrid'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.PostGrid.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.PostGrid.Responses.$200>
  /**
   * postGridByIdPixel
   */
  'postGridByIdPixel'(
    parameters?: Parameters<Paths.PostGridByIdPixel.PathParameters> | null,
    data?: Paths.PostGridByIdPixel.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.PostGridByIdPixel.Responses.$200>
}

export interface PathsDictionary {
  ['/health']: {
    /**
     * getHealth
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetHealth.Responses.$200>
  }
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
    /**
     * putGridById
     */
    'put'(
      parameters?: Parameters<Paths.PutGridById.PathParameters> | null,
      data?: Paths.PutGridById.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.PutGridById.Responses.$200>
    /**
     * deleteGridById
     */
    'delete'(
      parameters?: Parameters<Paths.DeleteGridById.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.DeleteGridById.Responses.$200>
  }
  ['/grid/']: {
    /**
     * postGrid
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.PostGrid.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.PostGrid.Responses.$200>
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
}

export type Client = OpenAPIClient<OperationMethods, PathsDictionary>
