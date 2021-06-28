const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const session = require('express-session');
app.use(session({
    name : 'sessionCookie',
    secret: 'superSecurePw',
    saveUninitialized: true,
    resave: true,
    cookie: {
        sameSite: false, // this may need to be false is you are accessing from another React app
        httpOnly: false // this must be false if you want to access the cookie
    }
}));
let sess;
const port = 8080;

let baseUrl="http://www.recipepuppy.com/api/?";
let str;

let APIKEY = "2a2ccadc1a6b4b00a2bf187119f5ba0d";

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    //res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000/');
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000/');


    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

//TEST FUNCTIONS

app.get('/api/hallo',(req,res)=>{
    sess=req.session;
    if(!sess.username){
        //res.status(401);
        res.sendStatus(401);
        //res.redirect("http://localhost:8080/loginForm");
    }
    else {
        res.sendStatus(200);
        //res.send(`na servas ${sess.username}`);
    }
});

app.post('/delUser_post',(req,res)=>{
    const fs = require('fs');

    let rawdata = fs.readFileSync('user/user.json');
    let user = JSON.parse(rawdata);
    let userName = req.body.del_username;
    let pwd = req.body.del_pwd;
    let worked = false;


    for (let i = 0; i < user.loginList.length; i++) {
        if (user.loginList[i].password === pwd && user.loginList[i].username === userName){
            console.log("to be deleted: "+user.loginList[i]);
            delete user.loginList[i];
            worked = true;
            break;
        }
    }
    if (!worked){
        console.log("fail");
    }

    const jsonStr = JSON.stringify(user);

    //console.log("after del: "+jsonStr);
    fs.writeFile('user/user.json', jsonStr, (err) => {
        if (err) {
            return console.log(err);
        }
        console.log("JSON data is saved.");
        //response.redirect("http://localhost:8080/loginForm");
    });

});

app.get('/api/user',(req,res)=>{
    const fs = require('fs');

    let rawdata = fs.readFileSync('user/user.json');
    let user= JSON.parse(rawdata);
    //console.log(user);
    res.send(user);
});


//WEBSITE CONTENT

app.get('/api/news',(req,res)=>{
    const fs = require('fs');
    const newsFkt = require("./news");
    (async() => {

        await newsFkt.getNews();
        let rawdata = fs.readFileSync('news/news.json');
        let news = JSON.parse(rawdata);
        res.send(news);
    })();

    /*newsFkt.getNews();
    let rawdata = fs.readFileSync('news/news.json');
    let news = JSON.parse(rawdata);
    res.send(news);*/
});

app.get('/api/showSavedRecipes',(req,res)=>{
    sess = req.session;
    let userName = sess.username;
    const fs = require('fs');
    let rawdata = fs.readFileSync('savedRecipes/'+userName+'.json');
    let recipes = JSON.parse(rawdata);
    res.send(recipes);
});

app.delete('/api/deleteSavedRecipes',(req,res)=>{
    sess = req.session;
    let userName = sess.username;

    let TBdelRecipe = req.body;

    const fs = require('fs');

    let rawdata = fs.readFileSync('savedRecipes/'+userName+'.json');
    let savedRec = JSON.parse(rawdata);
    //console.log('savedRecipes/'+userName+'.json');
    //console.log(TBdelRecipe.title);
    //console.log("laenge: "+savedRec.results.length);

    for (let i = 0; i < savedRec.results.length; i++) {
        console.log(savedRec.results[i].title);
        if (savedRec.results[i].title === TBdelRecipe.title){
            console.log("deleting recipe....")
            delete savedRec.results[i];
                console.log("deleted recipe" + `savedRecipes/${userName}.json`);
            break;
        }
    }



    let filtered = savedRec.results.filter(function (el) {
        return el != null;
    });
    console.log(filtered);
    //const jsonStr = filtered;
    let test = {"results": []};

    for (let i = 0; i < filtered.length; i++) {
        test.results.push(filtered[i]);
    }


    //test.results.push(filtered);
    console.log(test);
    const testJson = JSON.stringify(test);

    fs.writeFile('savedRecipes/'+userName+'.json', testJson, (err) => {
        if (err) {
            return console.log(err);
        }
    });

    res.sendStatus(200);
    }
);

app.post('/buildUrl', (req, res) => {
    let ingridients;
    str=req.body.fname;

    let result = str.split(",");


    for (let i = 0; i < result.length; i++) {
        if(i==0){
            baseUrl=baseUrl.concat("i=")
        }
        result[i]=result[i].trim();
        baseUrl=baseUrl.concat(result[i]);
        //only put a ',' if not last ingredient
        if(i<result.length-1) {
            baseUrl = baseUrl.concat(",");
        }
    }


    console.log(baseUrl);
    //console.log(result[1]);
    res.send(`Full URL is: ${baseUrl}`);

});

app.get('/api/rotd',(req,res)=>{
    const fs = require('fs');
    let rawdata = fs.readFileSync('recipes/recipes.json');
    let rotd = JSON.parse(rawdata);
    res.send(rotd);
});

app.post('/api/saveRecipe',(req,res)=>{
    sess = req.session;
    let userName = sess.username;
    const fs = require('fs');
    let data = fs.readFileSync('savedRecipes/'+userName+'.json');
    let savedRecipes = JSON.parse(data);

    //let newRecipe = JSON.stringify(req.body);
    let newRecipe = req.body;

    console.log("body: "+newRecipe);

    console.log("before push: "+data);

    if(!savedRecipes['results'].includes(newRecipe)){
    savedRecipes['results'].push(newRecipe);
    const jsonStr = JSON.stringify(savedRecipes);

    console.log("after push: "+jsonStr);
    console.log(userName);

    fs.writeFile('savedRecipes/'+userName+'.json', jsonStr, (err) => {
        if (err) {
            return console.log(err);
        }
        //console.log("JSON data is saved.");
        //response.redirect("http://localhost:8080/loginForm");
    });}

        res.sendStatus(200);

    }
);


//USERMANAGEMENT

/*app.get('/loginForm', function(request, response){
    response.sendFile('log2_new.html', { root: '.' });
    console.log("loginForm");
});*/

/*app.get('/signUpForm', function(request, response){
    response.sendFile('signUp.html', { root: '.' });
    console.log("signUpForm");
});*/

app.post('/api/signup', function(request, response){
    let uname=request.body.username;
    let email=request.body.email;
    let pwd = request.body.pwd;

    const fs = require('fs');
    let data = fs.readFileSync('user/user.json');
    let allUser = JSON.parse(data);

    console.log("before push: "+data);
    let id = allUser['loginList'].length+1;
    allUser['loginList'].push({id:id,username : uname, email: email, password: pwd});
    const jsonStr = JSON.stringify(allUser);

    console.log("after push: "+jsonStr);
    fs.writeFile('user/user.json', jsonStr, (err) => {
        if (err) {
            return console.log(err);
        }
        //console.log("JSON data is saved.");
        response.sendStatus(200);
    });


    //create saveRecipe json
    // include node fs modul

// writeFile function with filename, content and callback function
    if(uname){
    fs.writeFile('savedRecipes/'+uname+'.json', '{"results": []}', function (err) {
        if (err) throw err;
        console.log('File is created successfully.');
    });
    }

    //console.log(allUser);
    //console.log("username: "+uname +" email: "+email+" password: "+pwd);

});

app.post('/api/login',(req,res)=>{
    sess = req.session;
    const fs = require('fs');
    let rawdata = fs.readFileSync('user/user.json');
    let user = JSON.parse(rawdata);
    let testUser = req.body;


    let userName = req.body.username;
    let pwd = req.body.pwd;
    let worked = false;

    console.log(testUser);
    console.log(pwd);
    console.log(userName);


    for (let i = 0; i < user.loginList.length; i++) {
        if(user.loginList[i]!= null){
        if (user.loginList[i].password === pwd && user.loginList[i].username === userName){
            sess.username = userName;


            res.sendStatus(200)

            worked = true;
            break;
        }
        }
    }
    if (!worked){
        res.sendStatus(401)
    }

});

app.get('/api/logout',(req,res) => {
    req.session.destroy((err) => {
        if(err) {
            return console.log(err);
        }
        res.clearCookie("sessionCookie");
        res.redirect('/loginForm');
    });

});

app.put('/api/changePW/:id/:newPass',(req,res)=>{
    const fs = require('fs');

    let rawdata = fs.readFileSync('user/user.json');
    let user = JSON.parse(rawdata);
    console.log("id: "+req.params.id+"newPW: "+req.params.newPass);
    for (let i = 0; i < user.loginList.length; i++) {
        if (user.loginList[i].id == req.params.id){
            user.loginList[i].pwd = req.params.newPass;
            break;
        }
    }


    const jsonStr = JSON.stringify(user);
    fs.writeFile('user/user.json', jsonStr, (err) => {
        if (err) {
            return console.log(err);
        }
    });

    res.send(user);
});

app.put('/api/pwdChange',(req,res)=>{
    const fs = require('fs');

    let oldPwd=req.body.username;
    let pwd = req.body.pwd;

    let rawdata = fs.readFileSync('user/user.json');
    let user = JSON.parse(rawdata);

    console.log("oldPWD: "+oldPwd+"newPW: "+pwd);

    for (let i = 0; i < user.loginList.length; i++) {
        if(user.loginList[i]!=null){
        if (user.loginList[i].password == oldPwd){
            user.loginList[i].password = pwd;
            break;
        }
        }
    }


    const jsonStr = JSON.stringify(user);
    fs.writeFile('user/user.json', jsonStr, (err) => {
        if (err) {
            return console.log(err);
        }
    });

    res.sendStatus(200);
});

app.delete('/api/deleteAcc',(req,res)=>{
    sess = req.session;
    let userName = sess.username;

    const fs = require('fs');

    let rawdata = fs.readFileSync('user/user.json');
    let user = JSON.parse(rawdata);
    console.log("id: "+req.params.id+"newPW: "+req.params.newPass);
    for (let i = 0; i < user.loginList.length; i++) {
        if (user.loginList[i] != null) {


            if (user.loginList[i].username === userName) {
                console.log("deleting user....")
                delete user.loginList[i];
                try {
                    console.log("delete file" + `savedRecipes/${userName}.json`);
                    fs.unlinkSync(`savedRecipes/${userName}.json`);
                } catch (err) {
                    console.log(err);
                }
                break;
            }
        }
    }

    console.log(user);


    const jsonStr = JSON.stringify(user);
    fs.writeFile('user/user.json', jsonStr, (err) => {
        if (err) {
            return console.log(err);
        }
    });

    req.session.destroy((err) => {
        if(err) {
            return console.log(err);
        }
        //res.clearCookie("sessionCookie");
    });

    res.sendStatus(200);
});

app.delete('/api/delUser/:id',(req,res)=>{
    const fs = require('fs');

    let rawdata = fs.readFileSync('user/user.json');
    let user = JSON.parse(rawdata);
    let userName = req.body.del_username;
    let pwd = req.body.del_pwd;

    delete user.loginList[req.params.id];

    const jsonStr = JSON.stringify(user);



    console.log("after del: "+jsonStr);
    fs.writeFile('user/user.json', jsonStr, (err) => {
        if (err) {
            return console.log(err);
        }
    });





    res.send(user);
});

//START SERVER

app.listen(port, () => {
    console.log(`Server running on port${port}`);
});