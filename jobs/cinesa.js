const axios = require('axios').default;
const cheerio = require('cheerio');
const os = require('os');

const BASE_URL = 'https://www.cinesa.es';

async function searchAtUrl(url) {
    console.info(`Searching in ${url}...`);
    const { data } = await axios.get(url);
    const $page = cheerio(data);

    const keywords = [
        'avengers',
        'vengadores',
        'endgame'
    ];

    const matches = $page.text()
        .split(os.EOL)
        .map(text => text.trim())
        .filter(Boolean)
        .filter(candidate => keywords.some(word => candidate.includes(word)));

    return matches.length > 0;
}

async function searchAtHome() {
    return searchAtUrl(BASE_URL);
}

async function searchAtPremierePage() {
    return searchAtUrl(`${BASE_URL}/Peliculas/Proximos-Estrenos`);
}

async function searchForMoviePage() {
    const possibleUrls = [
        `${BASE_URL}/Peliculas/avengers--endgame`,
        `${BASE_URL}/Peliculas/avengers-endgame`,
        `${BASE_URL}/Peliculas/vengadores--endgame`,
        `${BASE_URL}/Peliculas/vengadores-endgame`,
    ];
    const results = await Promise.all(possibleUrls.map(searchAtUrl));
    return results.includes(true);
}

const cinesa = async function() {
    const results = await Promise.all([
        // Let's look at home
        searchAtHome(),
        // Let's look at the premiere page
        searchAtPremierePage(),
        // Let's look for an existing movie page
        searchForMoviePage(),
    ]);
    return {
        success: results.includes(true),
    };
};

module.exports = cinesa;
