const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const speechSchema = new Schema({
  owner: { type: ObjectId, ref: 'User' },
  title: String,
  message: String,
  tag: [{type: String}],
  isPublic: Boolean,
  },{
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    },
});

const Speech = mongoose.model('Speech', speechSchema);

module.exports = Speech;