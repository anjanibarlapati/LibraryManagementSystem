import express from 'express';
import  Members  from '../Models/Members';
const membersRouter = express.Router();

//  Get all members
membersRouter.get('/allMembers', async (req, res) => {
    try {
        const members = await Members.findAll();
        if (members.length === 0) return res.status(404).json({ message: "No Members Found" });
        res.json({Members: members});
    } catch (err: any) {
        res.status(500).json({message: err.message});
    }   

});

// Get one member by ID
membersRouter.get('/member/:id', async (req, res) => {
    try {
        const member = await Members.findByPk(req.params.id);
        if (member === null) {
            return res.status(404).json({ message: "Member Not Found" });
        }
        res.json(member);
    } catch (err: any) {
        res.status(500).json({message: err.message});
    }
});

//Create members in bulk
membersRouter.post('/membersCreation/', async (req, res) => {
    try {
        const members = await Members.bulkCreate(req.body);
        res.json(members);
    } catch (err: any) {
        res.status(400).json({ message: err.message });
    }
});

// Create a new member
membersRouter.post('/memberCreation', async (req, res) => {
    try {  
        const member = await Members.create(req.body);
        res.json(member);
    } catch (err: any) {
        res.status(400).json({message: err.message});
    }
});

// Update a memebr by ID
membersRouter.put('/member/:id', async (req, res) => {
    try {
        const [updated] = await Members.update(req.body, {where: {id: req.params.id}});
        if (updated) {
            const updatedMember = await Members.findByPk(req.params.id);
            res.json(updatedMember);
        } else {
            res.status(404).json({ message: "Member Not Found" });
        }
    } catch (err: any) {
        res.status(400).json({message: err.message});
    }
});

// Delete a member by ID
membersRouter.delete('/member/:id', async (req, res) => {
    try {
        const deleted = await Members.destroy({where: {id: req.params.id}});
        if (deleted) {
            res.json({ message: "Member Deleted" });
        } else {
            res.status(404).json({ message: "Member Not Found" });
        }
    } catch (err: any) {
        res.status(500).json({message: err.message});
    }
});

export default membersRouter;