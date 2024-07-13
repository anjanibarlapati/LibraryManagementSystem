import { DataTypes } from 'sequelize';
import sequelize from '../Configuration/db';
import  Books  from './Books';
import  Members  from './Members';

// Creating Reservations Model

const Reservations = sequelize.define('Reservations', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        comment: 'Unique reservation identifier'
    },
    book_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Books,
            key: 'id'
        },
        comment: 'ID of the reserved book'
    },
    member_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Members,
            key: 'id'
        },
        comment: 'ID of the member who made the reservation'
    },
    reservation_date: {
        type: DataTypes.DATE,
        allowNull: false,
        comment: 'Date the reservation was made'
    },
    status: {
        type: DataTypes.ENUM('Active', 'Fulfilled'),
        allowNull: false
        //comment: 'Status of the status'
    }

}, {
    timestamps: false
});

 
export default Reservations;
