/**
 * Created by Elias on 2014/07/29.
 */
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var userSchema = mongoose.Schema({
   local:{
       usuario:String,
       password:String
   }
});

userSchema.methods.generateHash=function(password){
    return bcrypt.hashSync(password,bcrypt.genSaltSync(8),null);
};
userSchema.methods.validPassword = function(password){
    return bcrypt.compareSync(password,this.local.password);
};
module.exports = mongoose.model('usuarios',userSchema);