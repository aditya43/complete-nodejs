// In Postman, For 'Create User' and 'Login User', go to 'Tests' tab. Paste following code to automatically set JWT Token into environment variable:

if (pm.response.code === 200) { // '201' For 'Create User' request.
    pm.environment.set('JWT_TOKEN', pm.response.json().jwtToken);
}
