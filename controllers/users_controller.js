module.exports.profile = function (req, res){
   /* res.end('<h1>user profile</h1>');*/
   return res.render('users_profile',{
    title:"user profile"
   });
}