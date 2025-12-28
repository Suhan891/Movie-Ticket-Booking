const jwt = require("jsonwebtoken")

// module.exports.createToken = ({userId, role, tokenVersion})=>{
//     const payload = {_id:userId, role, tokenVersion}

//     const token = jwt.sign(payload,
//         process.env.ACCESS_TOKEN_SECRET,
//         {expiresIn: "30m"}
//     )
//     return token
// }

module.exports.createEmailVerifyToken = (userId) => {
  return jwt.sign(
    { _id: userId, type: "email_verify" },
    process.env.EMAIL_VERIFY_SECRET,
    { expiresIn: "24h" }
  );
};

module.exports.verifyEmailVerifyToken = (token) => {
  return jwt.verify(token, process.env.EMAIL_VERIFY_SECRET);
};

module.exports.verifyAccessToken = (token) => {
  return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
};

module.exports.verifyRefreshToken = (token) => {
  return jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
};

module.exports.createAccessToken = ({_id,role,tokenVersion}) => {
  return jwt.sign(
    { _id,role,tokenVersion },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "15m" }
  );
};

module.exports.createRefresherToken = (userId, tokenVersion) => {
  return jwt.sign(
    { _id:userId, tokenVersion },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "7d" }
  );
};