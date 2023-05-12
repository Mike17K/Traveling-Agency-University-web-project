import { getBeaches } from '../config/db_functions.mjs';

export function getBeachesController() {
    return getBeaches();
}
