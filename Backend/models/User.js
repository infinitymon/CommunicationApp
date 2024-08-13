import sequelize from "../utils/database.js";
import {DataTypes} from "sequelize";
import bcrypt from 'bcryptjs'

const Users = sequelize.define('user', {
    username: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING,
    },
    password: {
        type: DataTypes.STRING
    },
    phoneNumber: {
        type: DataTypes.BIGINT
    },
    role: {
        type: DataTypes.String,
        enum: ["agent", "admin"]
    }
})

Users.beforeCreate(async (user) => {
    if(user?.password) {
        user.password = await bcrypt.hash(user.password, 10);
    }
});

export default Users