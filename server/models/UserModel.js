import { Sequelize } from "sequelize";
import db from "../config/database.js";

const {DataTypes} = Sequelize;

const Users = db.define('users', {
    uuid: {
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false, // field uuid tidak boleh bernilai null
        validate: {
            notEmpty: true // field uuid tidak boleh bernilai empty string
        }
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false, // field uuid tidak boleh bernilai null
        validate: {
            notEmpty: true, // field uuid tidak boleh bernilai empty string
            len: [3, 100] // jumlah karakter di field name
        }
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            isEmail: true
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    }
}, {
    freezeTableName: true
});

export default Users;