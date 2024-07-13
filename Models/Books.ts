import { DataTypes } from 'sequelize';
import  sequelize from '../Configuration/db';
import  Authors  from './Authors';

// Creating Books Model

const Books = sequelize.define('Books', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        comment: 'Unique book identifier'
    },
    title: {
        type: DataTypes.STRING(255),
        allowNull: false,
        comment: 'Title of the book'
    },
    authorId: {
        type: DataTypes.INTEGER,
        references: {
            model: Authors,
            key: 'id'
        },
        comment: 'ID of the book\'s author'
    },
    genre: {
        type: DataTypes.STRING(100),
        comment: 'Genre of the book'
    },
    isbn: {
        type: DataTypes.STRING(13),
        unique: true,
        //comment: 'ISBN of the book'
    },
    publication_year: {
        type: DataTypes.INTEGER,
        comment: 'Year the book was published'
    },
    numberOfCopies: {
        type: DataTypes.INTEGER,
        comment: 'Number of copies of the book'
    }
    
}, {  timestamps: false , 
      indexes: [
        {   
            name: 'booksIndex',
            unique: true,
            fields: ['title']
        }
      ]
}
);


export default Books;

