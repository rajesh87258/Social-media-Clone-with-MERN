// const mongoose = require('mongoose');
// const userSchema = new mongoose.Schema({
//     email:{
//         type: String,
//         required: true,
//         unique:true
//     },
//     password:{
//         type:String,
//         required:true
//     },
//     name:{
//         type:String,
//         required:true
//     }
// },{
//     timestamps:true
// });
// const user = mongoose.model('user', userSchema);
// module.exports = user;
const mongoose = require('mongoose');
const { Schema } = mongoose;

const multer = require('multer');
const path = require('path');
const AVATAR_PATH = path.join('/uploads/users/avatars')

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true // email should be unique for different users
    },
    password: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    avatar: {
      type: String
    }
  },
  {
    timestamps: true // it provides timestamps for creation and update
  }
);

let storage = multer.diskStorage({
  destination: function(req, file, cb){
    cb(null, path.join(__dirname, '..', AVATAR_PATH));
  },
  filename: function(req, file, cb){
    cb(null, file.fieldname + '_' + Date.now());
  }

});

//STATIC METHODS
userSchema.statics.uploadedAvatar = multer({storage: storage}).single('avatar');
userSchema.statics.avatarPath = AVATAR_PATH;

const User = mongoose.model('User', userSchema);

module.exports = User;