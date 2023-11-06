# swagger_client.DefaultApi

All URIs are relative to */*

Method | HTTP request | Description
------------- | ------------- | -------------
[**delete_grid_by_id**](DefaultApi.md#delete_grid_by_id) | **DELETE** /grid/{id} | 
[**get_auth_aggie_auth_callback**](DefaultApi.md#get_auth_aggie_auth_callback) | **GET** /auth/aggie_auth_callback | 
[**get_auth_logout**](DefaultApi.md#get_auth_logout) | **GET** /auth/logout | 
[**get_auth_me**](DefaultApi.md#get_auth_me) | **GET** /auth/me | 
[**get_grid_by_id**](DefaultApi.md#get_grid_by_id) | **GET** /grid/{id} | 
[**get_grid_list**](DefaultApi.md#get_grid_list) | **GET** /grid/list | 
[**get_grid_snapshot_by_id**](DefaultApi.md#get_grid_snapshot_by_id) | **GET** /grid/snapshot/{id} | 
[**post_auth_aggie**](DefaultApi.md#post_auth_aggie) | **POST** /auth/aggie | 
[**post_grid**](DefaultApi.md#post_grid) | **POST** /grid/ | 
[**post_grid_by_id_pixel**](DefaultApi.md#post_grid_by_id_pixel) | **POST** /grid/{id}/pixel | 
[**put_grid_by_id**](DefaultApi.md#put_grid_by_id) | **PUT** /grid/{id} | 

# **delete_grid_by_id**
> InlineResponse200 delete_grid_by_id(id)



### Example
```python
from __future__ import print_function
import time
import swagger_client
from swagger_client.rest import ApiException
from pprint import pprint

# create an instance of the API class
api_instance = swagger_client.DefaultApi()
id = NULL # object | 

try:
    api_response = api_instance.delete_grid_by_id(id)
    pprint(api_response)
except ApiException as e:
    print("Exception when calling DefaultApi->delete_grid_by_id: %s\n" % e)
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | [**object**](.md)|  | 

### Return type

[**InlineResponse200**](InlineResponse200.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json, multipart/form-data, text/plain

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **get_auth_aggie_auth_callback**
> InlineResponse2001 get_auth_aggie_auth_callback(token)



### Example
```python
from __future__ import print_function
import time
import swagger_client
from swagger_client.rest import ApiException
from pprint import pprint

# create an instance of the API class
api_instance = swagger_client.DefaultApi()
token = 'token_example' # str | 

try:
    api_response = api_instance.get_auth_aggie_auth_callback(token)
    pprint(api_response)
except ApiException as e:
    print("Exception when calling DefaultApi->get_auth_aggie_auth_callback: %s\n" % e)
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **token** | **str**|  | 

### Return type

[**InlineResponse2001**](InlineResponse2001.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json, multipart/form-data, text/plain

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **get_auth_logout**
> InlineResponse200 get_auth_logout()



### Example
```python
from __future__ import print_function
import time
import swagger_client
from swagger_client.rest import ApiException
from pprint import pprint

# create an instance of the API class
api_instance = swagger_client.DefaultApi()

try:
    api_response = api_instance.get_auth_logout()
    pprint(api_response)
except ApiException as e:
    print("Exception when calling DefaultApi->get_auth_logout: %s\n" % e)
```

### Parameters
This endpoint does not need any parameter.

### Return type

[**InlineResponse200**](InlineResponse200.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json, multipart/form-data, text/plain

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **get_auth_me**
> InlineResponse2002 get_auth_me()



### Example
```python
from __future__ import print_function
import time
import swagger_client
from swagger_client.rest import ApiException
from pprint import pprint

# create an instance of the API class
api_instance = swagger_client.DefaultApi()

try:
    api_response = api_instance.get_auth_me()
    pprint(api_response)
except ApiException as e:
    print("Exception when calling DefaultApi->get_auth_me: %s\n" % e)
```

### Parameters
This endpoint does not need any parameter.

### Return type

[**InlineResponse2002**](InlineResponse2002.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json, multipart/form-data, text/plain

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **get_grid_by_id**
> InlineResponse2003 get_grid_by_id(id, last)



### Example
```python
from __future__ import print_function
import time
import swagger_client
from swagger_client.rest import ApiException
from pprint import pprint

# create an instance of the API class
api_instance = swagger_client.DefaultApi()
id = NULL # object | 
last = 'last_example' # str | 

try:
    api_response = api_instance.get_grid_by_id(id, last)
    pprint(api_response)
except ApiException as e:
    print("Exception when calling DefaultApi->get_grid_by_id: %s\n" % e)
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | [**object**](.md)|  | 
 **last** | **str**|  | 

### Return type

[**InlineResponse2003**](InlineResponse2003.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json, multipart/form-data, text/plain

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **get_grid_list**
> list get_grid_list()



### Example
```python
from __future__ import print_function
import time
import swagger_client
from swagger_client.rest import ApiException
from pprint import pprint

# create an instance of the API class
api_instance = swagger_client.DefaultApi()

try:
    api_response = api_instance.get_grid_list()
    pprint(api_response)
except ApiException as e:
    print("Exception when calling DefaultApi->get_grid_list: %s\n" % e)
```

### Parameters
This endpoint does not need any parameter.

### Return type

**list**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json, multipart/form-data, text/plain

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **get_grid_snapshot_by_id**
> get_grid_snapshot_by_id(id)



### Example
```python
from __future__ import print_function
import time
import swagger_client
from swagger_client.rest import ApiException
from pprint import pprint

# create an instance of the API class
api_instance = swagger_client.DefaultApi()
id = NULL # object | 

try:
    api_instance.get_grid_snapshot_by_id(id)
except ApiException as e:
    print("Exception when calling DefaultApi->get_grid_snapshot_by_id: %s\n" % e)
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | [**object**](.md)|  | 

### Return type

void (empty response body)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: Not defined

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **post_auth_aggie**
> InlineResponse200 post_auth_aggie(body=body)



### Example
```python
from __future__ import print_function
import time
import swagger_client
from swagger_client.rest import ApiException
from pprint import pprint

# create an instance of the API class
api_instance = swagger_client.DefaultApi()
body = swagger_client.AuthAggieBody() # AuthAggieBody |  (optional)

try:
    api_response = api_instance.post_auth_aggie(body=body)
    pprint(api_response)
except ApiException as e:
    print("Exception when calling DefaultApi->post_auth_aggie: %s\n" % e)
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **body** | [**AuthAggieBody**](AuthAggieBody.md)|  | [optional] 

### Return type

[**InlineResponse200**](InlineResponse200.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json, multipart/form-data, text/plain
 - **Accept**: application/json, multipart/form-data, text/plain

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **post_grid**
> InlineResponse200 post_grid(body=body)



### Example
```python
from __future__ import print_function
import time
import swagger_client
from swagger_client.rest import ApiException
from pprint import pprint

# create an instance of the API class
api_instance = swagger_client.DefaultApi()
body = swagger_client.GridBody() # GridBody |  (optional)

try:
    api_response = api_instance.post_grid(body=body)
    pprint(api_response)
except ApiException as e:
    print("Exception when calling DefaultApi->post_grid: %s\n" % e)
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **body** | [**GridBody**](GridBody.md)|  | [optional] 

### Return type

[**InlineResponse200**](InlineResponse200.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json, multipart/form-data, text/plain
 - **Accept**: application/json, multipart/form-data, text/plain

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **post_grid_by_id_pixel**
> InlineResponse200 post_grid_by_id_pixel(id, body=body)



### Example
```python
from __future__ import print_function
import time
import swagger_client
from swagger_client.rest import ApiException
from pprint import pprint

# create an instance of the API class
api_instance = swagger_client.DefaultApi()
id = NULL # object | 
body = swagger_client.IdPixelBody() # IdPixelBody |  (optional)

try:
    api_response = api_instance.post_grid_by_id_pixel(id, body=body)
    pprint(api_response)
except ApiException as e:
    print("Exception when calling DefaultApi->post_grid_by_id_pixel: %s\n" % e)
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | [**object**](.md)|  | 
 **body** | [**IdPixelBody**](IdPixelBody.md)|  | [optional] 

### Return type

[**InlineResponse200**](InlineResponse200.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json, multipart/form-data, text/plain
 - **Accept**: application/json, multipart/form-data, text/plain

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **put_grid_by_id**
> InlineResponse200 put_grid_by_id(id, body=body)



### Example
```python
from __future__ import print_function
import time
import swagger_client
from swagger_client.rest import ApiException
from pprint import pprint

# create an instance of the API class
api_instance = swagger_client.DefaultApi()
id = NULL # object | 
body = swagger_client.GridIdBody() # GridIdBody |  (optional)

try:
    api_response = api_instance.put_grid_by_id(id, body=body)
    pprint(api_response)
except ApiException as e:
    print("Exception when calling DefaultApi->put_grid_by_id: %s\n" % e)
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | [**object**](.md)|  | 
 **body** | [**GridIdBody**](GridIdBody.md)|  | [optional] 

### Return type

[**InlineResponse200**](InlineResponse200.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json, multipart/form-data, text/plain
 - **Accept**: application/json, multipart/form-data, text/plain

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

