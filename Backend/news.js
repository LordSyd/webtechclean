const http = require('https');
let APIKEY = "2a2ccadc1a6b4b00a2bf187119f5ba0d";

let url = "https://newsapi.org/v2/everything?qInTitle=food&language=en&from=2021-06-18&sortBy=publishedAt&apiKey="+APIKEY;

function getNews() {
    const fs = require('fs');
    fs.stat("news/news.json", function(err, stats){
        let mtime = stats.mtime;
        let date = new Date();

        let addedMTime = mtime.getHours() + 5;
        date.setDate(date.getDate());
        console.log("mtime: "+mtime.getTime());
        console.log("getTime:"+date.getTime());

        if((date.getTime())>(mtime.getTime()+500000)) {
            console.log("works");
            http.get(url, (res) => {
                let body = "";
                res.on("data", (chunk) => {
                    body += chunk;
                });

                res.on("end", () => {
                    try {
                        let news = JSON.parse(body);
                        // do something with JSON
                        //console.log(news);

                        const fs = require('fs');
                        //const data = JSON.stringify(news.articles[Math.floor(Math.random() * 10)]);
                        const data = JSON.stringify(news);
                        fs.writeFile('news/news.json', data, (err) => {
                            if (err) {
                                throw err;
                            }
                            console.log("JSON data is saved.");
                        });

                    } catch (error) {
                        console.log("hier");
                        console.error(error.message);
                    }
                    ;
                });

            }).on("error", (error) => {
                console.error(error.message);
            });
        }


    });



}

module.exports = { getNews };