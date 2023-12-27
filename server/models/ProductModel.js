import { Sequelize } from "sequelize";
import db from "../config/database.js";
import Users from "./UserModel.js"

const {DataTypes} = Sequelize;

const Products = db.define('product', {
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
    price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    }
}, {
    freezeTableName: true
});

// Relasi One to Many (Satu user bisa menginput banyak product)
Users.hasMany(Products);
Products.belongsTo(Users, {foreignKey: 'userId'});
// NOTE: Untuk membuat custom foreign key nama field harus sama dengan nama tabel yg define pada model asal
// dan ditambah Id, cth product+Id menjadi productId

export default Products;