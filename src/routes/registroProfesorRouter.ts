import express, { Request, Response } from 'express';
import * as registroProfesorController from '../controllers/registroProfesorController';
import { Imparte } from '../models/imparteModel';
import { Inscribe } from '../models/inscribeModel';

const registroProfesorRouter = express.Router();

// Registrar materia que va a dictar
registroProfesorRouter.post('/registrar', (req: Request, res: Response) => {
    const data: Imparte = req.body;
    registroProfesorController.registrarMateria(data, (err: Error, result: any) => {
        if (err) return res.status(500).json({ message: err.message });
        res.status(result.statusCode).json(result);
    });
});

// Obtener estudiantes inscritos a sus materias
registroProfesorRouter.get('/estudiantes/:id_p', (req: Request, res: Response) => {
    const id_p = parseInt(req.params.id_p);
    registroProfesorController.getEstudiantesPorProfesor(id_p, (err: Error, result: any) => {
        if (err) return res.status(500).json({ message: err.message });
        res.status(result.statusCode).json(result);
    });
});

// Actualizar notas de estudiante
registroProfesorRouter.put('/notas', (req: Request, res: Response) => {
    const datos: Inscribe = req.body;
    registroProfesorController.editarNotas(datos, (err: Error, result: any) => {
        if (err) return res.status(500).json({ message: err.message });
        res.status(result.statusCode).json(result);
    });
});

export { registroProfesorRouter };
