import { DataTypes } from 'sequelize';
import  sequelize from '../Configuration/db';
import Reservations from './Reservations';
import  Books  from './Books';
import  Members  from './Members';

// Creating Loans Model

const Loans = sequelize.define('Loans', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        comment: 'Unique loan identifier'
    },
    // book_id: {
    //     type: DataTypes.INTEGER,
    //     references: {
    //         model: Books,
    //         key: 'id'
    //     },
    //     comment: 'ID of the borrowed book'
    // },
    // member_id: {
    //     type: DataTypes.INTEGER,
    //     references: {
    //         model: Members,
    //         key: 'id'
    //     },
    //     comment: 'ID of the member who borrowed the book'
    // },
    reservation_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Reservations,
            key: 'id'
        },
        comment: 'ID of the reservation'
    },
    loan_date: {
        type: DataTypes.DATE,
        allowNull: false,
        comment: 'Date the book was loaned out'
    },
    status: {
        type: DataTypes.ENUM('Active', 'Returned'),
        allowNull: false
        //comment: 'Status of the Loan'
    }

},{
    timestamps: false
});


export default Loans;