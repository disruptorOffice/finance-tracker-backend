import {sequelizeConnection as sequelize} from "../config/sequelizeConfig";

import {DataTypes} from "sequelize";



const Role = sequelize.define(
    'Role',
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING(60),
            allowNull: false
        }
    },
    {
        tableName: 'role'
    }
)

const User = sequelize.define(
    'User',
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        first_name: {
            type: DataTypes.STRING(45),
            allowNull: false
        },
        last_name: {
            type: DataTypes.STRING(90),
            allowNull: false
        },
        username: {
            type: DataTypes.STRING(45),
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING(60),
            allowNull: false
        },
        role_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false
        }
    },
    {
        tableName: 'user'
    }
)

const Category = sequelize.define(
    'Category',
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING(100),
            allowNull: false
        }
    },
    {
        tableName: 'category'
    }
)

const TypePayment = sequelize.define(
    'TypePayment',
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING(100),
            allowNull: false
        }
    },
    {
        tableName: 'type_payment'
    }
)

const FinanceRecord = sequelize.define(
    'FinanceRecord',
    {
        id : {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        amount: {
            type: DataTypes.DECIMAL(15, 2),
            allowNull: false
        },
        concept: {
            type: DataTypes.STRING(100)
        },
        type_amount: {
            type: DataTypes.ENUM('income', 'expense'),
            allowNull: false
        },
        user_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false
        },
        category_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false
        },
        type_payment_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false
        }
    }
)

Role.hasMany(User, {foreignKey: 'role_id'})
User.belongsTo(Role, {foreignKey: 'role_id'})


User.hasMany(FinanceRecord, {foreignKey: 'user_id'})
FinanceRecord.belongsTo(User, {foreignKey: 'user_id'})

Category.hasMany(FinanceRecord, {foreignKey: 'category_id'})
FinanceRecord.belongsTo(Category, {foreignKey: 'category_id'})

TypePayment.hasMany(FinanceRecord, {foreignKey: 'type_payment_id'})
FinanceRecord.belongsTo(TypePayment, {foreignKey: 'type_payment_id'})

export const syncDatabase = async () => {
    await sequelize.sync()
    console.log('Database synchronized')
}