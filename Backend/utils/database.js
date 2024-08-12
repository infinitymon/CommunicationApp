import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('communication', 'root', '', {
    dialect: 'mysql',
    host: 'localhost',
    logging: false,
    charset: "utf8mb4",
    collate: "utf8mb4_unicode_ci",
})
export default sequelize