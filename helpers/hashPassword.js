const bcrypt = require('bcryptjs')
const salt = bcrypt.genSaltSync(10)
function hashPassword(password){
    return bcript.hashSync(password,salt)
}
module.exports = hashPassword