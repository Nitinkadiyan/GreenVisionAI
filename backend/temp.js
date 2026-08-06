const jwt = require("jsonwebtoken");

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjZhNmM3ZGI4Njk5ZWU1OTIzNTc4ODU3MSIsInJvbGUiOiJVc2VyIiwiaWF0IjoxNzg1NDk1Mzg2LCJleHAiOjE3ODYxMDAxODZ9.ZdgQbzMpu0yScrwjVz5ZRKPZ0bs8OshfGhBflwRbnqM";

console.log(jwt.decode(token));
