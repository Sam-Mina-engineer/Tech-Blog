const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../config/auth');

// Route to create a new comment

router.post('/', withAuth, async (req, res) => {
  try {
    const newComment = await Comment.create({
      content: req.body.content,
      user_id: req.session.user_id,
      post_id: req.body.post_id,
    });

    res.status(200).json(newComment);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Route to delete a comment

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const deletedComment = await Comment.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!deletedComment) {
      res.status(404).json({ message: 'No comment found with this id for the current user' });
      return;
    }

    res.status(200).json({ message: 'Comment deleted successfully' });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
