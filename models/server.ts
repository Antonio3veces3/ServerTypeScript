import express, {Application} from "express";
import cors from  'cors';
import userRoutes from '../routes/users.routes';
import db from "../db/connection";

class Server {
    private app: Application;
    private port: string;
    
    private apiPaths = {
        users: '/api/users'
    }

    constructor(){
        this.app = express();
        this.port = process.env.PORT || '8000';
        this.middlewares();
        this.routes();


        //Database
        this.dbConnection();
    }

    async dbConnection(){
        try {
            await db.validate();
            console.log('Database online');
        } catch (error: any) {
            throw new Error(error);
        }
    }

    middlewares(){
        //CORS
        this.app.use(cors());

        //body parser
        this.app.use(express.json());

        //carpeta publica
        this.app.use(express.static('public'));
    }

    routes(){
        

        this.app.use(this.apiPaths.users, userRoutes);
    } 

    listen(){
        this.app.listen( this.port, ()=>{
            console.log(`Server running on port ${this.port}`);
        })
    }
}

export default Server;