const express = require("express");
const pokemon = require("./data/pokemon.js");
// here is were we start using express to create our rest API
const app = express();
// a variable that points to the file where we have all the pokemon data which is an arry of objects
// we are saving this array in the data variable
const data = require("./data/pokemon.js");
const { pokemonShouldExist } = require("./guards/pokemonShouldExist.js");

// this will allow us to use json
app.use(express.json());

// this is how you set up the app, part of the set up
app.use(function(req, res, next) {
  // setting the response type to json
  res.type("json");
  res.set({
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE" //allowing all the methods
  });

  //calling the next function that we have
  next();
});

//the app starts here

//this function returns all the pokemon
app.get("/pokemon", function(req, res) {
  res.send(data);
});

//returns the pokemon by the requested id
app.get("/pokemon/:id", function(req, res) {
  const pokemon = data.find(e => +e.id === +req.params.id);

  //if the pokemon we request does not exist, we return an error
  if (!pokemon) {
    return res.status(404).send("Pokemon does not exist");
  }

  //but if exists, we will return that pokemon
  res.send(pokemon);
});

//creating a function that will return all attacks for a pokemon by id
app.get("/pokemon/:id/attacks", pokemonShouldExist, function(req, res) {
  res.send(req.pokemon.attacks);
});

app.post("/pokemon", function(req, res) {
  console.log(req.body);
  data.push(req.body);
  res.send(data);
});

app.put("/pokemon/:id", pokemonShouldExist, function(req, res) {
  // We overwrite the old pokemon with a new one
  const newPokemon = req.body;

  // finding the right id
  newPokemon.id = req.params.id;

  //changing the pokemon at the requested id with the new one
  data[req.params.id - 1] = newPokemon;
  res.send(newPokemon);
});

app.delete("/pokemon/:id", pokemonShouldExist, function(req, res) {
  data.splice(+req.params.id - 1, 1);
  res.send(req.pokemon);
});

//using this with Postman to check if everything works and we get back the response,
//it does, when we request get / we get Hello World on Postman
app.get("/", function(req, res) {
  res.send("Hello world");
});

app.listen(3000);
console.log("Listening on port 3000...");
