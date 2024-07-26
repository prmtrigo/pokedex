const regionalDexMap = {
    1: 152, 2: 153, 3: 154, 
    4: 155, 5: 156, 6: 157, 
    7: 158, 8: 159, 9: 160, 
    10: 16, 11: 17, 12: 18, 
    13: 21, 14: 22, 
    15: 163, 16: 164,
    17: 19, 18: 20,
    19: 161, 20: 162,
    21: 172, 22: 25, 23: 26,
    24: 10, 25: 11, 26: 12,
    27: 13, 28: 14, 29: 15,
    30: 165, 31: 166,
    32: 167, 33: 168,
    34: 74, 35: 75, 36: 76,
    37: 41, 38: 42, 39: 169,
    40: 173, 41: 35, 42: 36,
    43: 174, 44: 39, 45: 40,
    46: 175, 47: 176,
    48: 27, 49: 28,
    50: 23, 51: 24,
    52: 206,
    53: 179, 54: 180, 55: 181,
    56: 194, 57: 195,
    58: 92, 59: 93, 60: 94,
    61: 201,
    62: 95, 63: 208,
    64: 69, 65: 70, 66: 71,
    67: 187, 68: 188, 69: 189,
    70: 46, 71: 47,
    72: 61, 73: 62, 74: 63, 75: 186,
    76: 129, 77: 130,
    78: 118, 79: 119,
    80: 79, 81: 80, 82: 199,
    83: 43, 84: 44, 85: 45, 86: 182,
    87: 96, 88: 97,
    89: 63, 90: 64, 91: 65,
    92: 132,
    93: 204, 94: 205,
    95: 29, 96: 30, 97: 31,
    98: 32, 99: 33, 100: 34,
    101: 193, 102: 469,
    103: 191, 104: 192,
    105: 102, 106: 103,
    107: 185,
    108: 202, 
    109: 48, 110: 49,
    111: 123, 112: 212,
    113: 127,
    114: 214,
    115: 109, 116: 110,
    117: 88, 118: 89,
    119: 81, 120: 82, 
    121: 100, 122: 101,
    123: 190, 124: 424,
    125: 209, 126: 210,
    127: 37, 128: 38,
    129: 58, 130: 59,
    131: 234,
    132: 183, 133: 184,
    134: 51, 135: 52,
    136: 56, 137: 57,
    138: 52, 139: 53,
    140: 54, 141: 55,
    142: 66, 143: 67, 144: 68,
    145: 236, 146: 106, 147: 107, 148: 237,
    149: 203,
    150: 128,
    151: 241,
    152: 240, 153: 126,
    154: 238, 155: 124,
    156: 239, 157: 125,
    158: 122,
    159: 235,
    160: 83,
    161: 177, 162: 178,
    163: 211,
    164: 72, 165: 73,
    166: 98, 167: 99,
    168: 213,
    169: 120, 170: 121,
    171: 90, 172: 91,
    173: 222,
    174: 223, 175: 224,
    176: 170, 177: 171,
    178: 86, 179: 87,
    180: 108, 181: 463,
    182: 114, 183: 465,
    184: 133, 185: 134, 186: 135, 187: 136, 188: 196, 189: 197,
    190: 116, 191: 117, 192: 230,
    193: 207,
    194: 225,
    195: 220, 196: 221, 197: 473,
    198: 216, 199: 217,
    200: 231, 201: 232,
    202: 226,
    203: 227,
    204: 84, 205: 85,
    206: 77, 207: 78,
    208: 104, 209: 105,
    210: 115,
    211: 111, 212: 112,
    213: 198,
    214: 228, 215: 229,
    216: 218, 217: 219,
    218: 215,
    219: 200,
    220: 137, 221: 233,
    222: 113, 223: 242,
    224: 131,
    225: 138, 226: 139,
    227: 140, 228: 141,
    229: 142,
    230: 143,
    231: 1, 232: 2, 233: 3,
    234: 4, 235: 5, 236: 6,
    237: 7, 238: 8, 239: 9,
    240: 144, 241: 145, 242: 146,
    243: 243, 244: 244, 245: 245,
    246: 147, 247: 148, 248: 149,
    249: 246, 250: 247,
    251: 248
};

window.addEventListener('DOMContentLoaded', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const pokemonId = parseInt(urlParams.get('id'));

    if (pokemonId) {
        try {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
            const pokemon = await response.json();
            
            // Encontrar o número da Regional Dex usando o mapeamento
            const regionalNumber = Object.keys(regionalDexMap).find(key => regionalDexMap[key] === pokemonId);

            if (!regionalNumber) {
                document.getElementById('pokemon-name').textContent = 'Pokémon não encontrado';
                return;
            }
            
            document.getElementById('pokemon-name').textContent = capitalizeFirstLetter(pokemon.name);
            document.getElementById('pokemon-image').src = pokemon.sprites.front_default;
            document.getElementById('pokemon-number').textContent = `#${regionalNumber}`;
            
            // Exibir tipos
            const typesContainer = document.getElementById('pokemon-types');
            typesContainer.innerHTML = '' + pokemon.types.map(typeInfo => {
                return `<span class="pokemon-type ${typeInfo.type.name}">${capitalizeFirstLetter(typeInfo.type.name)}</span>`;
            }).join(' ');

            // Exibir habilidades
            const abilitiesContainer = document.getElementById('pokemon-abilities');
            abilitiesContainer.innerHTML = 'Abilities: ' + pokemon.abilities.map(abilityInfo => {
                return `<span class="pokemon-ability">${capitalizeFirstLetter(abilityInfo.ability.name)}</span>`;
            }).join(' ');

            // Exibir status
            const statsContainer = document.getElementById('pokemon-stats');
            statsContainer.innerHTML = 'Status: ' + pokemon.stats.map(statInfo => {
                const statName = capitalizeFirstLetter(statInfo.stat.name);
                const statValue = statInfo.base_stat;
                const barWidth = Math.min(statValue / 2, 100); // Ajustar a largura da barra (100% é o máximo)
                return `
                    <div class="pokemon-stat">
                        ${statName}: ${statValue}
                        <div class="stat-bar-container">
                            <div class="stat-bar" style="width: ${barWidth}%">${statValue}</div>
                        </div>
                    </div>
                `;
            }).join(' ');

            // Configurar navegação
            const currentIndex = parseInt(regionalNumber);
            const previousIndex = (currentIndex > 1) ? currentIndex - 1 : 251; // Ajuste o número máximo se necessário
            const nextIndex = (currentIndex < 251) ? currentIndex + 1 : 1; // Ajuste o número mínimo se necessário

            const previousId = regionalDexMap[previousIndex];
            const nextId = regionalDexMap[nextIndex];

            document.getElementById('previous-link').href = `pokemon.html?id=${previousId}`;
            document.getElementById('next-link').href = `pokemon.html?id=${nextId}`;
        } catch (error) {
            console.error('Erro ao buscar Pokémon:', error);
            document.getElementById('pokemon-name').textContent = 'Erro ao carregar Pokémon';
        }
    }
});

// Função para capitalizar a primeira letra
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}