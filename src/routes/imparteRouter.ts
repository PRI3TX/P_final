import express, { Request, Response } from 'express';
import * as imparteController from '../controllers/imparteControler';
import { Imparte } from '../models/imparteModel';

const imparteRouter = express.Router();

imparteRouter.post('/', async (req: Request, res: Response) => {
  const newImparte: Imparte = req.body;
  imparteController.create(newImparte, (err: Error, result: any) => {
    if (err) {
      return res.status(500).json({ 'message': err.message });
    }
    res.status(result.statusCode).json(result);
  });
});
imparteRouter.get('/', async (req: Request, res: Response) => {
  imparteController.getAll((err: Error, result: any) => {
    if (err) {
      return res.status(500).json({ 'message': err.message });
    }
    res.status(result.statusCode).json(result);
  });
})
imparteRouter.get('/:cod_a', (req: Request, res: Response) => {
  const cod_a = parseInt(req.params.cod_a);
  imparteController.getOne(cod_a, (err: Error, result: any) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    }
    res.status(result.statusCode).json(result);
  });
})

imparteRouter.put('/', async (req: Request, res: Response) => {
  const newImparte: Imparte = req.body;
  imparteController.update(newImparte, (err: Error, result: any) => {
    if (err) {
      return res.status(500).json({ 'message': err.message });
    }
    res.status(result.statusCode).json(result);
  });
})
imparteRouter.delete('/:cod_a', (req: Request, res: Response) => {
  const cod_a = parseInt(req.params.cod_a);
  imparteController.delite_i(cod_a, (err: Error, result: any) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    }
    res.status(result.statusCode).json(result);
  });
});

export { imparteRouter };
