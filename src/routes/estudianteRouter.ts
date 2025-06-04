import express, { Request, Response } from 'express';
import * as estudianteController from '../controllers/estudianteController';
import { Estudiante } from '../models/estudianteModel';
const estudianteRouter = express.Router();

 
estudianteRouter.post('/', async (req: Request, res: Response) => {
    const newEstudiante: Estudiante = req.body;
    estudianteController.create(newEstudiante, (err: Error, result: any) => {
        if (err) {
            return res.status(500).json({ 'message': err.message });
        }
 
        res.status(result.statusCode).json(result);
    });
});
estudianteRouter.get('/', async (req: Request, res: Response) => {
    estudianteController.getAll((err: Error, result: any) => {
        if (err) {
            return res.status(500).json({ 'message': err.message });
        }
 
        res.status(result.statusCode).json(result);
    });
    
});
estudianteRouter.get('/:cod_e', (req: Request, res: Response) => {
  const cod_e = parseInt(req.params.cod_e);

  estudianteController.getOne(cod_e, (err: Error, result: any) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    }

    res.status(result.statusCode).json(result);
  });
});

estudianteRouter.put('/', async (req: Request, res: Response) => {
    const newEstudiante: Estudiante = req.body;
    estudianteController.update(newEstudiante, (err: Error, result: any) => {
        if (err) {
            return res.status(500).json({ 'message': err.message });
        }
 
        res.status(result.statusCode).json(result);
    });
})
estudianteRouter.delete('/:cod_e', (req: Request, res: Response) => {
  const cod_e = parseInt(req.params.cod_e);

  estudianteController.delite_e(cod_e, (err: Error, result: any) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    }

    res.status(result.statusCode).json(result);
  });
});
 
export{estudianteRouter};
 