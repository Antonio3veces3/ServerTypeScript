import {DataTypes} from 'sequelize';
import db from '../db/connection';


const User = db.define('User', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    mail: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    status: {
        type: DataTypes.TINYINT,
        defaultValue: 1,
    },
    createdAt: {
        type: DataTypes.TIME,
    },
    updatedAt: {
        type: DataTypes.TIME,
    }
})

export default User;