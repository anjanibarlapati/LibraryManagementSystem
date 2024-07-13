import  {Sequelize}  from 'sequelize';
import dotenv from 'dotenv';
dotenv.config({path: '/Users/admin/Desktop/Sequelize/LMS/Configuration/config.env'});

if (!process.env.DatabaseName || !process.env.Username || !process.env.Password || !process.env.Host) {
    throw new Error('Environment variables are undefined');
}

const sequelize: Sequelize = new Sequelize(
    process.env.DatabaseName,process.env.Username, process.env.Password, {
    host: process.env.Host,
    dialect: 'postgres'
});

(async () => {
    try{
         await sequelize.authenticate();
         console.log("Connection established successfully");
    } catch(Error: any) {
        console.log("Connection failed", Error);
    }
})();

export default sequelize;