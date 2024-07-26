document.addEventListener("DOMContentLoaded", async () => {
    const johtoDex = [
        152, 153, 154, 
        155, 156, 157, 
        158, 159, 160, 
        16, 17, 18, 
        21, 22, 
        163, 164,
        19, 20,
        161, 162,
        172, 25, 26,
        10, 11, 12,
        13, 14, 15,
        165, 166,
        167, 168,
        74, 75, 76,
        41, 42, 169,
        173, 35, 36,
        174, 39, 40,
        175, 176,
        27, 28,
        23, 24,
        206,
        179, 180, 181,
        194, 195,
        92, 93, 94,
        201,
        95, 208,
        69, 70, 71,
        187, 188, 189,
        46, 47,
        61, 62, 63, 186,
        129, 130,
        118, 119,
        79, 80, 199,
        43, 44, 45, 182,
        96, 97,
        63, 64, 65,
        132,
        204, 205,
        29, 30, 31,
        32, 33, 34,
        193, 469,
        191, 192,
        102, 103,
        185,
        202, 
        48, 49,
        123, 212,
        127,
        214,
        109, 110,
        88, 89,
        81, 82, 
        100, 101,
        190, 424,
        209, 210,
        37, 38,
        58, 59,
        234,
        183, 184,
        51, 52,
        56, 57,
        52, 53,
        54, 55,
        66,67,68,
        236,106, 107, 237,
        203,
        128,
        241,
        240, 126,
        238, 124,
        239, 125,
        122,
        235,
        83,
        177, 178,
        211,
        72,73,
        98,99,
        213,
        120,121,
        90,91,
        222,
        223,224,
        170,171,
        86,87,
        108, 463,
        114, 465,
        133,134,135,136,196, 197,
        116,117,230,
        207,
        225,
        220, 221, 473,
        216, 217,
        231, 232,
        226,
        227,
        84, 85,
        77, 78,
        104,105,
        115,
        111, 112,
        198,
        228, 229,
        218, 219,
        215,
        200,
        137, 233,
        113, 242,
        131,
        138, 139,
        140, 141,
        142,
        143,
        1,2,3,
        4,5,6,
        7,8,9,
        144,145,146,
        243,244,245,
        147,148,149,
        246,247,248,
        249, 250,
        150, 151,
        251
    ];

    const pokedex = document.getElementById("pokedex");

    for (let i = 0; i < johtoDex.length; i++) {
        const id = johtoDex[i];
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const pokemon = await response.json();
        displayPokemon(pokemon, i + 1);
    }
});

function displayPokemon(pokemon, dexNumber) {
    const pokedex = document.getElementById("pokedex");
    
    const pokemonElement = document.createElement("div");
    pokemonElement.classList.add("pokemon");
    pokemonElement.setAttribute("data-id", pokemon.id);

    const pokemonNumber = document.createElement("p");
    pokemonNumber.textContent = `#${dexNumber.toString().padStart(3, '0')}`;
    pokemonElement.appendChild(pokemonNumber);

    const pokemonImage = document.createElement("img");
    pokemonImage.src = pokemon.sprites.front_default;
    pokemonElement.appendChild(pokemonImage);

    const pokemonName = document.createElement("h2");
    pokemonName.textContent = capitalizeFirstLetter(pokemon.name);
    pokemonElement.appendChild(pokemonName);

    const pokemonTypes = document.createElement("div");
    pokemonTypes.classList.add("pokemon-types");

    pokemon.types.forEach(type => {
        const typeElement = document.createElement("span");
        typeElement.textContent = capitalizeFirstLetter(type.type.name);
        typeElement.classList.add("pokemon-type", type.type.name);
        pokemonTypes.appendChild(typeElement);
    });

    pokemonElement.appendChild(pokemonTypes);
    pokedex.appendChild(pokemonElement);

    // Adicionar evento de clique
    pokemonElement.addEventListener('click', () => {
        window.location.href = `pokemon.html?id=${pokemon.id}`;
    });
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
