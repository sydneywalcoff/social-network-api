const router = require('express').Router();
const { getAllThoughts, getThoughtById, createThought, updateThought, deleteThought } = require('../../controllers/thought-controller');

// GET all, POST thought at /thoughts
router
    .route('/')
    .get(getAllThoughts)
    .post(createThought);

// GET one, PUT by id, DELETE by id
router
    .route('/:id')
    .get(getThoughtById)
    .put(updateThought)
    .delete(deleteThought);

module.exports = router;