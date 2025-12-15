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

const PaymentFrequency = sequelize.define(
    'PaymentFrequency',
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        frequency: {
            type: DataTypes.STRING(30),
            allowNull: false
        }
    },
    {
        tableName: 'payment_frequency'
    }
)

const ScheduledPayment = sequelize.define(
    'ScheduledPayment',
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        concept: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        frequency_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false
        },
        amount: {
            type: DataTypes.DECIMAL(15, 2),
            allowNull: false
        },
        category_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false
        },
        type_payment_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false
        },
        user_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false
        },
        billing_day: {
            type: DataTypes.STRING(20),
            allowNull: false
        }
    },
    {
        tableName: 'scheduled_payments'
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
        },
        date_record: {
            type: DataTypes.STRING(100),
            allowNull: false,
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

// Relaciones para ScheduledPayment
PaymentFrequency.hasMany(ScheduledPayment, { foreignKey: 'frequency_id' })
ScheduledPayment.belongsTo(PaymentFrequency, { foreignKey: 'frequency_id' })

Category.hasMany(ScheduledPayment, { foreignKey: 'category_id' })
ScheduledPayment.belongsTo(Category, { foreignKey: 'category_id' })

TypePayment.hasMany(ScheduledPayment, { foreignKey: 'type_payment_id' })
ScheduledPayment.belongsTo(TypePayment, { foreignKey: 'type_payment_id' })

User.hasMany(ScheduledPayment, { foreignKey: 'user_id' })
ScheduledPayment.belongsTo(User, { foreignKey: 'user_id' })

export const syncDatabase = async () => {
    await sequelize.sync()
    console.log('Database synchronized')
}

export {Role, User, Category, TypePayment, FinanceRecord, PaymentFrequency, ScheduledPayment}