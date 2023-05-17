import { getBeaches as getAl } from '../models/mysql/db_functions.mjs';

export function getBeaches() {
    return getAl();
}
