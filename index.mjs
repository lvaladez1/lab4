import express from 'express';
import fetch from 'node-fetch';
const planets = (await import('npm-solarsystem')).default;
const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));

app.get('/', async(req, res) => {
    let apiKey = "HyHWUGZuTcPcy1-WqusGh9FC_ZoZmzyn9ZcLNwsuFGU";
    let url = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&featured=true&query=solar-system`;
    
    let response = await fetch(url);
    let data = await response.json();
    let randomImage = data.urls.full;
    res.render('index', {"image":randomImage});
});

app.get('/planet', (req, res) => {
    let planetName = req.query.planetName;
    let planetInfo = planets[`get${planetName}`]();
    console.log(planetInfo);
    res.render('planet', {planetInfo, planetName});
});

app.get('/nasa', async(req, res) => {
    let apiKey = "qdPyIOKtgEpxoLtCKdAe0mVXa9xG4UUeVpG8xGQl";
    let todayDate = new Date().toLocaleDateString('en-CA');
    let url = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${todayDate}`;
    
    let response = await fetch(url);
    let podData = await response.json(); 

    console.log(podData);

    res.render('nasa', {podData});
});

app.listen(3000, () => {
    console.log('server started');
});