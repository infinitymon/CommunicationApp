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
    }
})

Users.beforeCreate(async (user) => {
    if(user?.password) {
        user.password = await bcrypt.hash(user.password, 10);
    }
});

export default Users