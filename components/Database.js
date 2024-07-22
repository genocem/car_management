import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabaseAsync('carDB');

export const getVoitures = async (setEntries) => {
    const fetchedEntries = [];
    for await (const row of (await db).getEachAsync('SELECT * FROM voiture')) {
        fetchedEntries.push({
            matricule: row.matricule,
            nomProprietere: row.nomProprietere,
            kilometrageTotale: row.kilometrageTotale
        });
        // console.log(row);
    }
    setEntries(fetchedEntries);
}
export const deleteCarEntry = async (matricule) => {
    try {
        (await db).runAsync('DELETE FROM voiture WHERE matricule = ?', [matricule]);
    } catch (error) {
        console.error("Failed to delete entry:", error);

    }
}

export const AddCarDB = async (nomProprietere, matricule, kilometrageTotale) => {
    (await db).runAsync('INSERT INTO voiture (nomProprietere, matricule, kilometrageTotale) VALUES (?, ?, ?)', [nomProprietere, matricule, kilometrageTotale]);

};

// here the function that will delete the entry based on the type of the entry
export const deleteEntry = async (matricule, table) => {
    try {
        (await db).runAsync('DELETE FROM ? WHERE matricule = ?', [table, matricule]);
    } catch (error) {
        console.error("Failed to delete entry:", error);
    }
}

// export const getTable = async (setEntries, Tname, matricule) => {
//     const fetchedEntries = [];
//     for await (const row of (await db).getEachAsync('SELECT * FROM ? WHERE matricule = ?', [Tname, matricule])) {
//         // diffrent table cannot have the same column name so the .push will just get the first 2 columns of a row
//         fetchedEntries.push({
//             id: row.id,
//             name: row.name,
//         });
//         console.log(row);
//     }
//     setEntries(fetchedEntries);
// }
export const getTable = async (setEntries, Tname, matricule) => {
    const fetchedEntries = [];
    try {
        for await (const row of (await db).getEachAsync('SELECT * FROM ' + Tname + ' WHERE matricule = ?', [matricule])) {

            if (Tname === 'consommationGazoile' || Tname === 'kilometrage ') {
                fetchedEntries.push({
                    id: row.id,
                    name: row.date,
                });

            }
            else {
                fetchedEntries.push({
                    id: row.id,
                    name: row.nom,
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

export const deleteTableEntry = async (Tname, id) => {
    try {
        (await db).runAsync('DELETE FROM ? WHERE id = ?', [Tname, id]);
    } catch (error) {
        console.error("Failed to delete entry:", error);
    }
}

export const AddAssurance = async (matricule, nom, dateAssurance, dureeEnMois, prixAssurance) => {
    (await db).runAsync('INSERT INTO assurance (matricule, nom, dateAssurance, dureeEnMois, prixAssurance) VALUES (?, ?, ?, ?, ?)', [matricule, nom, dateAssurance, dureeEnMois, prixAssurance]);
}

export const getKillometrage = async (matricule, setKilometrageOld) => {
    // there is only ine row with the matricule
    for await (const row of (await db).getEachAsync('SELECT kilometrageTotale FROM voiture WHERE matricule = ?', [matricule])) {
        setKilometrageOld(row.kilometrageTotale);
    }
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

// export const getTables = async (setEntries) => {
//     const fetchedEntries = [];
//     for await (const row of (await db).getEachAsync('SELECT name FROM sqlite_master WHERE type="table" and name not like "voiture"')) {
//         // SELECT name FROM sqlite_master WHERE type='table';

//         fetchedEntries.push({
//             name: row.name
//         });
//         console.log(row);
//     }
//     setEntries(fetchedEntries);
// }




// export const smth = async () => {
//     try {
//         (await db).runAsync('alter table voiture drop column dateMiseEnCirculation');
//     } catch (error) {

//     }    ALTER TABLE assurance RENAME COLUMN voitureMatricule to matricule; 
//ALTER TABLE consommationGazoile RENAME COLUMN voitureMatricule to matricule;
// }
// alter table entretienDate matricule text;
// alter talbe entretienKilometre matricule text;
export const script = async () => {
    try {
        (await db).execAsync(`
            CREATE TABLE kilometrage (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    matricule TEXT NOT NULL,
    date TEXT NOT NULL,
    kilometrageNew INTEGER NOT NULL,
    kilometrageOld INTEGER NOT NULL,
    FOREIGN KEY (matricule) REFERENCES voiture(matricule)
);
        `);
    }
    catch (error) {
        console.error("Failed :", error);
    }
}

export const getColumns = async () => {
    const fetchedEntries = [];
    console.log('taburu  \n');
    for await (const row of (await db).getEachAsync('PRAGMA table_info(entretienKilometre) ')) {
        // SELECT name FROM sqlite_master WHERE type='table';

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
        // SELECT name FROM sqlite_master WHERE type='table';

        fetchedEntries.push({
            name: row.name
        });
        console.log(row);
    }
}
export default db;