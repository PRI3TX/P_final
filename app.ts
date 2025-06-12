import * as dotenv from 'dotenv';
import express, { Request, Response } from 'express';
import * as bodyParser from 'body-parser';
import { estudianteRouter} from './src/routes/estudianteRouter';
import { profesorRouter } from './src/routes/profesorRouter';
import { asignaturaRouter } from './src/routes/asignaturaRouter';
import { imparteRouter } from './src/routes/imparteRouter';
import { inscribeRouter } from './src/routes/inscribeRouter';
import {inscripcionEstudianteRouter} from './src/routes/inscripcionEstudianteRouter';
import { registroProfesorRouter } from './src/routes/registroProfesorRouter';
import { db } from './db';
import cors from 'cors';
import path from 'path';




const app = express();
dotenv.config();
 
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));


 
app.get('/', (req, res) => {
    res.type('text/plain');
    res.status(200).send('Welcome!');
});

app.use("/estudiante", estudianteRouter);
app.use("/profesor", profesorRouter);
app.use("/asignatura", asignaturaRouter);
app.use("/imparte", imparteRouter);
app.use('/inscribe',inscribeRouter);
app.use('/api/inscripcion', inscripcionEstudianteRouter);
app.use('/api/profesor', registroProfesorRouter);

 
db.connect((err) => {
    if (err) {
        console.log('Database connection error');
    } else {
        console.log('Database Connected');
    }
});
 
app.use((req: Request, res: Response) => {
    res.status(404).send({ error: 'Not Found', message: 'URL not found' });
});
 
app.listen(process.env.PORT, () => {
    console.log('Node server started running');
    console.log(`Go to http://${process.env.HOST}:${process.env.PORT}`);
});