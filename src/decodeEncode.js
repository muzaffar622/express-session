const jwt = require("jsonwebtoken");

export const decodeToken = async token => jwt.decode(token);

export const encodeToken = async (token, secret) => jwt.sign(token, secret);
