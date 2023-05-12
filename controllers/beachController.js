import { getBeaches } from '../config/db_functions.mjs';


export function getBeachController(id) {
    let data = getBeaches();
    data = { ...data, beachtitle: data.title };
    return data;
}

export function getCommentsController(beach_id) {
    const comments = [
        {
            id: 0,
            icon: 2,
            username: 'Mike Kaipis',
            content: 'Υπέροχο νησάκι με πεύκα, ωραία γαλαζοπράσινα νερά κι ένα μικρό beach bar με τις στοιχειώδεις ανέσεις. Η μεγαλύτερη ατραξιόν όμως είναι τα παγώνια και τα ελάφια που πλησιάζουν τον κόσμο χωρίς να φοβούνται. Μοναδική εμπειρία!',
            likes: 3,
            replies: 1,
            date: `5 minutes ago`,
        },
        {
            id: 1,
            icon: 3,
            username: 'George Kaipis',
            content: 'Το νησί πολυ όμορφο η εξυπηρετηση όμως αισχρή.Το προσωπικό αγενέστατο και οι τιμές στον θεό. (15€ για ένα ζευγάρι ξαπλώστρες σε μαγαζί σελφ σέρβις και 10€ για δυο καφέδες). Το τοπίο πολυ όμορφο τα νερά τέλεια αλλά το καταστηματακι άθλιο.',
            likes: 3,
            date: `15 minutes ago`,
            replies: 5,
        }];

    return comments;
}