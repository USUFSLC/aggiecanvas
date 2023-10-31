import type {
  OpenAPIClient,
  Parameters,
  UnknownParamsObject,
  OperationResponse,
  AxiosRequestConfig,
} from 'openapi-client-axios'; 

declare namespace Paths {
    namespace DeleteAggieauthByToken {
        namespace Parameters {
            export type Token = string;
        }
        export interface PathParameters {
            token: Parameters.Token;
        }
        namespace Responses {
            export interface $200 {
            }
        }
    }
    namespace DeleteToken {
        namespace Responses {
            export type $200 = boolean;
        }
    }
    namespace GetAuthaggie {
        namespace Parameters {
            export type AggieToken = string;
        }
        export interface QueryParameters {
            aggieToken: Parameters.AggieToken;
        }
        namespace Responses {
            export interface $200 {
            }
        }
    }
    namespace GetHealth {
        namespace Responses {
            export interface $200 {
            }
        }
    }
    namespace GetToken {
        namespace Responses {
            export interface $200 {
            }
        }
    }
    namespace GetTokenByApiToken {
        namespace Parameters {
            export type ApiToken = string;
        }
        export interface PathParameters {
            apiToken: Parameters.ApiToken;
        }
        namespace Responses {
            export type $200 = string;
        }
    }
    namespace PostAuthaggie {
        export interface RequestBody {
            anumber: string; // ^a[0-9]{8}$
        }
        namespace Responses {
            export type $200 = any;
        }
    }
    namespace PostToken {
        export interface RequestBody {
            anumber: string; // ^a[0-9]{8}$
        }
        namespace Responses {
            export type $200 = any;
        }
    }
    namespace PutToken {
        export interface RequestBody {
            callback: string; // ^(http|https):\/\/
            description: string;
            wants_production: boolean;
            token_expiration_sec: number;
        }
        namespace Responses {
            export interface $200 {
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
   * getAuthaggie
   */
  'getAuthaggie'(
    parameters?: Parameters<Paths.GetAuthaggie.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetAuthaggie.Responses.$200>
  /**
   * postAuthaggie
   */
  'postAuthaggie'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.PostAuthaggie.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.PostAuthaggie.Responses.$200>
  /**
   * deleteAggieauthByToken
   */
  'deleteAggieauthByToken'(
    parameters?: Parameters<Paths.DeleteAggieauthByToken.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.DeleteAggieauthByToken.Responses.$200>
  /**
   * getToken
   */
  'getToken'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetToken.Responses.$200>
  /**
   * putToken
   */
  'putToken'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.PutToken.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.PutToken.Responses.$200>
  /**
   * postToken
   */
  'postToken'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.PostToken.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.PostToken.Responses.$200>
  /**
   * deleteToken
   */
  'deleteToken'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.DeleteToken.Responses.$200>
  /**
   * getTokenByApiToken
   */
  'getTokenByApiToken'(
    parameters?: Parameters<Paths.GetTokenByApiToken.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetTokenByApiToken.Responses.$200>
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
  ['/authaggie']: {
    /**
     * getAuthaggie
     */
    'get'(
      parameters?: Parameters<Paths.GetAuthaggie.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetAuthaggie.Responses.$200>
    /**
     * postAuthaggie
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.PostAuthaggie.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.PostAuthaggie.Responses.$200>
  }
  ['/aggieauth/{token}']: {
    /**
     * deleteAggieauthByToken
     */
    'delete'(
      parameters?: Parameters<Paths.DeleteAggieauthByToken.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.DeleteAggieauthByToken.Responses.$200>
  }
  ['/token']: {
    /**
     * getToken
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetToken.Responses.$200>
    /**
     * postToken
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.PostToken.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.PostToken.Responses.$200>
    /**
     * putToken
     */
    'put'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.PutToken.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.PutToken.Responses.$200>
    /**
     * deleteToken
     */
    'delete'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.DeleteToken.Responses.$200>
  }
  ['/token/{apiToken}']: {
    /**
     * getTokenByApiToken
     */
    'get'(
      parameters?: Parameters<Paths.GetTokenByApiToken.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetTokenByApiToken.Responses.$200>
  }
}

export type Client = OpenAPIClient<OperationMethods, PathsDictionary>
