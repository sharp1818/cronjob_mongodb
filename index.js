const mongoose = require('mongoose');
const { MONGO_URI } = require("./config");
const axios = require('axios').default;
const cheerio = require("cheerio");
const cron = require("node-cron");
mongoose.connect(MONGO_URI, { useNewUrlParser: true });
const { BrakingNew } = require("./models")

//0 */4 * * *
cron.schedule("* * * * * *", async () => {
    console.log('cron job executed!');
    const html = await axios.get("https://cnnespanol.cnn.com/");
    const $ = cheerio.load(html.data);
    const titles = $(".news__title");
    titles.each((index,element) => {
        const breakingNew = {
            title: $(element).text(),
            link: $(element).children().attr("href")
        };
        BrakingNew.create([breakingNew])
    });
});

// const html = axios.get("https://cnnespanol.cnn.com/");
// html.then(xd => {
//     console.log(xd)
// });




