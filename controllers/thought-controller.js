const { Thought, User } = require('../models');

const thoughtController = {
    getAllThoughts(req, res) {
        Thought.find({})
            .select('-__v')
            .sort({ _id: -1 })
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    // get one thought by id
    getThoughtById({ params }, res) {
        Thought.findOne({ _id: params.thoughtId })
            .then(dbThoughtData => {
                if(!dbThoughtData) {
                    res.status(404).json({ message: 'No thought found with that id!' });
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    // create new Thought
    createThought({ params, body }, res) {
        Thought.create(body)
            .then(({ _id }) => {
                return User.findOneAndUpdate(
                    { _id: params.userId},
                    { $push: { thoughts: _id } },
                    { new: true }
                )
                .populate({
                    path: 'thoughts',
                    select: '-__v'
                })
                .select('-__v');
            })
            .then(dbThoughtData => {
                if(!dbThoughtData) {
                    res.status(404).json({ message: 'No thought found with this id!' })
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => res.json(err));
    },

    // update by id
    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate({ _id: params.thoughtId }, body, { new: true, runValidators: true })
            .then(dbThoughtData => {
                if(!dbThoughtData)  {
                    res.status(404).json({ message: 'No thought found with that id' });
                    return;
                }
            })
            .catch(err => res.status(400).json(err));
    },

    // delete by id
    deleteThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.thoughtId })
            .then(deletedThought => {
                if(!deletedThought) {
                    res.status(404).json(err);
                    return;
                }
                return User.findOneAndUpdate(
                    { _id: params.userId },
                    { $pull: { thoughts: params.thoughtId } },
                    { new: true }
                )
                .populate({
                    path: 'thoughts',
                    select: '-__v'
                })
                .select('-__v');
            })
            .then(dbUserData => {
                if(!dbUserData ) {
                    res.status(404).json({ message: 'No ser found with that id' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.status(400).json(err));
    }
};

module.exports = thoughtController;