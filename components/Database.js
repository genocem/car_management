import React from 'react';
import Entry from './Entry';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabaseAsync('carDB');

export const getVoitures=  async (setEntries) => {
    const fetchedEntries = [];
    for await (const row of (await db).getEachAsync('SELECT * FROM voiture')) {
        fetchedEntries.push(<Entry key={row.matricule} name={row.nomProprietere} matricule={row.matricule} kilometrage={row.kilometrageTotale} />);
        console.log(row);
    }
    setEntries(fetchedEntries);
}


export const updateDatabase = async (nomProprietere, matricule, kilometrageTotale, dateMiseEnCirculation) => {
    (await db).runAsync('INSERT INTO voiture (nomProprietere, matricule, kilometrageTotale, dateMiseEnCirculation) VALUES (?, ?, ?, ?)', [nomProprietere, matricule, kilometrageTotale, dateMiseEnCirculation]);
  };

export const deleteEntry = async (matricule) => {
    (await db).runAsync('DELETE FROM voiture WHERE matricule = ?', [matricule]);
}
export default db;