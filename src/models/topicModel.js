import mongoose from 'mongoose';

const Schema = mongoose.Schema(
    {
        project: { type: String, required: true },
        month: { type: String, required: true },
        title: { type: String, required: true },
        word: { type: Number, required: true },
        type: { type: String, required: true },
        given: { type: String, required: true }
    },
    { timestamps: true, versionKey: false }
);

const Topics = mongoose.model('topics', Schema);

export default Topics;
