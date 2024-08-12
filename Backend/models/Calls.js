import sequelize from '../utils/database.js';
import { DataTypes } from 'sequelize';
import bcrypt from 'bcryptjs'

const Calls = sequelize.define('calls', {
    type: {
        type: DataTypes.STRING,
    },
    status: {
        type: DataTypes.STRING
    },
    from: {
        type: DataTypes.STRING
    },
    to: {
        type: DataTypes.STRING
    },
    createdDate:{
        type: DataTypes.DATE
    },
    dialedDate: {
        type: DataTypes.DATE
    },
    duration: {
        type: DataTypes.TIME
    },
    followupStatus:{
        type: DataTypes.STRING,
        enum: ["Resolved" , "Call Back", "Irrelevant"]
    },
    resolution: {
        type: DataTypes.STRING,
    },
    agent:{
        type: DataTypes.STRING
    }
})

export default Calls