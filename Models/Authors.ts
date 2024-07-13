import { DataTypes } from 'sequelize';
import sequelize from '../Configuration/db';
  

// Creating Authors Model

const Authors = sequelize.define('Authors', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        comment: 'Unique author identifier'
    },
    name: {
        type: DataTypes.STRING(255),
        allowNull: false,
        comment: 'Author\'s full name'
    },
    birth_year: {
        type: DataTypes.INTEGER,
        comment: 'Author\'s birth year'
    },
    nationality: {
        type: DataTypes.STRING(100),
        comment: 'Author\'s nationality'
    }

}, {
    timestamps: false,
    indexes: [
        {
            unique: true,
            fields: ['id', 'name'],
            name: 'authorIndex'
        }
    ]
});


export default Authors;
