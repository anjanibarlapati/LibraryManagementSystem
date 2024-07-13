import express from 'express';
const app = express();

import sequelize from "./Configuration/db";
import setUpAssociations from './Configuration/Associations';
import authorRoutes from './Routes/Author.Routes';
import memberRoutes from './Routes/Members.Routes';
import bookRoutes from './Routes/Books.Routes';
import loanRoutes from './Routes/Loans.Routes';
import reservationRoutes from './Routes/Reservations.Routes';
import returnRoutes from './Routes/Returns.Routes';



app.use(express.urlencoded({ extended: true }));
app.use(express.json()); 

async function start() {
     try {
        setUpAssociations();
        await sequelize.sync({ alter: true });
        console.log("Synchronised models successfully");
       //await sequelize.drop();

     } catch(Error: any) {
        console.log("Synchronising models failed", Error);
     }
}
start();

// // // Ping route
// app.use('/api/ping', ((req, res) => {  
//     res.json({ message: 'pong' });
// }));

app.use('/',authorRoutes);

app.use('/', memberRoutes);

app.use('/', bookRoutes);

app.use('/', loanRoutes);

app.use('/', reservationRoutes);

app.use('/', returnRoutes);


const PORT = process.env.Port || 4321;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

