import setUpAssociations from "../Configuration/Associations";
import sequelize from "../Configuration/db";
import Authors from "../Models/Authors";
import Books from "../Models/Books";
import Members from "../Models/Members";
import Reservations from "../Models/Reservations";
import Loans from "../Models/Loans";
import Sequelize from 'sequelize';

setUpAssociations();

export namespace AuthorsQueries {

    // All books of an author
    export async function getAuthorBooks(id: number) {
        try{
            const result = await Authors.findByPk( id, { include: { model: Books, as: 'books' } });

            const resultJSON = result!.toJSON();
            // console.log(resultJSON);
            const authorBooks = 
            {
                id: resultJSON.id,
                name: resultJSON.name,
                birth_year: resultJSON.birth_year,
                nationality: resultJSON.nationality,
                Books: resultJSON.books.map((book: any) => book.title).join(', '),
            };
            
            console.log("All books of an author with ID "+ id);
            console.table(authorBooks);

        } catch(Error) {
            console.log(Error);
        }
    }

    // All books of all authors
    export async function getAllAuthorsBooks() {
        try{
            const result = await Authors.findAll( { include: { model: Books, as: 'books' } });
            const results = result.map(author => {
                const authorJSON = author.toJSON();
                return {
                    id: authorJSON.id,
                    name: authorJSON.name,
                    birth_year: authorJSON.birth_year,
                    nationality: authorJSON.nationality,
                    Books: authorJSON.books.map((book: any) => 'Title: '+book.title + ' ID: ' + book.id).join(', '),
                };
            });

          console.log("All Books of all authors");  
          console.table(results);

      } catch(Error) {
          console.log(Error);
      }
    }

       // All Loans of a Book
       export async function getAllLoansForBook(bookId: number) {
        try {
            const result = await Loans.findAll({
                include: [
                    {  model: Reservations, as: 'loanReservation',
                        where: { book_id: bookId },
                        include: [
                            {  model: Members, as: 'reservationMember', attributes: ['name', 'email'] },
                            {  model: Books, as: 'reservedBooks', attributes: ['title'] }
                        ]
                    }
                ]
            });

            const bookLoans = result.map(loan => {
                const loanJSON = loan.toJSON();
                return {
                    Loan_ID: loanJSON.id,
                    Member_Name: loanJSON.loanReservation.reservationMember.name,
                    Member_Email: loanJSON.loanReservation.reservationMember.email,
                    Loan_Date: loanJSON.loan_date,
                    Status: loanJSON.status
                };
            });
    
            console.log("All loans of a book with ID "+ bookId);
            console.table(bookLoans);
        } catch (error) {
            console.error(error);
        }
    }

    // Author with most books

    export async function getAuthorsWithMostBooks() {
        try {
            const result = await Authors.findAll({

             attributes: [  
                        'id',
                        'name',
                        [sequelize.fn('COUNT', sequelize.col('books.id')), 'Books_Count']
                
            ],
                include:{model: Books, as: 'books', attributes: []},
                group: ['Authors.id'],
                order: [[Sequelize.literal('"Books_Count"'), 'DESC']],
                limit: 1,
                subQuery: false
            });

            const authorsWithBooksCount = result.map(author => {
                const authorJSON = author.toJSON();
                return {
                    Author_ID: authorJSON.id,
                    Author_Name: authorJSON.name,
                    Books_Count: authorJSON.Books_Count,
                };
            });
    
            console.log("Author with most books ");
            console.table(authorsWithBooksCount);
        } catch (error) {
            console.error('Error fetching authors with book count:', error);
            throw error;
        }
    }
}



AuthorsQueries.getAuthorBooks(1);
AuthorsQueries.getAllAuthorsBooks();
AuthorsQueries.getAllLoansForBook(8);
AuthorsQueries.getAuthorsWithMostBooks();
