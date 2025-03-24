const searchBar = document.getElementById("search-input");
const searchBtn = document.getElementById("search-button");

// SPRITE AND STATS DISPLAY
const pokemonDisplay = document.getElementById("pokemon-display");

const pokemonName = document.getElementById("pokemon-name");
const pokemonId = document.getElementById("pokemon-id");
const weight = document.getElementById("weight");
const height = document.getElementById("height");
const type = document.getElementById("types");
const hp = document.getElementById("hp");
const attack = document.getElementById("attack");
const defense = document.getElementById("defense");
const specialAttack = document.getElementById("special-attack");
const specialDefense = document.getElementById("special-defense");
const speed = document.getElementById("speed");

const pokemonArr = [];
let pokemonMap = new Map(); 

fetch("https://pokeapi-proxy.freecodecamp.rocks/api/pokemon")
  .then((res) => {
    return res.json();
  })
  .then((pokemonData) => {
      pokemonArr.push(...pokemonData.results);
      console.log(pokemonArr);

      pokemonArr.forEach(pokemon => {
        pokemonMap.set(pokemon.id.toString(), pokemon);
        pokemonMap.set(cleanString(pokemon.name), pokemon);
      });
    })
  .catch((error) => console.error("Fetch Error:", error));

const cleanString = (string) => {
  const regex = /[\W-]/g; 
  return string.replace(regex, ""); 
};

const searchPokemon = () => {
  const searchBarInput = cleanString(searchBar.value.toLowerCase());

  const matchPokemon = pokemonMap.get(searchBarInput) || pokemonMap.get(searchBar.value); 
  return matchPokemon || alert("Pokémon not found");
};

const displayPokemon = (matchPokemon) => {
  reset();

  fetch(matchPokemon.url)
  .then((res) => res.json())
  .then((data) => {
    // console.log(data);
    pokemonDisplay.innerHTML += `<img src="${data.sprites.front_default}" id="sprite">`;
    pokemonName.innerHTML = matchPokemon.name;
    pokemonId.innerHTML = matchPokemon.id;

    weight.innerHTML = data.weight;
    height.innerHTML = data.height;
    hp.innerHTML = data.stats[0].base_stat;
    attack.innerHTML = data.stats[1].base_stat;
    defense.innerHTML = data.stats[2].base_stat;
    specialAttack.innerHTML = data.stats[3].base_stat;
    specialDefense.innerHTML = data.stats[4].base_stat;
    speed.innerHTML =  data.stats[5].base_stat;

    for (let i = 0; i <= data.types.length - 1; i++){
      // console.log(data.types[i].type.name);
      type.innerHTML += `<p id="pokemonType">${data.types[i].type.name}</p> `;
    }
    
  })
  .catch((error) => console.error("Fetch Error:", error));
};

const reset = () => {
  weight.innerHTML = "";
  height.innerHTML = "";
  type.innerHTML = "";
  hp.innerHTML = "";
  attack.innerHTML = "";
  defense.innerHTML = "";
  specialAttack.innerHTML = "";
  specialDefense.innerHTML = "";
  speed.innerHTML = "";
};

searchBtn.addEventListener("click", () => {
  const currentPokemon = searchPokemon();
  displayPokemon(currentPokemon);
});