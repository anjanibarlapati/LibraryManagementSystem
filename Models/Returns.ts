import { DataTypes } from 'sequelize';
import sequelize from '../Configuration/db';
import Loans from './Loans';

// Creating Returns Model

const Returns = sequelize.define('Returns', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        comment: 'Unique Return identifier'
    },
    loan_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Loans,
            key: 'id'
        },
        comment: 'ID of the loned book'
    },
    return_date: {
        type: DataTypes.DATE,
        allowNull: false,
        comment: 'Date the return was made'
    } 

}, {
    timestamps: false
});

 
export default Returns;
