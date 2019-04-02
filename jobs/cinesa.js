const axios = require('axios').default;
const cheerio = require('cheerio');
const os = require('os');

const BASE_URL = 'https://www.cinesa.es';

async function searchAtUrl(url) {
    console.info(`Searching in ${url}...`);
    const { data } = await axios.get(url);
    if (data.horarios && data.horarios.length > 0) {
        return data;
    }

    return false;
}

async function searchAtHome() {
    return searchAtUrl(BASE_URL);
}

async function searchAtPremierePage() {
    return searchAtUrl(`${BASE_URL}/Peliculas/Proximos-Estrenos`);
}

async function searchForMoviePage() {
    const possibleUrls = [
        `${BASE_URL}/Peliculas/Horarios/11395`,
        `${BASE_URL}/Peliculas/Horarios/11490`,
        `${BASE_URL}/Peliculas/Horarios/11490/190/28000`,
    ];
    const results = await Promise.all(possibleUrls.map(searchAtUrl));
    return results.find(Boolean);
}

module.exports = async function() {
    const results = await Promise.all([
        // Let's look at home
        // searchAtHome(),
        // Let's look at the premiere page
        // searchAtPremierePage(),
        // Let's look for an existing movie page
        searchForMoviePage(),
    ]);
    const success = results.find(Boolean);
    return {
        success: !!success,
        matches: results.filter(Boolean),
    };
};
