

// module.exports.home = function(req, res){
//     // return res.end('<h1>Express is up for Codieal ! <h1>')
//     console.log(req.cookies);
//     res.cookie('user_id',25);
//     return res.render('home',{
//         title:"Home"
//     });

// }
/*module.exports.actionName = function (req,res){}*/

// module.exports.home = async function  (req, res) {
//   //POPULATE THE USER OF EACH POST
//   try{

//    const posts = Post.find({}).exec();
//   return res.render('home',{
//     title:"Codeial | Home",
//     posts: posts}
//   )}

//   catch (err){
    // console.log(err);
       
//     }
    
//   }
    
const Post = require('../models/post');
const User = require('../models/user');


 /*
module.exports.home = async function (req, res) {
  try {
    const posts = await Post.find({}).populate('user')

    .populate({
      path:'comments',
      populate:{
        path:'user'
      }
    })
      


      .exec();
      User.find({}, function(err, users){

        return res.render('home', {
          title: 'Home page!!!',
          allposts: posts,
          all_users : users

      });



   

    });



  } catch (err) {
    // Handle error
    console.error(err);
  }
};
*/


module.exports.home = async function (req, res) {
    try {
        const postsPromise = Post.find({}).populate('user').populate({
            path: 'comments',
            populate: {
                path: 'user'
            }
        }).exec();

        const usersPromise = User.find({}).exec();

        const [posts, users] = await Promise.all([postsPromise, usersPromise]);

        return res.render('home', {
            title: 'Home page!!!',
            allposts: posts,
            all_users: users
        });

    } catch (err) {
        // Handle error
        console.error(err);
    }
};
