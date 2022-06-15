const jwt = require('jsonwebtoken');

const SECRET_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlcyI6WyJ1c2VyIl0sImlhdCI6MTY1NTI0M'

const nossoToken = jwt.sign(
    {
        name: 'Mario',
    },
    SECRET_KEY,
    {
        expiresIn: '1y',
        subject: '1'
    }
);

console.log(nossoToken)

const TOKEN_GERADO = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiTWFyaW8iLCJpYXQiOjE2NTUyOTg3MDUsImV4cCI6MTY4Njg1NjMwNSwic3ViIjoiMSJ9.P5ZbDs2Kov2JNMmbN595wna622dQgDJ363-f-z33m4g'

// console.log(jwt.verify(TOKEN_GERADO, SECRET_KEY));
console.log(jwt.decode(nossoToken))