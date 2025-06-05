import { db } from '../../db';
import { Imparte } from '../models/imparteModel';
import { OkPacket } from 'mysql2';

export const create = (imparte: Imparte, callback: Function) => {
    // Verificar existencia de id_p en profesor
    db.query('SELECT * FROM profesor WHERE id_p = ?', [imparte.id_p], (err, profResult) => {
        if (err) return callback(err);
        if ((profResult as any[]).length === 0) {
            return callback({ message: 'Profesor no encontrado con id_p: ' + imparte.id_p });
        }

        // Verificar existencia de cod_a en asignatura
        db.query('SELECT * FROM asignatura WHERE cod_a = ?', [imparte.cod_a], (err, asigResult) => {
            if (err) return callback(err);
            if ((asigResult as any[]).length === 0) {
                return callback({ message: 'Asignatura no encontrada con cod_a: ' + imparte.cod_a });
            }

            // Si todo existe, insertamos
            const queryString = 'INSERT INTO imparte (id_p, cod_a, grupo, horario) VALUES (?, ?, ?, ?)';
            db.query(
                queryString,
                [imparte.id_p, imparte.cod_a, imparte.grupo, imparte.horario],
                (err) => {
                    if (err) return callback(err);
                    callback(null, {
                        statusCode: 201,
                        message: 'Registro en imparte creado exitosamente',
                        data: {
                            grupo: imparte.grupo
                        }
                    });
                }
            );
        });
    });
};

export const getAll = (callback: Function) => {
    const queryString = 'SELECT * FROM imparte';
    db.query(queryString, (err, result) => {
        if (err) {
            callback(err);
            return;
        }
        const imparte = result as Imparte[];
        callback(null, {
            statusCode: 200,
            message: 'Registros de imparte obtenidos exitosamente',
            data: imparte
        });
    });
};
export const getOne = (cod_a: number, callback: Function) => {
    const queryString = 'SELECT * FROM imparte WHERE cod_a = ?';
    db.query(queryString, [cod_a], (err, result) => {
        if (err) {
            callback(err);
            return;
        }
        const imparte = result as Imparte[];
        callback(null, {
            statusCode: 200,
            message: 'Registros de imparte obtenidos exitosamente',
            data: imparte
        });
    });
}
export const update = (imparte: Imparte, callback: Function) => {
    const queryString = `
        UPDATE imparte 
        SET horario = ? 
        WHERE id_p = ? AND cod_a = ? AND grupo = ?
    `;

    db.query(
        queryString,
        [imparte.horario, imparte.id_p, imparte.cod_a, imparte.grupo],
        (err, result) => {
            if (err) return callback(err);

            const okPacket = result as OkPacket;
            if (okPacket.affectedRows === 0) {
                return callback({ message: 'No se encontró el registro para actualizar' });
            }

            callback(null, {
                statusCode: 200,
                message: 'Registro actualizado correctamente'
            });
        }
    );
};


export const delite_i= (cod_a: number, callback: Function) => {
    const queryString = 'DELETE FROM imparte WHERE cod_a = ?';
 
    db.query(
        queryString,
        [cod_a],
        (err) => {
            if (err) return callback(err);
            callback(null, {
                statusCode: 200,
                message: 'Estudiante eliminado exitosamente',
                data: {
                    cod_a: cod_a
                }
            });
        }
    );
}