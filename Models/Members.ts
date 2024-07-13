import { DataTypes } from 'sequelize';
import sequelize from '../Configuration/db';

// Creating Members Model

const Members = sequelize.define('Members', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        comment: 'Unique member identifier'
    },
    name: {
        type: DataTypes.STRING(255),
        allowNull: false,
        comment: 'Member\'s full name'
    },
    address: {
        type: DataTypes.STRING(255),
        comment: 'Member\'s address'
    },
    phone_number: {
        type: DataTypes.STRING(20),
        comment: 'Member\'s phone number'
    },
    email: {
        type: DataTypes.STRING(255),
        unique: true,
        //comment: 'Member\'s email address'
    }

},{
    timestamps: false,
    indexes: [
        {
            name: 'members',
            unique: true,
            fields: ['id', 'name']
        }
    ]
});

export default Members;
