const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');
const auth = require('../../middleware/auth');
// @route    GET api/posts
// @desc     Test route
// @access   Public

router.get('/test', (req, res) => {
  res.send('post route');
});

// @route    POST api/posts
// @desc     Create a post
// @access   Private
router.post(
  '/',
  [
    auth,
    [
      check('text', 'Text is required')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select('-password');

      const newPost = new Post({
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id
      });

      const post = await newPost.save();

      res.json(post);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route    get api/posts
// @desc     pull all posts
// @access   Private
router.get('/', auth, async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });
    return res.status(200).json(posts);
  } catch (error) {
    res.status(500).send('Server Error');
    console.log(error.message);
  }
});

// @route    get api/posts
// @desc     get a post base on :id
// @access   Private
router.get('/:id', auth, async (req, res) => {
  try {
    const post = await findById(req.params.id);
    if (!post) {
      return res.status(404).json({
        message: 'No Post found'
      });
    }
    return res.status(200).json(post);
  } catch (error) {
    console.log(error.message);
    return res.status(500).send('server error');
  }
});

// @route    DELETE api/posts
// @desc    Single post base on /:id
// @access   Private
router.delete('/:id', async (req, res) => {
  try {
    const post = Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({
        message: 'No Post found'
      });
    }
    if (post.user.toString() != req.user.id) {
      return res.status(404).json({
        message: 'Unauthorize User'
      });
    }
    await post.remove();
  } catch (error) {
    console.log(error.message);
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ message: 'post is not fount' });
    }
    return res.status(500).send('Server error');
  }
});

// @route    DELETE api/posts/like/:id
// @desc    like post
// @access   Private

router.put('/like/:id', auth, async (req, res) => {
  try {
    const post = findById(req.params.id);
    if (
      post.likes.filter(like => like.user.toString() === req.user.id).length > 0
    ) {
      return res.status(400).json({ msg: 'post already like' });
    }
    post.likes.unshift({ user: req.user.id });
    await post.save();
  } catch (error) {
    console.log(error.message);
    return res.status(500).send('Server Error');
  }
});

// @route    DELETE api/posts/unlike/:id
// @desc    unlike post
// @access   Private
router.put('/unlike/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (
      post.likes.filter(like => like.user.toString() === req.user.id).length ===
      0
    ) {
      return res.status(400).json({ msg: 'Post has not yet been like' });
    }
    //const removeIndex = post.likes.map.(like => like.user.toString()).indexOf(req.user.id);
    const removeIndex = post.likes
      .map(like => like.user.toString())
      .indexOf(req.user.id);

    post.likes.splice(removeIndex, 1);
    await post.save();
    return res.status(200).json(post.like);
  } catch (error) {
    console.log(error.message);
    return res.status(500).send('Server error');
  }
});

// @route    POST api/posts/comment/:id
// @desc     Comment on a post
// @access   Private
router.post(
  '/comment/:id',
  [
    auth,
    [
      check('text', 'Text is required')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    }
    try {
      const user = await User.findById(req.user.id).select('-password');
      const post = await Post.findById(req.params.id);
      const newComment = {
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id
      };
      post.comment.unshift(newComment);
      await post.save();
      return res.status(post.comment);
    } catch (error) {
      console.log(error.message);
      return res.status(500).send('Server error');
    }
  }
);

// @route    DELETE api/posts/comment/:id/:comment_id
// @desc     Delete comment
// @access   Private
router.delete('/comment/:id/:comment_id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    //get the comment
    const comment = post.comments.find(
      comment => (comment.id = req.params.comment_id)
    );

    //ensure comment exist
    if (!comment) {
      res.status(404).json({ msg: 'Comment does not exist' });
    }

    if (comment.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User is unauthorized' });
    }

    //get remove index
    const removeIndex = post.comments
      .map(comment => comment.user.toString())
      .indexOf(req.user.id);

    post.comment.splice(removeIndex, 1);
    await post.save();
    res.status(200).json(post.comment);
  } catch (error) {
    console.log(error.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
