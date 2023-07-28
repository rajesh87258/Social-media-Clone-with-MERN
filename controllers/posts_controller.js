// const Post = require('../models/post');

// module.exports.create = function(req, res){
//     Post.create({
//         content: req.body.content,
//         user: req.user._id
//     },
      
//     function(err,post){
//         if(err){
//             console.log('error in creating a Post');
//             return;
//         }
//         return res.redirect('back');
//     }


//     );
// }

const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.create = async function(req, res) {
    try {
        const post = await Post.create({
            content: req.body.content,
            user: req.user._id
        });

        return res.redirect('back');
    } catch (err) {
        console.log('error in creating a Post:', err);
        return;
    }
};

// module.exports.destroy = function(req, res){
//     Post.findById(req.params.id, function(err, post){
//             //.id means converting the object id into string

//             if(post.user == require.user.id){
//                 post.remove();
//                 Comment.deleteMany({post:req.params.id},
//                     function(err){
//                         return res.redirect('back');

//                     }
                    
//                     );
//             }
//             else {
//                 return res.redirect('back');
//             }
//     });
// }

module.exports.destroy = async function (req, res) {
    try {
        const post = await Post.findById(req.params.id);

        //.id means converting the object id into a string
        if (post.user == req.user.id) {
            await Post.deleteOne({ _id: req.params.id });
            await Comment.deleteMany({ post: req.params.id });
        }

        return res.redirect('back');
    } catch (err) {
        console.error(err); // Handle the error appropriately
        return res.redirect('back');
    }
};



