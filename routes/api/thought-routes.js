const router = require('express').Router();
const { getAllThoughts, getThoughtById, createThought, updateThought, deleteThought, createReaction, deleteReaction } = require('../../controllers/thought-controller');

// GET every thought
router.route('/').get(getAllThoughts);

// POST a thought to a specific user
router.route('/:userId').post(createThought);

// GET a specific thought 
router.route('/:thoughtId').get(getThoughtById);

// Update or DELETE a users' thoughts
router.route('/:userId/:thoughtId').put(updateThought).delete(deleteThought);

// POST reaction
router.route('/:thoughtId/reactions').put(createReaction);

// DELETE reaction
router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction)

module.exports = router;