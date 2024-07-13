import  Authors  from "../Models/Authors";
import  Members  from "../Models/Members";
import  Books  from "../Models/Books";
import  Loans  from "../Models/Loans";
import  Reservations  from "../Models/Reservations";
import Returns from "../Models/Returns";

const setUpAssociations = () => {

    console.log("Setting up associations");

    // Authors and Books Associations
    Authors.hasMany(Books,{
        foreignKey: 'authorId', onDelete: 'CASCADE', onUpdate: 'CASCADE', as:'books'
    });
    
    Books.belongsTo(Authors, {
        foreignKey: 'authorId', onDelete: 'CASCADE', onUpdate: 'CASCADE', as:'author'
    });

    // Books and Loans Associations
    // Books.hasMany(Loans, {
    //     foreignKey: 'book_id', onDelete: 'CASCADE', onUpdate: 'CASCADE', as: 'bookLoans'
    // });

    // Loans.belongsTo(Books, {
    //     foreignKey: 'book_id', onDelete: 'CASCADE', onUpdate: 'CASCADE', as: 'loanedBook'
    // });
    
    // Membsers and Loans Associations
    // Members.hasMany(Loans, {
    //     foreignKey: 'member_id', onDelete: 'CASCADE', onUpdate: 'CASCADE', as: 'memberLoans'
    //  });  
    
    // Loans.belongsTo(Members, {
    //     foreignKey: 'member_id', onDelete: 'CASCADE', onUpdate: 'CASCADE', as: 'loanMember'
    // });

    // Reservations and Loans Associations
    Reservations.hasOne(Loans, {
        foreignKey: 'reservation_id', onDelete: 'CASCADE', onUpdate: 'CASCADE', as: 'reservationLoan'
    });

    Loans.belongsTo(Reservations, {
        foreignKey: 'reservation_id', onDelete: 'CASCADE', onUpdate: 'CASCADE', as: 'loanReservation'
    });

    // Books and Reservations Associations    
    Books.hasMany(Reservations, {
        foreignKey: 'book_id', onDelete: 'CASCADE', onUpdate: 'CASCADE', as: 'bookReservations'
    });
    
    Reservations.belongsTo(Books, {
        foreignKey: 'book_id', onDelete: 'CASCADE', onUpdate: 'CASCADE', as: 'reservedBooks'
    });

    // Members and Reservations Associations    
    Members.hasMany(Reservations, {
        foreignKey: 'member_id', onDelete: 'CASCADE', onUpdate: 'CASCADE', as: 'memberReservations'
     });

    Reservations.belongsTo(Members, {
        foreignKey: 'member_id', onDelete: 'CASCADE', onUpdate: 'CASCADE', as: 'reservationMember'
    });

    // Loans and Return Associations
    Loans.hasOne(Returns, {
        foreignKey: 'loan_id', onDelete: 'CASCADE', onUpdate: 'CASCADE', as: 'loanReturn'
    })
    Returns.belongsTo(Loans, {
        foreignKey: 'loan_id', onDelete: 'CASCADE', onUpdate: 'CASCADE', as: 'returnLoan'
    })
    
}

export default setUpAssociations;


