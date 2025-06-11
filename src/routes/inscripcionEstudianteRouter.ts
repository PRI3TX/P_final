import express, { Request, Response } from 'express';
import * as inscribeController from '../controllers/inscribeController';
import * as inscripcionEstudianteController from '../controllers/inscripcionEstudianteController';
import { Inscribe } from '../models/inscribeModel';

const inscripcionEstudianteRouter = express.Router();

// Inscribir una materia → POST /api/inscripcion/inscribir
inscripcionEstudianteRouter.post('/inscribir', (req: Request, res: Response) => {
    const newInscribe: Inscribe = req.body;
    inscribeController.create(newInscribe, (err: Error, result: any) => {
        if (err) return res.status(500).json({ message: err.message });
        res.status(result.statusCode).json(result);
    });
});

// Obtener materias disponibles → GET /api/inscripcion/materias
inscripcionEstudianteRouter.get('/materias', (req: Request, res: Response) => {
    inscripcionEstudianteController.getMateriasDisponibles((err: Error, result: any) => {
        if (err) return res.status(500).json({ message: err.message });
        res.status(result.statusCode).json(result);
    });
});

// Obtener materias inscritas por estudiante → GET /api/inscripcion/inscritas/:cod_e
inscripcionEstudianteRouter.get('/inscritas/:cod_e', (req: Request, res: Response) => {
    const cod_e = parseInt(req.params.cod_e);
    inscripcionEstudianteController.getMateriasInscritas(cod_e, (err: Error, result: any) => {
        if (err) return res.status(500).json({ message: err.message });
        res.status(result.statusCode).json(result);
    });
});

export { inscripcionEstudianteRouter };

