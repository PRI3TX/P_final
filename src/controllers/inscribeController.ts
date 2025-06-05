import { db } from '../../db';
import { Inscribe } from '../models/inscribeModel';
import { OkPacket } from 'mysql2';

export const create = (inscribe: Inscribe, callback: Function) => {
    // Verificar existencia de profesor
    db.query('SELECT * FROM profesores WHERE id_p = ?', [inscribe.id_p], (err, profResult) => {
        if (err) return callback(err);
        if ((profResult as any[]).length === 0) {
            return callback({ message: 'Profesor no encontrado con id_p: ' + inscribe.id_p });
        }

        // Verificar existencia de asignatura
        db.query('SELECT * FROM asignaturas WHERE cod_a = ?', [inscribe.cod_a], (err, asigResult) => {
            if (err) return callback(err);
            if ((asigResult as any[]).length === 0) {
                return callback({ message: 'Asignatura no encontrada con cod_a: ' + inscribe.cod_a });
            }

            // Verificar existencia del estudiante
            db.query('SELECT * FROM estudiantes WHERE cod_e = ?', [inscribe.cod_e], (err, estResult) => {
                if (err) return callback(err);
                if ((estResult as any[]).length === 0) {
                    return callback({ message: 'Estudiante no encontrado con cod_e: ' + inscribe.cod_e });
                }

                // Verificar que exista el grupo impartido por ese profesor para esa asignatura
                db.query(
                    'SELECT * FROM imparte WHERE id_p = ? AND cod_a = ? AND grupo = ?',
                    [inscribe.id_p, inscribe.cod_a, inscribe.grupo],
                    (err, impResult) => {
                        if (err) return callback(err);
                        if ((impResult as any[]).length === 0) {
                            return callback({
                                message: 'No se encontró grupo impartido por el profesor ' + inscribe.id_p + 
                                         ' en la asignatura ' + inscribe.cod_a + ' con grupo ' + inscribe.grupo
                            });
                        }

                        // Insertar si todo está verificado
                        const queryString = 'INSERT INTO inscribe (cod_e, cod_a, id_p, grupo, n1, n2, n3) VALUES (?, ?, ?, ?, ?, ?, ?)';
                        db.query(
                            queryString,
                            [inscribe.cod_e, inscribe.cod_a, inscribe.id_p, inscribe.grupo, inscribe.n1, inscribe.n2, inscribe.n3],
                            (err) => {
                                if (err) return callback(err);
                                callback(null, {
                                    statusCode: 201,
                                    message: 'Registro en inscribe creado exitosamente',
                                    data: {
                                        cod_e: inscribe.cod_e,
                                        cod_a: inscribe.cod_a,
                                        grupo: inscribe.grupo
                                    }
                                });
                            }
                        );
                    }
                );
            });
        });
    });
};

export const getAll = (callback: Function) => {
    const queryString = 'SELECT * FROM inscribe';
    db.query(queryString, (err, result) => {
        if (err) return callback(err);
        const inscribe = result as Inscribe[];
        callback(null, {
            statusCode: 200,
            message: 'Registros de inscribe obtenidos exitosamente',
            data: inscribe
        });
    });
};

export const getOne = (cod_e: number, callback: Function) => {
    const queryString = 'SELECT * FROM inscribe WHERE cod_e = ?';
    db.query(queryString, [cod_e], (err, result) => {
        if (err) return callback(err);
        const inscribe = result as Inscribe[];
        if (inscribe.length === 0) {
            callback(null, {
                statusCode: 404,
                message: 'Registro de inscripción no encontrado',
                data: null
            });
            return;
        }
        callback(null, {
            statusCode: 200,
            message: 'Registro de inscripción obtenido exitosamente',
            data: inscribe
        });
    });
};

export const update = (inscribe: Inscribe, callback: Function) => {
    const queryString = 'UPDATE inscribe SET n1 = ?, n2 = ?, n3 = ? WHERE cod_e = ? AND cod_a = ? AND id_p = ? AND grupo = ?';
    db.query(
        queryString,
        [inscribe.n1, inscribe.n2, inscribe.n3, inscribe.cod_e, inscribe.cod_a, inscribe.id_p, inscribe.grupo],
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

export const delete_i = (cod_e: number, callback: Function) => {
    const queryString = 'DELETE FROM inscribe WHERE cod_e = ?';
    db.query(queryString, [cod_e], (err) => {
        if (err) return callback(err);
        callback(null, {
            statusCode: 200,
            message: 'Registro eliminado correctamente'
        });
    });
};
