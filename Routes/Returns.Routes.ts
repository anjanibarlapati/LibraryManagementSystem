import express from 'express';
const returnsRouter = express.Router();
import Returns from '../Models/Returns';
import returnBook from '../Transactions/Returns.Transactions';

//  Get all returns

returnsRouter.get('/allReturns', async (req, res) => {
    try {
        const returns = await Returns.findAll();
        if (returns.length === 0) return res.status(404).json({ message: "No Returns Found" });
        res.json({Returns: returns});
    } catch (err: any) {
        res.status(500).json({message: err.message});
    }   

});

// Get one return record by ID
returnsRouter.get('/return/:id', async (req, res) => {
    try {
        const returnRecord = await Returns.findByPk(req.params.id);
        if (returnRecord  === null) {
            return res.status(404).json({ message: "Return Not Found" });
        }
        res.json(returnRecord);
    } catch (err: any) {
        res.status(500).json({message: err.message});
    }
});

// Create a new return
returnsRouter.post('/returnCreation', async (req, res) => {
    try {

        // Transaction
        await returnBook(req.body);
    } catch (err: any) {
        res.status(400).json({message: err.message});
    }
});

// Update a Return Record by ID
returnsRouter.put('/return/:id', async (req, res) => {
    try {
        const [updated] = await Returns.update(req.body, {where: {id: req.params.id}});
        if (updated) {
            const updatedReturnRecord= await Returns.findByPk(req.params.id);
            res.json(updatedReturnRecord);
        } else {
            res.status(404).json({ message: "Return Record Not Found" });
        }
    } catch (err: any) {
        res.status(400).json({message: err.message});
    }
});

// Delete a reservation by ID
returnsRouter.delete('/return/:id', async (req, res) => {
    try {
        const deleted = await Returns.destroy({where: {id: req.params.id}});
        if (deleted) {
            res.json({ message: "Return Record Deleted" });
        } else {
            res.status(404).json({ message: "Return Record Not Found" });
        }
    } catch (err: any) {
        res.status(500).json({message: err.message});
    }
});

export default returnsRouter;