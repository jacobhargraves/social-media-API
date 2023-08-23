const { Schema, model } = require('mongoose');
const { format_date } = require('../utils/helpers.js');

const reactionSchema = new Schema(
    {
      reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId(),
      },
      reactionBody: {
        type: String,
        required: true,
        maxlength: 280,
      },
      username: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
        // Use a getter method to format the timestamp on query
        get: (date) => format_date(date),
        },
    },
    {
      toJSON: {
        getters: true,
      },
    }
    );

const thoughtSchema = new Schema(
    {
      thoughtText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280,
      },
      createdAt: {
        type: Date,
        default: Date.now,
        // Use a getter method to format the timestamp on query
        get: (date) => format_date(date),
      },
      // will be set in the controllers using username set to the user's username
      username: {
        type: String,
        required: true,
        },
      reactions: [reactionSchema],
    },
    {
      toJSON: {
        virtuals: true,
        getters: true,
      },
    }
  );

thoughtSchema.virtual('reactionCount')
// Getter
.get(function () {
  return this.reactions.length;
});
  
const Thought = model('thought', thoughtSchema);

module.exports = Thought;