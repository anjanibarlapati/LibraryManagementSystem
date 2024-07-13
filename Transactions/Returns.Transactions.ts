import sequelize from "../Configuration/db";
import Loans from "../Models/Loans";
import Reservations from "../Models/Reservations";
import Returns from "../Models/Returns";
import Books from "../Models/Books";

async function returnBook(returnData: any) {
  try {
     await sequelize.transaction( async (transaction) => {
        let loan = await Loans.findOne({
            where: {
                id: returnData.loan_id,
                status: 'Active'
            }, include: { model: Reservations, as: 'loanReservation', attributes: ['book_id']}, transaction });

        if(!loan) {
            throw new Error("No such Loan exist");
        }
         console.log(loan);
        const book_id = loan.toJSON().loanReservation.book_id;
        console.log(book_id);
         const book = await Books.findByPk(book_id, {transaction});
         const numberOfCopies= book!.toJSON().numberOfCopies;

        const returnRecord = await Returns.create(returnData, {transaction});
        await loan.update({status: 'Returned'}, {transaction});
        await Books.update({numberOfCopies: numberOfCopies+1}, {where: {id: book_id}, transaction});

        console.log("Return Record Created");
        console.table(returnRecord.toJSON());
        });
    } catch(Error: any) {
        console.log("Error while creating Return record");
    }
}

export default returnBook;

// returnBook({loan_id: 1, return_date: new Date()});


