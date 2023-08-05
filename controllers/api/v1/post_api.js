const Post = require('../../../models/post');
const Comment = require('../../../models/comment');


module.exports.index = async function(req, res){

    try{

        let posts = await Post.find({}).populate('user').populate({
            path: 'comments',
            populate: {
                path: 'user'
            }
        });


// return res.json(200, {
//     message: "List of posts",
//     posts:posts
// })
return res.status(200).json({
    message: "List of posts",
    posts: posts
});

    }catch(err){
        console.log(err);
        return res.json(401, {message:'error in finding post'})

    }
    

   
}

// const Post = require('../../../models/post');
// module.exports.index = async function(req, res){


//     let postsPromise = Post.find({}).populate('user').populate({
//         path: 'comments',
//         populate: {
//             path: 'user'
//         }
//     });

//     return res.status(200).json({
//         message: "List of posts",
//         posts: postsPromise
//     });
// };
// 

module.exports.destroy = async function (req, res) {
    try {

       
        let post = await Post.findById(req.params.id);
        if(post.user == req.user.id){

        if (!post) {
            return res.status(404).json({
                message: "Post not found"
            });
        }

        // Check if the user is authorized to delete the post (if required)

        await post.deleteOne(); // Use deleteOne instead of remove()

        await Comment.deleteMany({ post: req.params.id });

        // return res.json(200, {
        //     message: "Post and associated comments deleted successfully!"
        // });
        return res.status(200).json({
            message: "Post and associated comments deleted successfully!"
        });
    }else{
        return res.json(401, {
            message:"You cannot delete this post!!"
        });
    }

    } catch (err) {
        console.log('********', err);
        return res.json(500, {
            message: "Internal Server Error"
        });
    }
}