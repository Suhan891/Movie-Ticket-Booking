const bcrypt = require("bcrypt")

module.exports.hashPassword = async ({password})=>{
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password,salt)
    return hash
}

module.exports.verifyPassword = ({pass,existPass})=>{
    return bcrypt.compare(pass,existPass)
}
