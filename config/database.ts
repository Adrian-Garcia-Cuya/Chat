import { Sequelize } from "sequelize";

const connection = new Sequelize( 'chat_node', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

export default connection;