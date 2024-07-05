import React from 'react';
import Entry from './Entry';
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
        console.log(row);
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

export const getTables = async (setEntries) => {
    const fetchedEntries = [];
    for await (const row of (await db).getEachAsync('SELECT name FROM sqlite_master WHERE type="table" and name not like "voiture"')) {
        // SELECT name FROM sqlite_master WHERE type='table';

        fetchedEntries.push({
            name: row.name
        });
        console.log(row);
    }
    setEntries(fetchedEntries);
}
// export const smth = async () => {
//     try {
//         (await db).runAsync('alter table voiture drop column dateMiseEnCirculation');
//     } catch (error) {

//     }
// }
export default db;