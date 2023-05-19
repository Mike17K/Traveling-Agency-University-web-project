CREATE DATABASE IF NOT EXISTS WebProjectDb;
USE WebProjectDb;
DROP table IF EXISTS events;
DROP table IF EXISTS reaction;
DROP table IF EXISTS respond;
DROP table IF EXISTS comment;
DROP table IF EXISTS posts;
DROP table IF EXISTS users;
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    password VARCHAR(255),
    icon int not null default 1
);
CREATE TABLE IF NOT EXISTS events (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    description VARCHAR(1000),
    date VARCHAR(255),
    time VARCHAR(255),
    location VARCHAR(255),
    image VARCHAR(255),
    post_id int
);
CREATE TABLE IF NOT EXISTS posts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    description VARCHAR(1000),
    date VARCHAR(255),
    time VARCHAR(255),
    location VARCHAR(255)
);
CREATE TABLE IF NOT EXISTS comment (
    id INT AUTO_INCREMENT PRIMARY KEY,
    content VARCHAR(255),
    post_id INT,
    user_id INT,
    date VARCHAR(255)
);
CREATE TABLE IF NOT EXISTS respond (
    id INT AUTO_INCREMENT PRIMARY KEY,
    comment_id INT,
    respond_id INT
);
CREATE TABLE IF NOT EXISTS reaction (
    id INT AUTO_INCREMENT PRIMARY KEY,
    content VARCHAR(255),
    comment_id INT,
    user_id INT
);
ALTER TABLE events
ADD CONSTRAINT FK_enevts_post FOREIGN KEY (post_id) REFERENCES posts (id);
ALTER TABLE comment
ADD CONSTRAINT FK_comment_post FOREIGN KEY (post_id) REFERENCES posts (id);
ALTER TABLE respond
ADD CONSTRAINT FK_comment_id_respond FOREIGN KEY (comment_id) REFERENCES comment (id);
ALTER TABLE respond
ADD CONSTRAINT FK_respond_id FOREIGN KEY (respond_id) REFERENCES comment (id);
ALTER TABLE reaction
ADD CONSTRAINT FK_comment_id_reaction FOREIGN KEY (comment_id) REFERENCES comment (id);
ALTER TABLE reaction
ADD CONSTRAINT FK_user_id FOREIGN KEY (user_id) REFERENCES users (id);
-- USER PRIVILEGES
ALTER USER 'root' @'localhost' IDENTIFIED BY 'password';
create user 'client1' @'%' identified with mysql_native_password by 'password';
grant all privileges on *.* to 'client1' @'%';
flush privileges;
-- ADD DATA TO TABLES
--    // posts -> id , name , description , location as direction
--    // events -> name as title, image as img , location, discription as organized
-- post 1
INSERT INTO posts (
        id,
        name,
        description,
        date,
        time,
        location
    )
VALUES (
        1,
        "Αίγινα",
        "Υπάρχει πιο γνωστή παραλία από τη δημοτική παραλία της Κολώνας; Ίσως όχι! Και αυτό γιατί βρίσκεται δίπλα στον αρχαιολογικό χώρο της Κολώνας, ένα από τα must-see  του νησιού. Σε πολύ κοντινή απόσταση από το λιμάνι (500 μέτρα με τα πόδια), με φυσική σκιά, μη οργανωμένη και αβαθής, αποτελεί την τέλεια επιλογή για μονοήμερη εξόρμηση που συνδυάζει μπάνιο, πολιτισμό και καλό φαγητό.",
        null,
        null,
        "Δυτικά του νησιού"
    );
INSERT INTO events (
        id,
        name,
        description,
        date,
        time,
        location,
        image,
        post_id
    )
VALUES (
        1,
        "Κολώνα",
        "Μη οργανωμένη",
        null,
        null,
        "Στο κέντρο της Αίγινας",
        "https://weloveaegina.com/wp-content/uploads/2017/04/DSC_6189-1199x800.jpg",
        1
    );
-- post 2
INSERT INTO posts (
        id,
        name,
        description,
        date,
        time,
        location
    )
VALUES (
        2,
        "Αίγινα",
        "Δύο από τις πιο κρυμμένες κι άγνωστες παραλίες της Αίγινας, στο πιο απομακρυσμένο σημείο του χάρτη στα 12,5 χλμ από το λιμάνι στην Ανατολική πλευρά του νησιού, είναι οι Πόρτες.    Οι συγκεκριμένες παραλίες προσφέρουν την ησυχία που αποζητάς, μακριά από την πολυκοσμία και το θόρυβο, ενώ είναι το ιδανικό μέρος για εσένα που θέλεις να απολαύσεις το μπάνιο σου χωρίς να σε ενοχλήσει κανένας.    Με λίγα σπιτάκια γύρω από την παραλία, πρασινάδα, άμμο ή βότσαλο, το πιθανότερο είναι ότι θα συναντήσεις οικογένειες που διαμένουν στο χωριό και μόνο αυτές. Βάλε τα βατραχοπέδιλά σου και ξανοίξου στα βαθιά. Έπειτα βιβλίο, φιλοσοφικές αναζητήσεις, ξάπλες και όταν το στομάχι γουργουρίσει βουρ σε τοπικό μεζεδοπωλείο για ένα ουζάκι με φρέσκο χταποδάκι. Εναλλακτικά, εάν έχεις όρεξη για λίγη οδήγηση στην ενδοχώρα της Αίγινας, μία βόλτα μέχρι το Ανιτσαίο για φαγητό θα σε αποζημιώσει.",
        null,
        null,
        "Ανατολικά του νησιού"
    );
INSERT INTO events (
        id,
        name,
        description,
        date,
        time,
        location,
        image,
        post_id
    )
VALUES (
        2,
        "Πόρτες",
        "Μη οργανωμένη",
        null,
        null,
        "24’ από το λιμάνι της Αίγινας",
        "https://weloveaegina.com/wp-content/uploads/2017/04/DSC_6605-1199x800.jpg",
        2
    );
-- post 3
INSERT INTO posts (
        id,
        name,
        description,
        date,
        time,
        location
    )
VALUES (
        3,
        "Αίγινα",
        "Στη βόρεια πλευρά της Αίγινας, στα 10 χλμ από το λιμάνι, βρίσκεται το ψαροχώρι της Σουβάλας, το δεύτερο μεγαλύτερο λιμάνι του νησιού. Πιο οικογενειακός προορισμός, με αμμουδερή παραλία αλλά και βραχώδεις ακτές, ενδείκνυται για ξεκούραση. Όταν έρχεται η ώρα του φαγητού, η Σουβάλα προσφέρει αρκετές επιλογές, από ταβέρνες και ουζερί μέχρι καλά εστιατόρια για πιο ιδιαίτερες προτιμήσεις.    Εκεί που διαφέρει η Σουβάλα από τις άλλες παραλίες του νησιού, είναι στις θερμές πηγές που κάποτε κατείχε. Στην περίφημη παραλία Λουτρά μπορούσε κανείς να κολυμπήσει σε θερμά ιαματικά νερά. Η θειούχα θερμοπηγή θεωρείτο ιδανική για τη θεραπεία ρευματισμών και αρθριτικών, δερματικών και γυναικολογικών παθήσεων.",
        null,
        null,
        "Βόρεια του νησιού"
    );
INSERT INTO events (
        id,
        name,
        description,
        date,
        time,
        location,
        image,
        post_id
    )
VALUES (
        3,
        "Σουβάλα",
        "Οργανωμένη",
        null,
        null,
        "18’ από το λιμάνι της Αίγινας",
        "https://weloveaegina.com/wp-content/uploads/2017/04/DSC_6258.jpg",
        3
    );
-- post 4
INSERT INTO posts (
        id,
        name,
        description,
        date,
        time,
        location
    )
VALUES (
        4,
        "Αίγινα",
        "Εάν ψάχνεις για πραγματική αμμώδη παραλία στην Αίγινα, η Αγία Μαρίνα είναι ο προορισμός σου. Πρόκειται για την πιο γνωστή παραλία της Αίγινας, με τη μεγαλύτερη σε έκταση αμμουδιά (500 μ), ο ορισμός της οργανωμένης παραλίας, ιδανική για θαλάσσια σπορ και οικογένειες.    Χάρη στα αβαθή νερά της προσφέρεται για ώρες διασκέδασης και χαλάρωσης για μικρούς και μεγάλους. Είναι η πιο τουριστική παραλία του νησιού οπότε είναι καλύτερο να την επισκεφθείς εκτός της υψηλής περιόδου. Πέρα όμως από την κεντρική παραλία, υπάρχουν πολλά απομονωμένα κολπάκια για να βουτήξεις από υπέροχα βράχια, να δοκιμάσεις τις δυνάμεις σου στο υποβρύχιο ψάρεμα και να βρεις τη γαλήνη που αποζητάς.",
        null,
        null,
        "Ανατολικά του νησιού"
    );
INSERT INTO events (
        id,
        name,
        description,
        date,
        time,
        location,
        image,
        post_id
    )
VALUES (
        4,
        "Αγία Μαρίνα",
        "Οργανωμένη",
        null,
        null,
        "14 χλμ από το λιμάνι της Αίγινας",
        "https://weloveaegina.com/wp-content/uploads/2017/04/DSC_0477-1208x800.jpg",
        4
    );
-- post 5
INSERT INTO posts (
        id,
        name,
        description,
        date,
        time,
        location
    )
VALUES (
        5,
        "Αίγινα",
        "Η περιοχή του Μαραθώνα διαθέτει δυο παραλίες με αμμουδιά. Ο Μαραθώνας Α΄ βρίσκεται στα μέσα της οδικής διαδρομής Αίγινα-Πέρδικα και ο Μαραθώνας Β’ περίπου 500 μέτρα μετά. Οι δυο αυτές παραλίες της Αίγινας αποτελούν πλέον τις πιο γνωστές παραλίες του νησιού.    Κατά τους καλοκαιρινούς μήνες και οι δύο παραλίες είναι οργανωμένες. Μπορεί κανείς να βρει ξαπλώστρες με ομπρέλες καθώς και μαγαζιά εστίασης. Μικρά σημεία είναι μη οργανωμένα για περιπτώσεις που κάποιος αναζητά μεγαλύτερα κομμάτια με αμμουδιά.",
        null,
        null,
        "Bόρειο τμήμα του νησιού"
    );
INSERT INTO events (
        id,
        name,
        description,
        date,
        time,
        location,
        image,
        post_id
    )
VALUES (
        5,
        "Μαραθώνας",
        "Μη οργανωμένη",
        null,
        null,
        "5 λεπτά από την πόλη της Αίγινας με το αυτοκίνητο",
        "https://aeginaproject.com/wp-content/uploads/2018/11/paralia_marathona-1024x768.jpg",
        5
    );
-- post 6
INSERT INTO posts (
        id,
        name,
        description,
        date,
        time,
        location
    )
VALUES (
        6,
        "Αίγινα",
        "Το νησί Μονή Αίγινας, είναι ένα νησάκι ακριβώς απέναντι από την Πέρδικα. Έχετε αναρωτηθεί ποτέ πώς να πάτε στην Μονή; Η πρόσβαση για το νησί της Μονής,  είναι σχετικά εύκολη. Οδικώς μέχρι την Πέρδικα και από εκεί με το καραβάκι (λάντζα), που φεύγει από το λιμανάκι, φτάνετε στην Μονή.    Υπάρχει και η περίπτωση, κάποιο καραβάκι να φεύγει και από το κεντρικό λιμάνι της Αίγινας. Ο χρόνος μετάβασης βέβαια από την Πέρδικα είναι 10 λεπτά, ενώ από το κέντρο του νησιού περίπου 30 λεπτά. Είναι όμως μια ξεχωριστή εμπειρία και στις δυο περιπτώσεις.",
        null,
        null,
        "Bόρειο τμήμα του νησιού"
    );
INSERT INTO events (
        id,
        name,
        description,
        date,
        time,
        location,
        image,
        post_id
    )
VALUES (
        6,
        "Νησί Μονή",
        "Μη οργανωμένη",
        null,
        null,
        "10’ από το λιμάνι της Αίγινας",
        "https://aeginaproject.com/wp-content/uploads/2018/11/moni-1024x768-600x450.jpg",
        6
    );
-- post 7
INSERT INTO posts (
        id,
        name,
        description,
        date,
        time,
        location
    )
VALUES (
        7,
        "Αίγινα",
        "Η παραλία Σαρπά Αίγινας, είναι από τις πιο δύσβατες αλλά και όμορφες παραλίες του νησιού. Η πρόσβαση στη παραλία του Σαρπά είναι μια περίεργη διαδρομή. Αφού φτάσετε στην Πέρδικα και περάσετε το βενζινάδικο που βρίσκεται εκεί, θα συναντήσετε ένα ανοιχτό γήπεδο μπάσκετ. Κάνοντας αριστερά στο δρόμο, έχει ένα μικρό δρομάκι, που μετά μια μικρή κατηφόρα θα φτάσετε στην παραλία του Σαρπά. Η παραλία φημίζεται για την ηρεμία της, καθώς και για τα πεντακάθαρα νερά της. Η παραλία είναι ανάλογα την περίοδο οργανωμένη και διαθέτει και καντίνα. Η παραλία του Σαρπά είναι σίγουρα από τα καλύτερα σημεία για να δει κάποιος στο νησί κατά τους καλοκαιρινούς μήνες. Το Κτελ πραγματοποιεί δρομολόγιο μέχρι την Πέρδικα.",
        null,
        null,
        "Ανατολικά του νησιού"
    );
INSERT INTO events (
        id,
        name,
        description,
        date,
        time,
        location,
        image,
        post_id
    )
VALUES (
        7,
        "Σαρπά",
        "Μη οργανωμένη",
        null,
        null,
        "10’ από το λιμάνι της Αίγινας",
        "https://aeginaproject.com/wp-content/uploads/2018/11/sarpa-1024x768-1024x768.jpg",
        7
    );