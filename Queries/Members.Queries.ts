import setUpAssociations from "../Configuration/Associations";
import Members from "../Models/Members";
import Books from "../Models/Books";
import Reservations from "../Models/Reservations";
import Loans from "../Models/Loans";
import { Op } from "sequelize";
import Returns from "../Models/Returns";


setUpAssociations();


export namespace MembersQueries {

    // get all Reservations of a person
    export async function getPersonReservations(id: number) {
        try {
            const result = await Reservations.findAll({
                where: { member_id: id },
                include: [
                    {
                        model: Members,
                        as: 'reservationMember',
                        attributes: ['name', 'email']
                    },
                    {
                        model: Books,
                        as: 'reservedBooks',
                        attributes: ['title']
                    }
                ]
            });
    
            const memberReservations = result.map(reservation => {
                const reservationJSON = reservation.toJSON();
                return {
                    Reservation_ID: reservationJSON.id,
                    Book_Title: reservationJSON.reservedBooks.title,
                    Reservation_Date: reservationJSON.reservation_date,
                    Status: reservationJSON.status,
                    Member_Name: reservationJSON.reservationMember.name,
                    Member_Email: reservationJSON.reservationMember.email
                };
            });

            console.log("All reservations of a perosn with ID "+ id);
            console.table(memberReservations);
    
        } catch(Error) {
            console.log(Error);
        }
    }

    // All Loans of a perosn in a duration
    export async function getPersonLoansInDuration(memberId: number, startDate: Date, endDate: Date) {
        try {
            const result = await Loans.findAll({
                include: [
                    { model: Reservations, as: 'loanReservation',
                      where: { member_id: memberId },
                        include: [
                            { model: Members, as: 'reservationMember', attributes: ['name', 'email'] },
                            { model: Books, as: 'reservedBooks',  attributes: ['title'] }
                        ]
                    }
                ],
                where: { loan_date: { [Op.between]: [startDate, endDate] } }
            });
    
            const memberLoans = result.map(loan => {
                const loanJSON = loan.toJSON();
                return {
                    Loan_ID: loanJSON.id,
                    Book_Title: loanJSON.loanReservation.reservedBooks.title,
                    Loan_Date: loanJSON.loan_date,
                    Status: loanJSON.status,
                    Member_Name: loanJSON.loanReservation.reservationMember.name,
                    Member_Email: loanJSON.loanReservation.reservationMember.email
                };
            });
    
            console.log("All Loans of a perosn with ID "+ memberId + " in a duration");
            console.table(memberLoans);
        } catch (error) {
            console.error(error);
        }
    }

    // All Loans  with a specific status of a person
    export async function getLoansOfAPersonByStatus(memberId: number, status: any) {
        try {
            const result = await Loans.findAll({ where: {status: status},
                include: [
                    { model: Reservations, as: 'loanReservation',
                      where: { member_id: memberId },
                        include: [
                            { model: Members, as: 'reservationMember', attributes: ['name'] },
                            { model: Books, as: 'reservedBooks',  attributes: ['title'] }
                        ]
                    }
                ]
            });
    
            const memberLoans = result.map(loan => {
                const loanJSON = loan.toJSON();
                return {
                    Loan_ID: loanJSON.id,
                    Book_Title: loanJSON.loanReservation.reservedBooks.title,
                    Loan_Date: loanJSON.loan_date,
                    Member_Name: loanJSON.loanReservation.reservationMember.name,
                };
            });
            
            console.log(" All "+ status +" Loans of a member with ID "+ memberId );
            console.table(memberLoans);
        } catch (error) {
            console.error(error);
        }
    }


}

MembersQueries.getPersonReservations(5);
MembersQueries.getPersonLoansInDuration(5, new Date('2023-01-01'), new Date('2024-08-01'));
MembersQueries.getLoansOfAPersonByStatus(5, 'Returned');
MembersQueries.getLoansOfAPersonByStatus(3, 'Active');

