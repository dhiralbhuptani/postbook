import Post from '../models/post.model';

// POST posts data
exports.createPost = (req, res) => {
  const url = req.protocol + '://' + req.get('host');
  const post = new Post({
    postTitle: req.body.postTitle,
    postContent: req.body.postContent,
    imagePath: url + '/images/' + req.file.filename,
    creator: req.userData.userId
  });  
  post.save().then(newPostData => {    
    res.status(201).json({
      message: 'Post added successfully',
      post: {
        ...newPostData,
        postId: newPostData._id
      }    
    });
  })
  .catch(error => {
    res.status(500).json({
      message: 'Post cannot be created.'
    })
  });  
};

// PUT post data
exports.updatePost = (req, res) => {
  let imagePath = req.body.imagePath;
  if (req.file) {
    const url = req.protocol + '://' + req.get('host');
    imagePath = url + '/images/' + req.file.filename;
  }
  const post = new Post({
    _id: req.body.id,
    postTitle: req.body.postTitle,
    postContent: req.body.postContent,
    imagePath: imagePath,
    creator: req.userData.userId
  });
  // console.log(post)
  Post.updateOne({
    _id: req.params.id,
    creator: req.userData.userId
  }, post)
  .then((result) => {
    // console.log(result);
    if (result.n > 0) {
      res.status(200).json({      
        message: 'Post Updated!'
      });
    } else {
      res.status(401).json({      
        message: 'Not Authorized'
      });
    }
  })
  .catch(error => {
    res.status(500).json({
      message: 'Could not update Post.'
    });
  });
};

// GET posts data
exports.getPosts = (req, res) => {
  const pageSize = +req.query.pagesize;
  const currentPage = +req.query.page;
  const postQuery = Post.find();
  let allPosts;
  if (pageSize && currentPage) {
    postQuery
    .skip(pageSize * (currentPage - 1))
    .limit(pageSize);
  }
  postQuery
  .then(documents => {
    allPosts = documents;
    return Post.countDocuments();
  })
  .then(count => {
    res.status(200).json({
      message: 'Post fetched successfully',
      posts: allPosts,
      getAllPostsCount: count
    });
  })
  .catch(error => {
    res.status(500).json({
      message: 'Can not featch posts.'
    });
  });
};

// GET single post data
exports.getSinglePost = (req, res) => {
  Post.findById(req.params.id)
  .then(getPost => {
    if (getPost)
      res.status(200).json(getPost);
    else
      res.status(404).json({ message: 'Post not found!' });
  })
  .catch(error => {
    res.status(500).json({
      message: 'Can not featch posts.'
    });
  });
};

// GET posts data with search query
exports.getSearchedPosts = (req, res) => {
  const searchPost = Post.find({
    postTitle: {
      $regex: req.params.query,
      $options: 'i'
    }
  })
  .limit(5);
  searchPost.exec((err, posts) => {
    if (err)
      res.status(404).json({ message: 'No Posts found.' });
    else
      res.status(200).json(posts);
  });
};

// DELETE posts data
exports.deletePost = (req, res) => {
  Post.deleteOne({
    _id: req.params.id,
    creator: req.userData.userId
  })
  .then(result => {
    if (result.n > 0) {    
      res.status(200).json({
        message: 'Post Deleted.'
      });
    } else {
      res.status(401).json({
        message: 'Not authorized to delete post.'
      });
    }
  })
  .catch(error => {
    res.status(500).json({
      message: 'Can not delete post.'
    });
  });;
};