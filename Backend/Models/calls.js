import mongoose from "mongoose";
import validator from "validator";

const CallsSchema = new mongoose.Schema({
    type: {
        type: String,
    },
    status: {
        type: String
    },
    from: {
        type: String
    },
    to: {
        type: String
    },
    createdDate:{
        type: Date
    },
    dialedDate: {
        type: Date
    },
    duration: {
        type: TimeRanges
    },
    followupStatus:{
        type: String,
        enum: ["Resolved" , "Call Back", "Irrelevant"]
    },
    resolution: {
        type: String,
    },
    agent_id:{
        type: Number
    }
})

const Calls = mongoose.model("Calls", CallsSchema)