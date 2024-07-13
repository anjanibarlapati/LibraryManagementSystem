import express from 'express';
const loansRouter = express.Router();
import  Loans  from '../Models/Loans';
import createLoan from '../Transactions/Loans.Transactions';

//  Get all loans

loansRouter.get('/allLoans', async (req, res) => {
    try {
        const loans = await Loans.findAll();
        if (loans.length === 0) return res.status(404).json({ message: "No Loans Found" });
        res.json({Loans: loans});
    } catch (err: any) {
        res.status(500).json({message: err.message});
    }   

});

// Get one loan by ID
loansRouter.get('/loan/:id', async (req, res) => {
    try {
        const loan = await Loans.findByPk(req.params.id);
        if (loan === null) {
            return res.status(404).json({ message: "Loan Not Found" });
        }
        res.json(loan);
    } catch (err: any) {
        res.status(500).json({message: err.message});
    }
});

// Create a new loan 
loansRouter.post('/loanCreation', async (req, res) => {
    try {
        
        // Transaction 
        const loan = await createLoan(req.body);
        res.json(loan);
    } catch (err: any) {
        res.status(400).json({message: err.message});
    }
});

// Update a loan by ID
loansRouter.put('/loan/:id', async (req, res) => {
    try {
        const [updated] = await Loans.update(req.body, {where: {id: req.params.id}});
        if (updated) {
            const updatedLoan = await Loans.findByPk(req.params.id);
            res.json(updatedLoan);
        } else {
            res.status(404).json({ message: "Loan Not Found" });
        }
    } catch (err: any) {
        res.status(400).json({message: err.message});
    }
});

// Delete a loan by ID
loansRouter.delete('/loan/:id', async (req, res) => {
    try {
        const deleted = await Loans.destroy({where: {id: req.params.id}});
        if (deleted) {
            res.json({ message: "Loan Deleted" });
        } else {
            res.status(404).json({ message: "Loan Not Found" });
        }
    } catch (err: any) {
        res.status(500).json({message: err.message});
    }
});

export default loansRouter;

 