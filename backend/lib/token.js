const jwt = require("jsonwebtoken")

module.exports.createToken = ({userId, role, tokenVersion})=>{
    const payload = {userId, role, tokenVersion}

    const token = jwt.sign(payload,
        process.env.JWT_SECRET,
        {expiresIn: "30m"}
    )
    return token
}


module.exports.verifyAccessToken = (token) => {
  return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
};

module.exports.verifyRefreshToken = (token) => {
  return jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
};

module.exports.createAccessToken = (userId) => {
  return jwt.sign(
    { userId },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "15m" }
  );
};

module.exports.createRefresherToken = (userId, tokenVersion) => {
  return jwt.sign(
    { userId, tokenVersion },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "7d" }
  );
};