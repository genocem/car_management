import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabaseAsync('carDB');

const currency = "DT";


export const initDB = async () => {
    try {
        (await db).execAsync(`
        CREATE TABLE IF NOT EXISTS voiture (
            matricule VARCHAR(20) PRIMARY KEY,
            nomProprietere TEXT,
            kilometrageTotale INTEGER,
            deletionDate DATE DEFAULT NULL
        );
        CREATE TABLE IF NOT EXISTS assurance (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            matricule VARCHAR(20),
            nom TEXT,
            dateAssurance DATE,
            prixAssurance INTEGER,
            dateFin DATE,
            FOREIGN KEY (matricule) REFERENCES voiture(matricule) on delete cascade
        );
        CREATE TABLE IF NOT EXISTS entretienKilometre (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            matricule VARCHAR(20),
            nom TEXT,
            kilometrageOld INTEGER,
            limiteKilometre INTEGER,
            FOREIGN KEY (matricule) REFERENCES voiture(matricule) on delete cascade
        );
        CREATE TABLE IF NOT EXISTS entretienDate (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            matricule VARCHAR(20),
            nom TEXT,
            date1 DATE,
            date2 DATE,
            FOREIGN KEY (matricule) REFERENCES voiture(matricule) on delete cascade
        );
        CREATE TABLE IF NOT EXISTS consommationGazoile (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            quantiteCarburant INTEGER,
            date DATE,
            kilometrage INTEGER,
            matricule VARCHAR(20),
            prix INTEGER,
            FOREIGN KEY (matricule) REFERENCES voiture(matricule) on delete cascade
        );
        CREATE TABLE IF NOT EXISTS kilometrage (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            matricule VARCHAR(20),
            date DATE,
            kilometrageOld INTEGER,
            kilometrageAjouter INTEGER,
            FOREIGN KEY (matricule) REFERENCES voiture(matricule) on delete cascade
        );
        CREATE TRIGGER IF NOT EXISTS addKilometre
        AFTER INSERT ON kilometrage
        BEGIN
            UPDATE voiture
            SET kilometrageTotale = kilometrageTotale + NEW.kilometrageAjouter
            WHERE matricule = NEW.matricule;
        END;
        `);
        console.log("Database initialised");
    } catch (error) {
        console.error("Failed to initialise database:", error);
    }
}

// functions to manipulate the car table

export const getVoitures = async (setEntries) => {

    const fetchedtables = await (await db).getFirstAsync('SELECT name FROM sqlite_master WHERE type="table"');

    if (!fetchedtables) {
        initDB();
    }

    const fetchedEntries = [];
    for await (const row of (await db).getEachAsync('SELECT * FROM voiture where deletionDate is null')) {
        fetchedEntries.push({
            matricule: row.matricule,
            nomProprietere: row.nomProprietere,
            kilometrageTotale: row.kilometrageTotale
        });
    }
    setEntries(fetchedEntries);
}

export const softDeleteCarEntry = async (matricule) => {
    try {
        (await db).runAsync('UPDATE voiture SET deletionDate =  DATE() WHERE matricule = ? AND deletionDate IS NULL',
            [matricule]
        );
    } catch (error) {
        console.error("Failed to delete entry:", error);
    }
}
export const restoreCarEntry = async (matricule) => {
    try {
        (await db).runAsync('UPDATE voiture SET deletionDate = NULL WHERE matricule = ? AND deletionDate IS NOT NULL',
            [matricule]
        );
    } catch (error) {
        console.error("Failed to delete entry:", error);
    }
}
export const deleteIfSoftDeleted30Days = async () => {
    try {
        (await db).runAsync('DELETE FROM voiture WHERE deletionDate IS NOT NULL AND deletionDate < DATE() - 30');
    } catch (error) {
        console.error("Failed to delete entry:", error);
    }
}

export const deleteCarEntry = async (matricule) => {
    try {
        (await db).runAsync('DELETE FROM voiture WHERE matricule = ?', [matricule]);
    } catch (error) {
        console.error("Failed to delete entry:", error);
        restoreCarEntry(matricule);
    }
}

export const AddCarDB = async (nomProprietere, matricule, kilometrageTotale) => {
    const CarExist = await (await db).getFirstAsync('SELECT nomProprietere FROM voiture WHERE matricule=?', [matricule]);
    if (CarExist) {
        console.log("Car already exist");
        restoreCarEntry(matricule);
    }
    else {
        (await db).runAsync('INSERT INTO voiture (nomProprietere, matricule, kilometrageTotale) VALUES (?, ?, ?)', [nomProprietere, matricule, kilometrageTotale]);
    }
};
// functions to manipulate the rest of the tables


export const getTable = async (setEntries, Tname, matricule) => {
    const fetchedEntries = [];
    try {
        for await (const row of (await db).getEachAsync('SELECT * FROM ' + Tname + ' WHERE matricule = ?', [matricule])) {

            console.log(Tname)
            if (Tname === 'consommationGazoile') {
                fetchedEntries.push({
                    id: row.id,
                    name: row.date,
                    name2: "quantite carburant: " + row.quantiteCarburant,
                    name3: "prix: " + row.prix + " " + currency,
                });
            }
            else if (Tname === 'kilometrage') {
                fetchedEntries.push({
                    id: row.id,
                    name: row.date,
                    name2: "kilometrage ajouter: " + row.kilometrageAjouter,
                });
            }
            else if (Tname === 'entretienKilometre') {
                fetchedEntries.push({
                    id: row.id,
                    name: row.nom,
                    name2: "limiteKilometre: " + row.limiteKilometre,
                });
            }
            else if (Tname === 'entretienDate') {
                fetchedEntries.push({
                    id: row.id,
                    name: row.nom,
                    name2: "Date ajout: " + row.date1,
                    name3: "Date Fin: " + row.date2,
                });
            }
            else {
                fetchedEntries.push({
                    id: row.id,
                    name: row.nom,
                    name2: "prix Assurance: " + row.prixAssurance + "" + currency,
                    name3: "Date Fin: " + row.dateFin,
                });
            }
            console.log(row);
        }
        setEntries(fetchedEntries);
    }
    catch (error) {
        console.error("Failed to get entries:", error);
    }
}

export const getKillometrage = async (matricule, setKilometrageOld) => {
    // there is only ine row with the matricule
    for await (const row of (await db).getEachAsync('SELECT kilometrageTotale FROM voiture WHERE matricule = ?', [matricule])) {
        setKilometrageOld(row.kilometrageTotale);
    }
}

export const deleteTableEntry = async (Tname, id) => {
    try {
        (await db).runAsync('DELETE FROM ' + Tname + ' WHERE id = ? ', [id]);
    } catch (error) {
        console.error("Failed to delete entry:", error);
    }
}


export const AddAssurance = async (matricule, nom, dateAssurance, dateFin, prixAssurance) => {
    (await db).runAsync('INSERT INTO assurance (matricule, nom, dateAssurance, dateFin, prixAssurance) VALUES (?, ?, ?, ?, ?)', [matricule, nom, dateAssurance, dateFin, prixAssurance]);
}

export const AddEntretienKilometre = async (matricule, nom, kilometrageOld, limiteKilometre) => {
    (await db).runAsync('INSERT INTO entretienKilometre (matricule, nom, kilometrageOld, limiteKilometre) VALUES (?, ?, ?, ?)', [matricule, nom, kilometrageOld, limiteKilometre]);
}

export const AddEntretienDate = async (matricule, nom, date1, date2) => {
    await (await db).runAsync(
        'INSERT INTO entretienDate (matricule, nom, date1, date2) VALUES (?, ?, ?, ?)',
        [matricule, nom, date1, date2]
    );
}

export const AddConsommationGazoile = async (quantiteCarburant, date, kilometrage, matricule, prix) => {
    (await db).runAsync('INSERT INTO consommationGazoile (quantiteCarburant, date, kilometrage, matricule, prix) VALUES (?, ?, ?, ?, ?)', [quantiteCarburant, date, kilometrage, matricule, prix]);
}

export const AddKilometrage = async (matricule, date, kilometrageOld, kilometrage) => {
    (await db).runAsync('INSERT INTO kilometrage (matricule, date, kilometrageOld, kilometrageAjouter) VALUES (?, ?, ?, ?)', [matricule, date, kilometrageOld, kilometrage]);
}



// the next part here is used to manage and see database contents 
//cause it is hard to get the sqlite file and modify it using the emulator 

//trigger script for future reference
// CREATE TRIGGER IF NOT EXISTS addKilometre
// AFTER INSERT ON kilometrage
// BEGIN
//     UPDATE voiture
//     SET kilometrageTotale = kilometrageTotale + NEW.kilometrageAjouter
//     WHERE matricule = NEW.matricule;
// END;

export const script = async () => {
    try {
        (await db).execAsync(`
            DROP TABLE IF EXISTS assurance;
CREATE TABLE assurance (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    matricule VARCHAR(20),
    nom TEXT,
    dateAssurance DATE,
    prixAssurance INTEGER,
    dateFin DATE,
    FOREIGN KEY (matricule) REFERENCES voiture(matricule)
);
        `);
        console.log("script done");
    }
    catch (error) {
        console.error("Failed :", error);
    }
}

export const getColumns = async () => {
    const fetchedEntries = [];
    console.log('taburu  \n');
    for await (const row of (await db).getEachAsync('PRAGMA table_info(assurance)')) {

        fetchedEntries.push({
            name: row.name
        });
        console.log(row);
    }
}
export const getTableContents = async () => {
    const fetchedEntries = [];
    console.log('taburu  \n');
    for await (const row of (await db).getEachAsync('SELECT * FROM entretienKilometre ')) {

        fetchedEntries.push({
            name: row.name
        });
        console.log(row);
    }
}
export default db;