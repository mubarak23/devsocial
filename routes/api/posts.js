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
    console.log(error.message);
    return res.status(500).send('server error');
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
  }
});

module.exports = router;
