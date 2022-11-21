// const express = require("express");
// const app = express();
const data = require("../data/pokemon.js");

//this function will find the pokemon for us
function pokemonShouldExist(req, res, next) {
  const pokemon = data.find(e => +e.id === +req.params.id);

  if (!pokemon) {
    return res.status(404).send("Pokemon does not exist");
  }

  req.pokemon = pokemon;

  next();
}

module.exports = {
  pokemonShouldExist
};
