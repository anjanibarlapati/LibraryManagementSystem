import express from 'express';
import Reservations  from '../Models/Reservations';
const reservationsRouter = express.Router();

//  Get all reservations

reservationsRouter.get('/allReservations', async (req, res) => {
    try {
        const reservations = await Reservations.findAll();
        if (reservations.length === 0) return res.status(404).json({ message: "No Reservations Found" });
        res.json({Reservations: reservations});
    } catch (err: any) {
        res.status(500).json({message: err.message});
    }   

});

// Get one reservation by ID
reservationsRouter.get('/reservation/:id', async (req, res) => {
    try {
        const reservation = await Reservations.findByPk(req.params.id);
        if (reservation === null) {
            return res.status(404).json({ message: "Reservation Not Found" });
        }
        res.json(reservation);
    } catch (err: any) {
        res.status(500).json({message: err.message});
    }
});

//Create reservations in bulk

reservationsRouter.post('/reservationsCreation/', async (req, res) => {
    try {
        const reservationsData = [
            { book_id: 8, member_id: 5, reservation_date: new Date('2024-07-10'), status: 'Active' }
        ];
        const reservations = await Reservations.bulkCreate(reservationsData);
        res.json(reservations);
    } catch (err: any) {
        res.status(400).json({ message: err.message });
    }
});

// Create a new reservation
reservationsRouter.post('/reservationCreation', async (req, res) => {
    try {
        const reservation = await Reservations.create(req.body);
        res.json(reservation);
    } catch (err: any) {
        res.status(400).json({message: err.message});
    }
});

// Update a reservation by ID
reservationsRouter.put('/reservation/:id', async (req, res) => {
    try {
        const [updated] = await Reservations.update(req.body, {where: {id: req.params.id}});
        if (updated) {
            const updatedReservation= await Reservations.findByPk(req.params.id);
            res.json(updatedReservation);
        } else {
            res.status(404).json({ message: "Reservation Not Found" });
        }
    } catch (err: any) {
        res.status(400).json({message: err.message});
    }
});

// Delete a reservation by ID
reservationsRouter.delete('/reservation/:id', async (req, res) => {
    try {
        const deleted = await Reservations.destroy({where: {id: req.params.id}});
        if (deleted) {
            res.json({ message: "Reservation Deleted" });
        } else {
            res.status(404).json({ message: "Reservation Not Found" });
        }
    } catch (err: any) {
        res.status(500).json({message: err.message});
    }
});


export default reservationsRouter;