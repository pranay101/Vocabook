const mongoose =  require('mongoose');

const userSchema = mongoose.Schema(
{
    _id : mongoose.Schema.Types.ObjectId,
    name: {type: String, require: true},
    email: {
        type: String,
        require: true, 
        sparse: true, 
        trim: true,
    },
    username: {type: String,require: true , sparse: true, trim: true},
    hash: {type: String, require: true},
    
})

module.exports = mongoose.model('user', userSchema);