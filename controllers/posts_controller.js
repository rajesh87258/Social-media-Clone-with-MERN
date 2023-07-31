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

        req.flash('success', 'Post Published!');

        return res.redirect('back');
    } catch (err) {
        // console.log('error in creating a Post:', err);
        req.flash('error', err);
        // return;
        return res.redirect('back');
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

            req.flash('success', 'Post and associated Comment deleted!');

            return res.redirect('back');
        } else{

            
        req.flash('error', 'You can not delete this Post!');

        return res.redirect('back');

        }

    } catch (err) {
        // console.error(err); // Handle the error appropriately
        req.flash('error', err);
        return res.redirect('back');
    }
};



