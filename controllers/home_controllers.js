

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
    
const Post = require('../models/post')
const User = require('../models/user')



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



    return res.render('home', {
      title: 'Home page!!!',
      allposts: posts,

    });



  } catch (err) {
    // Handle error
    console.error(err);
  }
};
