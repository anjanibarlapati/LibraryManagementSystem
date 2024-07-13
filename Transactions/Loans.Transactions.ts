import sequelize from "../Configuration/db";
import {Op, Model} from 'sequelize';
import Loans from "../Models/Loans";
import Reservations from "../Models/Reservations";
import Books from "../Models/Books";

async function createLoan(loanData: any): Promise<Model| undefined> {
   const transaction = await sequelize.transaction();
   try {
      let reservation= await Reservations.findOne({ 
        where: { id: loanData.reservation_id,
                 status: 'Active',
                 reservation_date: { [Op.lt]: loanData.loan_date }
        }, include:{ model: Books , as: 'reservedBooks', attributes: ['numberOfCopies', 'id']}, transaction}
      );
      // console.log(reservation);
      if(!reservation) {
        throw new Error('You have not reserved such book or your reservation is not active');
      }

      const reservationJSON = reservation.toJSON();
      const numberOfCopies = reservationJSON.reservedBooks.numberOfCopies;
      const book_id = reservationJSON.reservedBooks.id;

      if(numberOfCopies<=0) {
        throw new Error('Book not available');
      }

      const loan =await Loans.create(loanData, {transaction});
      await Books.update({numberOfCopies: numberOfCopies-1},  {where: {id: book_id}, transaction} );
      await reservation.update({status: 'Fulfilled'}, {transaction});
      //await Reservations.update({status: 'Fulfilled'}, {where: {reservation_id: loanData.reservation_id}, transaction});

      await transaction.commit();
      console.log("Loan created");
      return loan;

      } catch(Error: any) {
        await transaction.rollback();
        console.error('Error while creating loan:',Error);
    }
}

export default createLoan;
//createLoan({reservation_id: 1, loan_date: new Date(), status: 'Active' });


