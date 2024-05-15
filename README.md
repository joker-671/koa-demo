- 一个简单的koajs服务

### 用户登录接口

- **URL**: `/api/user/login`
- **Method**: POST
- **Request Body**:
  ```typescript
  interface LoginRequestParams {
    phone: string;
    password: string;
  }
  ```
- **Response**:
  ```typescript
  interface LoginResponseParams {
    id: number;
    phone: string;
    nickname: string;
    avatar: string;
    description: string;
  }
  ```
- **Description**: 用户登录接口，验证用户手机号和密码，返回登录成功的用户信息。

### 用户注册接口

- **URL**: `/api/user/regist`
- **Method**: POST
- **Request Body**:
  ```typescript
  interface RegisterRequestParams {
    phone: string;
    password: string;
  }
  ```
- **Description**: 用户注册接口，注册新用户并保存到数据库中。

### 用户信息编辑接口

- **URL**: `/api/user/edit`
- **Method**: POST
- **Request Body**:
  ```typescript
  interface UserEditRequestParams {
    phone?: string;
    nickname?: string;
    avatar?: string;
    description?: string;
  }
  ```
- **Description**: 用户信息编辑接口，根据用户的登录凭证修改用户信息.


### 文件上传接口

- **URL**: `/api/files/upload`
- **Method**: POST
- **Request Body**:

### 文件列表

- **URL**: `/api/files/get`
- **Method**: POST
- **Request Body**: