import { Imparte } from '../models/imparteModel';
import { db } from '../../db';
import { OkPacket, RowDataPacket } from 'mysql2';

export const create = (imparte: Imparte, callback: Function) => {
    const queryString = 'INSERT INTO impartes (id_p, cod_a, grupo, horario) VALUES (?, ?, ?, ?)';

    db.query(
        queryString,
        [imparte.id_p, imparte.cod_a, imparte.grupo, imparte.horario],
        (err) => {
            if (err) return callback(err);

            callback(null, {
                statusCode: 201,
                message: 'Imparte creado exitosamente',
                data: {
                    id_p: imparte.id_p
                }
            });
        }
    );
}