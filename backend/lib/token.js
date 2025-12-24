const jwt = require("jsonwebtoken")

const createToken = ({userId, role, tokenVersion})=>{
    const payload = {userId, role, tokenVersion}

    const token = jwt.sign(payload,
        process.env.JWT_SECRET,
        {expiresIn: "30m"}
    )

    return token
}

module.exports = createToken