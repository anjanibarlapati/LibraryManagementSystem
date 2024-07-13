import express from 'express';
const booksRouter = express.Router();
import  Books  from '../Models/Books';

//  Get all books
booksRouter.get('/allBooks', async (req, res) => {
    try {
        const books = await Books.findAll();
        if (books.length === 0) return res.status(404).json({ message: "No Books Found" });
        res.json({Books: books});
    } catch (err: any) {
        res.status(500).json({message: err.message});
    }   

});

// Get one book by ID
booksRouter.get('/book/:id', async (req, res) => {
    try {
        const book = await Books.findByPk(req.params.id);
        if (book === null) {
            return res.status(404).json({ message: "Book Not Found" });
        }
        res.json(book);
    } catch (err: any) {
        res.status(500).json({message: err.message});
    }
});

//Create books in bulk
booksRouter.post('/booksCreation/', async (req, res) => {
    try {
        const books = await Books.bulkCreate(req.body);
        res.json(books);
    } catch (err: any) {
        res.status(400).json({ message: err.message });
    }
});

// Create a new book
booksRouter.post('/bookCreation', async (req, res) => {
    try {
        const book = await Books.create(req.body);
        res.json(book);
    } catch (err: any) {
        res.status(400).json({message: err.message});
    }
});

// Update a book by ID
booksRouter.put('/book/:id', async (req, res) => {
    try {
        const [updated] = await Books.update(req.body, {where: {id: req.params.id}});
        if (updated) {
            const updatedBook = await Books.findByPk(req.params.id);
            res.json(updatedBook);
        } else {
            res.status(404).json({ message: "Book Not Found" });
        }
    } catch (err: any) {
        res.status(400).json({message: err.message});
    }
});

// Delete a book by ID
booksRouter.delete('/book/:id', async (req, res) => {
    try {
        const deleted = await Books.destroy({where: {id: req.params.id}});
        if (deleted) {
            res.json({ message: "Book Deleted" });
        } else {
            res.status(404).json({ message: "Book Not Found" });
        }
    } catch (err: any) {
        res.status(500).json({message: err.message});
    }
});

export default booksRouter;
 