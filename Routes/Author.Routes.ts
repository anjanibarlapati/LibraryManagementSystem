import express from 'express';
const authorsRouter = express.Router();
import Authors  from '../Models/Authors';

// Get all authors
authorsRouter.get('/allAuthors', async (req, res) => {
    try {
        const authors = await Authors.findAll();
        if (authors.length === 0) return res.status(404).json({ message: "No Authors Found" });
        res.json({Authors: authors});
    } catch (err: any) {
        res.status(500).json({message: err.message});
    }
});

// Get one author by ID
authorsRouter.get('/author/:id', async (req, res) => {
    try {
        const author = await Authors.findByPk(req.params.id);
        if (author === null) {
            return res.status(404).json({ message: "Author Not Found" });
        }
        res.json(author);
    } catch (err: any) {
        res.status(500).json({message: err.message});
    }
});

//Create authors in bulk
authorsRouter.post('/authorsCreation/', async (req, res) => {
    try {
        const authors = await Authors.bulkCreate(req.body);
        res.json(authors);
    } catch (err: any) {
        res.status(400).json({ message: err.message });
    }
});

// Create a new author
authorsRouter.post('/authorCreation/', async (req, res) => {
    try {
        const author = await Authors.create(req.body);
        res.json(author);
    } catch (err: any) {
        res.status(400).json({message: err.message});
    }
});

// Update an author by ID
authorsRouter.put('/author/:id', async (req, res) => {
    try {
        const [updated] = await Authors.update(req.body, {where: {id: req.params.id}});
        if (updated) {
            const updatedAuthor = await Authors.findByPk(req.params.id);
            res.json(updatedAuthor);
        } else {
            res.status(404).json({ message: "Author Not Found" });
        }
    } catch (err: any) {
        res.status(400).json({message: err.message});
    }
});

// Delete an author by ID
authorsRouter.delete('/author/:id', async (req, res) => {
    try {
        const deleted = await Authors.destroy({where: {id: req.params.id}});
        if (deleted) {
            res.json({ message: "Author Deleted" });
        } else {
            res.status(404).json({ message: "Author Not Found" });
        }
    } catch (err: any) {
        res.status(500).json({message: err.message});
    }
});

export default authorsRouter;
