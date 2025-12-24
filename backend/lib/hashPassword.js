const bcrypt = require("bcrypt")
const hashPassword = ({password})=>{
    const salt = bcrypt.genSalt(10)
    const hash = bcrypt.hash(password,salt)
}

module.exports = hashPassword