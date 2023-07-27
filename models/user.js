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
    }
  },
  {
    timestamps: true // it provides timestamps for creation and update
  }
);

const User = mongoose.model('User', userSchema);

module.exports = User;