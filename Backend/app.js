const http = require('http');

let url = "http://www.recipepuppy.com/api/?&i=tomatoes,onions&q=lasagne";

http.get(url,(res) => {
    let body = "";

    res.on("data", (chunk) => {
        body += chunk;
    });

    res.on("end", () => {
        try {
            let recipes = JSON.parse(body);
            // do something with JSON
            console.log(recipes);
        } catch (error) {
            console.log("hier");
            console.error(error.message);
        };
    });

}).on("error", (error) => {
    console.error(error.message);
});