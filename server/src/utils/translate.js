const axios = require('axios');
const { RapidAPI_KEY } = require('../../config/password');

const translate = async (text, lang) => {
  const options = {
    method: 'POST',
    url: 'https://microsoft-translator-text.p.rapidapi.com/translate',
    params: {
      to: lang,
      'api-version': '3.0',
      profanityAction: 'NoAction',
      textType: 'plain',
    },
    headers: {
      'content-type': 'application/json',
      'X-RapidAPI-Key': RapidAPI_KEY,
      'X-RapidAPI-Host': 'microsoft-translator-text.p.rapidapi.com',
    },
    data: `[{"Text":"${text}"}]`,
  };

  const data = await axios.request(options);
  return data.data[0].translations[0].text;
};

module.exports = translate;
