const {Schema, model} = require('mongoose')


const User = new Schema({
    email: {type: String},
    username: {type: String},
    phone: {type: String}, 
    id: {type: String},
    faculty: {type: String},
    birthday: {type: String},
    password: {type: String},
    roles: [{type: Schema.Types.ObjectId, ref: 'Role'}]
})

module.exports = model('User', User)
