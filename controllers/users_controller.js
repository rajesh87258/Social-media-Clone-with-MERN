const User = require('../models/user');

/*module.exports.profile = function (req, res){
   /* res.end('<h1>user profile</h1>');

 if (req.cookies.user_id){
   User.findById(req.cookies.user_id, function(err, user){
      if (user){
         return res.render('user_profile', {
            title: "User Profile",
            user: user
         })
      }else{
         return res.redirect('/users/sign-in');
      }
   });
 }
 else{
   return res.redirect('users/sign-in');
 }
}*/
/*
module.exports.profile = function (req, res){
   User.findById(req.params.id, function(err, user){
      return res.render('users_profile', {
         title: 'User Profile',
         profile_user:user

   });
   
   });
}*/



module.exports.profile = async function(req, res) {
  try {
    const user = await User.findById(req.params.id);
    return res.render('users_profile', {
      title: 'User Profile',
      profile_user: user
    });
  } catch (err) {
    console.error(err); // Handle any errors that might occur during the database query
    return res.status(500).send('Internal Server Error'); // Return an appropriate error response
  }
};


//FOR UPDATE IN CURRENT USER
/*module.exports.update = function(req, res){
   if(req.user.id == req.params.id){
      User.findByIdAndUpdate(req.params.id, req.body, function(err,user){
         return res.redirect('back');
      });

   }else{
      return res.status(401).send('Unauthorized');
   }
}
*/
// module.exports.update = async function (req, res) {
//    try {
//      if (req.user.id == req.params.id) {
//        await User.findByIdAndUpdate(req.params.id, req.body);
//        return res.redirect('back');
//      } else {
//        return res.status(401).send('Unauthorized');
//      }
//    } catch (err) {
//      console.error(err);
//      return res.status(500).send('Internal Server Error');
//    }
//  };
module.exports.update = async function (req, res) {

   if (req.user.id == req.params.id) {

   try {
     
       let user= await User.findById(req.params.id);
       User.uploadedAvatar(req, res, function(err){
         if(err){
            console.log('*****Multer Error', err)
         }
         user.name = req.body.name;
         user.email = req.body.email;

         if (req.file){
            //this is saving the path of the uploaded file into the avatar field in the user
            user.avatar = User.avatarPath + '/' + req.file.filename;
         }

         user.save();
         return res.redirect('back');
         
       })
      
   
   } catch (err) {
    req.flash('error', err);
    return res.redirect('back');

   }
 }else {
   req.flash('error', 'Unauthorized');
   return res.status(401).send('Unauthorized');
 }

}

 

// module.exports.profile = async function (req, res) {
//    try {
//      if (req.cookies.user_id) {
//        // Find the user using await
//        const user = await User.findById(req.cookies.user_id);
 
//        if (user) {
//          return res.render('users_profile', {
//            title: "User Profile",
//            user: user
//          });
//        } else {
//          return res.redirect('/users/sign-in');
//        }
//      } else {
//        return res.redirect('/users/sign-in');
//      }
//    } catch (err) {
//      console.log('Error in finding user profile:', err);
//      return res.redirect('/users/sign-in');
//    }
//  };

//render the sign up page
module.exports.signUp = function(req,res){

   if(req.isAuthenticated()){
      return res.redirect('/users/profile');
   }
   return res.render('user_sign_up',{
      title:"Codeial|Sign Up"
   })
}

//render the sign in page
module.exports.signIn = function(req,res){

   if(req.isAuthenticated()){
      return res.redirect('/users/profile');
   }
   
   return res.render('user_sign_in',{
      title:"Codeial|Sign In"
   })
}

//GET THE SIGN UP DATA
/*module.exports.create = function(req,res){
  if(req.body.password != req.body.confirm_password){
   return res.redirect('back');
  }
  User.findOne({email:req.body.email}, function(err,user){
   if(err){
      console.log('error in finding user in sign up'); return
   }
   if(!user){
      User.create(req.body, function(err,user){
         if(err){
            console.log('error in creating user while signing up'); return
         }
         return res.redirect('/users/sign-in');
         
      })
   }else{
      return res.redirect('back');
   }
  });
}*/
module.exports.create = async function (req, res) {
   if (req.body.password !== req.body.confirm_password) {
     return res.redirect('back');
   }
 
   try {
     const user = await User.findOne({ email: req.body.email });
 
     if (!user) {
       await User.create(req.body);
       return res.redirect('/users/sign-in');
     } else {
       return res.redirect('back');
     }
   } catch (err) {
     handleErrors(err, res); // Custom function to handle errors and redirect back
   }
 };


//SIGN IN AND CREATE A SESSION FOR THE USER

/*
module.exports.createSession = function(req, res){
   
   //steps to authenticate
   //find the user
   User.findOne({email: req.body.email}, function(err, user){
      if(err){
         console.log('error in finding user in signing in'); return
      }
      //handle user found
      if(user){
         //handle password doesn't match 

         if(user.password !== req.body.password){
            return res.redirect('back');
         }

         //handle session creation
         res.cookie('user_id', user.id);
         return res.redirect('/users/profile');

      }else{
         //handle user not found
         return res.redirect('back');
      }
   });

}
*/
module.exports.createSession = function(req, res){
   req.flash('success', 'Logged in Successfull');
   return res.redirect('/');
}

// module.exports.createSession = async function (req, res) {
//    try {
//      // Find the user using await
//      const user = await User.findOne({ email: req.body.email });
 
//      // Handle user not found
//      if (!user) {
//        return res.redirect('back');
//      }
 
//      // Handle password doesn't match
//      if (user.password !== req.body.password) {
//        return res.redirect('back');
//      }
 
//      // Handle session creation
//      res.cookie('user_id', user.id);
//      return res.redirect('/users/profile');
//    } catch (err) {
//      console.log('Error in finding user in signing in:', err);
//      return res.redirect('back');
//    }
//  };

/*module.exports.destroySession = function(req, res){
   req.logout();

   return res.redirect('/');

}*/
module.exports.destroySession = function(req, res) {
   // Call req.logout() with a callback function
   req.logout(function(err) {
     if (err) {
       console.error('Error while logging out:', err);
     }
     req.flash('success', 'You have Logged out!!!!');
     // After successful logout, redirect the user to the desired location (e.g., home page)
     return res.redirect('/');
   });
 };