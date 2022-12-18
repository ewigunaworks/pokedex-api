# CONTRACT API SPEC

## AUTH
#####  POST /api/auth/register
Create new user and return new object.
* URL Params
    None
* Headers
    Content-Type: application/json
* Body
    ```
    {
      "firstname": "User",
      "lastname": "User",
      "username": "uuser@yopmail.com",
      "password": "password",
      "userRole": "user"
    }
    ```
    userRole must fill with user or admin
* Success Response
    * Code 200
        Content: 
        ```
        {
          status: 200,
          message: 'Register user success',
          data: {
              "user": { <user object> }
          }
        }
        ```
* Error Response
    * Code 500
        Content:
        ```
        {
            status: 500,
            message: 'Register user failed, ' + err,
            data: {}
         }
        ```
#####  POST /api/auth/login
Authenticate user and return new object.
* URL Params
    None
* Headers
    Content-Type: application/json
* Body
    ```
    {
      "username": "eadmin@yopmail.com",
      "password": "password"
    }
    ```
* Success Response
    * Code 200
        Content: 
        ```
        {
          status: 200,
          message: 'Register user success',
          data: {
              "user": { <user object> },
              "token": <JWT token>
          }
        }
        ```
* Error Response
    * Code 404
        Content:
        ```
        {
          status: 404,
          message: 'User not found',
          data: null
        }
        ```
    * Code 500
        Content:
        ```
        {
            status: 500,
            message: 'Invalid username/password'
            data: {}
         }
        ```
    * Code 401
        Content:
        ```
        {
            status: 401,
            message: 'User unauthorize',
            data: null
          }
         ```
         
## USER
#####  GET /api/user
Return all user
* URL Params
    None
* Headers
    Content-Type: application/json
    Authorization: Bearer <JWT Token>
* Body
    None
* Success Response
    * Code 200
        Content: 
        ```
        {
          status: 200,
          message: 'Find Users success',
          data: [
            { <user object> },
            { <user object> }
          ]
        }
        ```
* Error Response
    * Code 404
        Content:
        ```
        {
          status: 404,
          message: 'Users not found',
          data: null
        }
        ```
    * Code 500
        Content:
        ```
        {
            status: 500,
            message: 'Find Users failed'
            data: {}
         }
        ```
    * Code 401
        Content:
        ```
        {
            status: 401,
            message: 'User unauthorize',
            data: null
          }
         ```
#####  GET /api/user/:userId
Return specific user
* URL Params
    userId = Integer
* Headers
    Content-Type: application/json
    Authorization: Bearer <JWT Token>
* Body
    None
* Success Response
    * Code 200
        Content: 
        ```
        {
          status: 200,
          message: 'Find User by ID success',
          data: 
            { <user object> }
        }
        ```
* Error Response
    * Code 404
        Content:
        ```
        {
          status: 404,
          message: 'User by ID not found',
          data: null
        }
        ```
    * Code 500
        Content:
        ```
        {
            status: 500,
            message: 'Find User by ID failed'
            data: {}
         }
        ```
    * Code 401
        Content:
        ```
        {
            status: 401,
            message: 'User unauthorize',
            data: null
          }
         ```
#####  PUT /api/user/:userId
Updates fields on the specified user and returns the updated object.
* URL Params
    userId = Integer
* Headers
    Content-Type: application/json
    Authorization: Bearer <JWT Token>
* Body
    ```
    {
      "firstname": "user",
      "lastname": "user",
      "username": "uname@yopmail.com",
      "password": "password"
    }
    ```
* Success Response
    * Code 200
        Content: 
        ```
        {
          status: 200,
          message: 'Update User success',
          data: 
            { <user object> }
        }
        ```
* Error Response
    * Code 500
        Content:
        ```
        {
            status: 500,
            message: 'Update User role failed'
            data: {}
         }
        ```
    * Code 401
        Content:
        ```
        {
            status: 401,
            message: 'User unauthorize',
            data: null
          }
         ```
#####  DELETE /api/user/:userId
Delete on the specified user.
* URL Params
    userId = Integer
* Headers
    Content-Type: application/json
    Authorization: Bearer <JWT Token>
* Body
    None
* Success Response
    * Code 200
        Content: 
        ```
        {
          status: 200,
          message: 'Delete User success',
          data: {}
        }
        ```
* Error Response
    * Code 500
        Content:
        ```
        {
            status: 500,
            message: 'Delete User failed'
            data: {}
         }
        ```
    * Code 401
        Content:
        ```
        {
            status: 401,
            message: 'User unauthorize',
            data: null
          }
         ```

## USER ROLE
#####  GET /api/user-role
Return all user role
* URL Params
    None
* Headers
    Content-Type: application/json
    Authorization: Bearer <JWT Token>
* Body
    None
* Success Response
    * Code 200
        Content: 
        ```
        {
          status: 200,
          message: 'Find User roles success',
          data: [
            { <user-role object> },
            { <user-role object> }
          ]
        }
        ```
* Error Response
    * Code 404
        Content:
        ```
        {
          status: 404,
          message: 'User roles not found',
          data: null
        }
        ```
    * Code 500
        Content:
        ```
        {
            status: 500,
            message: 'Find User roles failed'
            data: {}
         }
        ```
#####  GET /api/user-role/:userRoleId
Return specific user role
* URL Params
    userRoleId = Integer
* Headers
    Content-Type: application/json
    Authorization: Bearer <JWT Token>
* Body
    None
* Success Response
    * Code 200
        Content: 
        ```
        {
          status: 200,
          message: 'Find User role by ID success',
          data: 
            { <user-role object> }
        }
        ```
* Error Response
    * Code 404
        Content:
        ```
        {
          status: 404,
          message: 'User role by ID not found',
          data: null
        }
        ```
    * Code 500
        Content:
        ```
        {
            status: 500,
            message: 'Find User role by ID failed'
            data: {}
         }
        ```
#####  POST /api/user-role
Creates a new User Role and returns the new object.
* URL Params
    None
* Headers
    Content-Type: application/json
    Authorization: Bearer <JWT Token>
* Body
    ```
    {
      "name": "admin"
    }
    ```
* Success Response
    * Code 200
        Content: 
        ```
        {
          status: 200,
          message: 'Create User role success',
          data: 
            { <user-role object> }
        }
        ```
* Error Response
    * Code 500
        Content:
        ```
        {
            status: 500,
            message: 'Create User role failed'
            data: {}
         }
        ```
#####  PUT /api/user-role/:userRoleId
Updates fields on the specified user role and returns the updated object.
* URL Params
    None
* Headers
    Content-Type: application/json
    Authorization: Bearer <JWT Token>
* Body
    ```
    {
      "name": "admin"
    }
    ```
* Success Response
    * Code 200
        Content: 
        ```
        {
          status: 200,
          message: 'Update User role success',
          data: 
            { <user-role object> }
        }
        ```
* Error Response
    * Code 500
        Content:
        ```
        {
            status: 500,
            message: 'Update User role failed'
            data: {}
         }
        ```
#####  DELETE /api/user-role/:userRoleId
Delete on the specified user role.
* URL Params
    None
* Headers
    Content-Type: application/json
    Authorization: Bearer <JWT Token>
* Body
    None
* Success Response
    * Code 200
        Content: 
        ```
        {
          status: 200,
          message: 'Delete User role success',
          data: {}
        }
        ```
* Error Response
    * Code 500
        Content:
        ```
        {
            status: 500,
            message: 'Delete User role failed'
            data: {}
         }
        ```
        
## MONSTER
#####  GET /api/monster
Return all monster
* URL Params
    None
* Headers
    Content-Type: application/json
    Authorization: Bearer <JWT Token>, *Note: if login as user, need JWT token*
* Body
    None
* Success Response
    * Code 200
        Content: 
        ```
        {
          status: 200,
          message: 'Find monster success',
          data: {
              result: [
                <monster object>,
                <monster object>,
              ],
              page: <page>,
              limit: <limit>,
              totalRows: <totalRows>,
              totalPage: <totalPage>
            }
        }
        ```
* Error Response
    * Code 500
        Content:
        ```
        {
            status: 500,
            message: 'Find monsters failed'
            data: {}
         }
        ```
    * Code 401
        Content:
        ```
        {
            status: 401,
            message: 'User unauthorize',
            data: null
          }
         ```
#####  GET /api/monster/:monsterId
Return specific monster
* URL Params
    monsterId = Integer
* Headers
    Content-Type: application/json
    Authorization: Bearer <JWT Token>, *Note: if login as user, need JWT token*
* Body
    None
* Success Response
    * Code 200
        Content: 
        ```
        {
          status: 200,
          message: 'Find User by ID success',
          data: 
            { <monster object> }
        }
        ```
* Error Response
    * Code 404
        Content:
        ```
        {
          status: 404,
          message: 'Monster not found',
          data: null
        }
        ```
    * Code 500
        Content:
        ```
        {
            status: 500,
            message: 'Find monster failed'
            data: {}
         }
        ```
    * Code 401
        Content:
        ```
        {
            status: 401,
            message: 'User unauthorize',
            data: null
          }
         ```
#####  POST /api/monster
Create new monster and return new object.
* URL Params
    None
* Headers
    Content-Type: application/json
    Authorization: Bearer <JWT Token>, *Note: if login must as admin, need JWT token*
* Body
    ```
    {
      "name": "Chikorita",
      "type1": "GRASS",
      "type2": "",
      "description": "chikoritatata",
      "height": 25,
      "weight": 50,
      "stats": {
        "hp": 65,
        "attack": 70,
        "def": 50,
        "speed": 80
      },
      "category": "leaf monster",
      "image": "http://url-image"
    }
    ```
* Success Response
    * Code 200
        Content: 
        ```
        {
          status: 200,
          message: 'Create monster success',
          data: {
              "user": { <user object> }
          }
        }
        ```
* Error Response
    * Code 500
        Content:
        ```
        {
            status: 500,
            message: 'Create monster failed, ',
            data: {}
         }
        ```
    * Code 401
        Content:
        ```
        {
            status: 401,
            message: 'User unauthorize',
            data: null
          }
         ```
#####  PUT /api/monster/:monsterId
Updates fields on the specified monster and returns the updated object.
* URL Params
    monsterId = Integer
* Headers
    Content-Type: application/json
    Authorization: Bearer <JWT Token>, *Note: if login must as admin, need JWT token*
* Body
    ```
    {
      "name": "Chikorita",
      "type1": "GRASS",
      "type2": "",
      "description": "chikoritatata",
      "height": 25,
      "weight": 50,
      "stats": {
        "hp": 65,
        "attack": 70,
        "def": 50,
        "speed": 80
      },
      "category": "leaf monster",
      "image": "http://url-image"
    }
    ```
* Success Response
    * Code 200
        Content: 
        ```
        {
          status: 200,
          message: 'Update Monster success',
          data: 
            { <user object> }
        }
        ```
* Error Response
    * Code 500
        Content:
        ```
        {
            status: 500,
            message: 'Update Monster failed'
            data: {}
         }
        ```
    * Code 401
        Content:
        ```
        {
            status: 401,
            message: 'User unauthorize',
            data: null
          }
         ```
#####  DELETE /api/monster/:monsterId
Delete on the specified monster.
* URL Params
    monsterId = Integer
* Headers
    Content-Type: application/json
    Authorization: Bearer <JWT Token>, *Note: if login must as admin, need JWT token*
* Body
    None
* Success Response
    * Code 200
        Content: 
        ```
        {
          status: 200,
          message: 'Delete Monster success',
          data: {}
        }
        ```
* Error Response
    * Code 500
        Content:
        ```
        {
            status: 500,
            message: 'Delete Monster failed'
            data: {}
         }
        ```
    * Code 401
        Content:
        ```
        {
            status: 401,
            message: 'User unauthorize',
            data: null
          }
         ```

## USER MONSTER
#####  POST /api/user-monster
Catch and uncatch monster by user and return new object.
* URL Params
    None
* Headers
    Content-Type: application/json
    Authorization: Bearer <JWT Token>
* Body
    ```
    {
      "monsterId": <monster ID>
    }
    ```
* Success Response
    * Code 200
        Content: 
        ```
        {
          status: 200,
          message: 'Catch monster success',
          data: {
            <user-monster object>
          }
        }
        ```
        ```
        {
          status: 200,
          message: 'Release monster success',
          data: {}
        }
        ```
        
* Error Response
    * Code 500
        Content:
        ```
        {
            status: 500,
            message: 'Update catching monster failed, '
            data: {}
         }
        ```
