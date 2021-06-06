const { Schema, model } = require('mongoose');

const UserSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            trim: true,
            unique: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            // must match valid email address => look for mongoose matching validation for email
        },
        thoughts: [
            // {
            //     type: Schema.Types.ObjectId,
            //     ref: 'Thought'
            // }
        ],
        friends: [],
    },
    {
        toJSON: {
            virtuals: true
        },
        id: false
    }
);

UserSchema.virtual('friendCount').get(function() {
    return this.friends.length;
});