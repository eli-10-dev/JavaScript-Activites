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

const pokemonType = {
  normal: "rgba(159,161,159,255)",
  fighting: "rgba(255,128,0,255)",
  flying: "rgba(129,185,239,255)",
  poison: "rgba(145,65,203,255)",
  ground: "rgba(145,81,33,255)",
  rock: "rgba(175,169,129,255)",
  bug: "rgba(145,161,25,255)",
  ghost: "rgba(112,65,112,255)",
  steel: "rgba(96,161,184,255)",
  stellar: "rgba(64,181,165,255)",
  fire: "rgba(230,40,41,255)",
  water: "rgba(41,128,239,255)",
  grass: "rgba(63,161,41,255)",
  electric: "rgba(250,192,0,255)",
  psychic: "rgba(239,65,121,255)",
  ice: "rgba(61,206,243,255)",
  dragon: "rgba(80,96,225,255)",
  dark: "rgba(98,77,78,255)",
  fairy: "rgba(239,112,239,255)",
};

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
  fetch(matchPokemon.url)
  .then((res) => res.json())
  .then((data) => {
    // console.log(data);
    pokemonDisplay.innerHTML = `<img src="${data.sprites.front_default}" id="sprite">`;
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

    type.innerHTML = "";


    for (let i = 0; i <= data.types.length - 1; i++){
      // console.log(data.types[i].type.name);
      type.innerHTML += `<p id="pokemonType" style="background-color:${pokemonType[data.types[i].type.name]}">${data.types[i].type.name}</p>`;
    }
  })
  .catch((error) => console.error("Fetch Error:", error));
};

searchBtn.addEventListener("click", () => {
  const currentPokemon = searchPokemon();
  displayPokemon(currentPokemon);
});

searchBar.addEventListener("keypress", (event => {
  if (event.key === "Enter"){
    event.preventDefault();
    searchBtn.click();
  }
}));