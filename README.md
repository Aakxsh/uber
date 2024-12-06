# User Registration API

## Endpoint: `/users/register`

### Description
This endpoint is used to register a new user. It validates the input data, checks if the email already exists, hashes the password, creates a new user, and returns an authentication token along with user details.

### HTTP Method
`POST`

### Request Body
The request body should be a JSON object with the following fields:

- `fullName`: An object containing:
  - `firstName`: A string with a minimum length of 3 characters.
  - `lastName`: A string with a minimum length of 4 characters.
- `email`: A valid email address.
- `password`: A strong password with a minimum length of 8 characters.

### Example Response:
- `user` (object):
- `fullName`: (object)
  - `firstName`: A string with a minimum length of 3 characters.
  - `lastName`: A string with a minimum length of 4 characters.
- `email`: A valid email address.
- `password`: A strong password with a minimum length of 8 characters.
- `token` (String): JWT Token


# User API Documentation

## Endpoint: `/users/register`

### Description
This endpoint is used to register a new user. It validates the input data, checks if the email already exists, hashes the password, creates a new user, and returns an authentication token along with user details.

### Method
`POST`

### Request Body
The request body should be a JSON object with the following fields:

- `fullName`: An object containing:
  - `firstName`: A string with a minimum length of 3 characters.
  - `lastName`: A string with a minimum length of 4 characters.
- `email`: A valid email address.
- `password`: A strong password with a minimum length of 8 characters.

Example:
```json
{
  "fullName": {
    "firstName": "John",
    "lastName": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "StrongPassword123!"
}
```

### Example Response:
- `user` (object):
- `fullName`: (object)
  - `firstName`: A string with a minimum length of 3 characters.
  - `lastName`: A string with a minimum length of 4 characters.
- `email`: A valid email address.
- `password`: A strong password with a minimum length of 8 characters.
- `token` (String): JWT Token



## Endpoint: `/captain/register`

### Description
This endpoint is used to register a new captain. It validates the input data, checks if the email already exists, hashes the password, creates a new captain, and returns an authentication token along with captain details.

### Method
`POST`

### Request Body
The request body should be a JSON object with the following fields:

- `fullName`: An object containing:
  - `firstName`: A string with a minimum length of 3 characters.
  - `lastName`: A string with a minimum length of 4 characters.
- `email`: A valid email address.
- `password`: A strong password with a minimum length of 8 characters.
- `phoneNumber`: A string with exactly 10 digits.
- `captain`: An object containing:
  - `license`: A string with a minimum length of 10 characters.
- `vehicle`: An object containing:
  - `vehicleType`: A string, one of ['Bike', 'Car', 'Autorickshaw', 'ElectricBike'].
  - `color`: A string with a minimum length of 3 characters.
  - `capacity`: An integer with a minimum value of 1.
  - `plate`: A string with a minimum length of 3 characters.
- `locations`: An object containing:
  - `lat`: A float representing the latitude.
  - `long`: A float representing the longitude.
