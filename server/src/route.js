const express = require('express');
const translate = require('./utils/translate.js');
const route = express.Router();
// const { Router } = require('express');

// ---------------DEMO_ROUTS:---------------
const fs = require('fs');
const loadData = () => {
  const dataJSON = fs.readFileSync(__dirname + '/demo-data.json', 'utf-8');
  return JSON.parse(dataJSON);
};

route.get('/server', async (req, res) => {
  res.send('server is running');
});

route.get('/server/:continent', async (req, res) => {
  try {
    const continent = req.params.continent;
    const data = loadData();
    const allCountries = data[continent].map((el) => el.englishCountryName);

    const lang = req.query.lang === 'ar' ? 'ar' : 'he';

    const allCountriesTranslated = [];
    for (let country of allCountries) {
      const translatedCountry = await translate(country, lang);
      allCountriesTranslated.push({
        countryName: country,
        translate: translatedCountry,
        numOfSongs: 3,
      });
    }

    res.status(200).send(allCountriesTranslated);
  } catch (e) {
    res.status(400).send(e);
  }
});

route.get('/server/:continent/:country', async (req, res) => {
  try {
    const continent = req.params.continent;
    const country = req.params.country;
    const data = loadData();
    const countryObj = data[continent].find(
      (el) => el.englishCountryName === country
    );
    const lang = req.query.lang === 'ar' ? 'ar' : 'he';

    const translateName = await translate(countryObj.englishCountryName, lang);
    const bodyArr = [];
    for (let p of countryObj.englishBody) {
      const translateP = await translate(p, lang);
      bodyArr.push(translateP);
    }
    const countryTranslated = {
      englishCountryName: countryObj.englishCountryName,
      countryName: translateName,
      body: bodyArr,
      songsList: countryObj.songsList,
    };

    res.status(200).send(countryTranslated);
  } catch (e) {
    res.status(400).send(e);
  }
});

module.exports = route;
