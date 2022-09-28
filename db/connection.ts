import { Sequelize } from "sequelize";
 
// DBname, user password, config
const db = new Sequelize('nodets', 'root', '#MysqlTony33',{
    host: 'localhost',
    dialect: 'mysql',
    //loggin: false,
})

export default db;