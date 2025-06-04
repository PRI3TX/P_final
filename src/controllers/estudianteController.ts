import { Estudiante } from '../models/estudianteModel';
import { db } from '../../db';
import { OkPacket, RowDataPacket } from 'mysql2';
 
export const create = (estudiante: Estudiante, callback: Function) => {
    const queryString = 'INSERT INTO estudiantes (cod_e, nom_e, dir_e, tel_e, fech_nac) VALUES (?, ?, ?, ?, ?)';
 
    db.query(
        queryString,
        [estudiante.cod_e, estudiante.nom_e, estudiante.dir_e, estudiante.tel_e, estudiante.fech_nac],
        (err) => {
            if (err) return callback(err); 
 
            callback(null, {
                statusCode: 201,
                message: 'Estudiante creado exitosamente',
                data: {
                    cod_e: estudiante.cod_e
                }
            });
        }
    );
}
export const getAll = (callback: Function) => {
    const queryString = 'SELECT * FROM estudiantes';

    db.query(queryString, (err, result) => {
        if (err) {
            callback(err);
            return;
        }

        const estudiantes = result as Estudiante[];

    callback(null, {
        statusCode: 200,
        message: 'Estudiantes obtenidos exitosamente',
        data: estudiantes
    });
    });

    }
export const getOne = (cod_e: number, callback: Function) => {
    const queryString = 'SELECT * FROM estudiantes WHERE cod_e = ?';
 
    db.query(
        queryString,
        [cod_e],
        (err, result) => {
            if (err) {
                callback(err);
                return;
            }
 
            const estudiantes = result as Estudiante[];
            if (estudiantes.length === 0) {
                callback(null, {
                    statusCode: 404,
                    message: 'Estudiante no encontrado',
                    data: null
                });
                return;
            }
            callback(null, {
                statusCode: 200,
                message: 'Estudiante obtenido exitosamente',
                data: estudiantes
            });
        }
    );
}
export const update = (estudiante: Estudiante, callback: Function) => {
    const queryString = 'UPDATE estudiantes SET nom_e = ?, dir_e = ?, tel_e = ?, fech_nac = ? WHERE cod_e = ?';
 
    db.query(
        queryString,
        [estudiante.nom_e, estudiante.dir_e, estudiante.tel_e, estudiante.fech_nac, estudiante.cod_e],
        (err) => {
            if (err) return callback(err);
 
            callback(null, {
                statusCode: 200,
                message: 'Estudiante actualizado exitosamente',
                data: {
                    cod_e: estudiante.cod_e
                }
            });
        }
    );
}
export const delite_e = (cod_e: number, callback: Function) => {
    const queryString = 'DELETE FROM estudiantes WHERE cod_e = ?';
 
    db.query(
        queryString,
        [cod_e],
        (err) => {
            if (err) return callback(err);
            callback(null, {
                statusCode: 200,
                message: 'Estudiante eliminado exitosamente',
                data: {
                    cod_e: cod_e
                }
            });
        }
    );
}  