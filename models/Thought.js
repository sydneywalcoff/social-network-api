const { Schema, model } = require('mongoose');

const ThoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            // between 1 and 280 chars
        },
        createdAt: {
            type: Date,
            default: Date.now,
            // getter date format
        },
        username: {
            type: String,
            required: true
        },
        reactions:[]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);

ThoughtSchema.virtual('reactionCount').get(() => this.reactions.length);

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;