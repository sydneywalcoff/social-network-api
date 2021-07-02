const { Schema, model, Types } = require('mongoose');

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
            match: /.+\@.+\..+/   
        },
        thoughts: [
            {
                type: Types.ObjectId,
                ref: 'Thought'
            }
        ],
        friends: [
            {
                type: Types.ObjectId,
                ref: 'User'
            }
        ],
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

const User = model('User', UserSchema);

module.exports = User;