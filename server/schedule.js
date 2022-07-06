const puppeteer = require('puppeteer');
const Info = require('./mongodb/models/info_module.js');

// const fs = require('fs');
// const saveData = (data) => {
//     const newDataJSON = JSON.stringify(data);
//     fs.writeFileSync(__dirname + '/dataJSON.json', newDataJSON, 'utf-8');
// }

const runPuppeteer = async () => {
    console.log("RUN!!!!!!");
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    const continents = [
        'asia',
        'africa',
        'oceania',
        'europe',
        'north-america',
        'south-america'
    ];

    const object = {};

    for (let continent of continents) {
        const countryArr = [];

        await page.goto(`https://folkcloud.com/folk-music/${continent}`);
        const countriesHrefs = await page.$$eval('.fadeCountryCell > span > a', as => as.map(a => a.href));

        for (let i = 0; i < 1 && i < countriesHrefs.length; i++) {
            const countryName = countriesHrefs[i].split("/").pop();
            await page.goto(countriesHrefs[i]);
            const englishBody = await page.$$eval('h1 ~ div:not([class])', el => el.map(div => div.innerText));
            const paragraphs = englishBody.filter(p => p !== '\n');
            const songsHrefs = await page.$$eval('a.GridLink', as => as.map(a => a.href));
            const songs = [];
            for (let j = 0; j < 1 && j < songsHrefs.length; j++) {
                await page.goto(songsHrefs[j]);
                const songMp3 = await page.$$eval('[value^="https"][value$=".mp3"]', el => el.map(input => input.value));
                const imgs = await page.$$eval('.img-responsive', el => el.map(img => img.src));
                const img = imgs.find(el => el.includes('images/artists'));
                const sName = await page.$$eval('[itemprop="name"]', el => el.map(span => span.innerText));
                const aName = await page.$$eval('[itemprop="creator"]', el => el.map(span => span.innerText));
                songs.push({
                    songName: sName[0],
                    songArtist: aName[0],
                    songPath: songMp3[0],
                    imgPath: img,
                    like: 0,
                    dislike: 0,
                });
            }

            countryArr.push({
                englishCountryName: countryName,
                englishBody: paragraphs,
                songsList: songs
            });
        }
        object[continent] = countryArr;
    }
    const info = new Info(object);
    await info.save();

    console.log("DONE!!!!!!");
    await browser.close();
}

module.exports = {
    runPuppeteer
}



    // mix two audio files with ffmpeg:
    // new ffmpeg({ source: 'https://folkcloud.com/uploads/Afghanistan/22638120-fc3b-4958-bf17-f08872d54883.mp3' })
    //     .addInput('https://folkcloud.com/uploads/Afghanistan/9e5e475f-8473-4055-8adc-a956667a8545.mp3')
    //     .complexFilter('amix')
    //     .on('end', () => console.log("DONE!"))
    //     .saveToFile('./new.mp3')



// hackathonmusictogether@gmail.com
// mongo_user_name: musictogether
// passwords: 1q2w3e!Q!
// mongodb+srv://musictogether:<password>@music-together.efqwjnw.mongodb.net/?retryWrites=true&w=majority


