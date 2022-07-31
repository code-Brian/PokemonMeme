const searchBar = document.querySelector('#search');
const pokeCardTemplate = document.querySelector("[data-poke-template]")

searchBar.addEventListener('input', (e) => {
    const value = e.target.value.toLowerCase();
    pokeResults.forEach(pokemon => {
        const isVisible = pokemon.name.includes(value) || pokemon.types[0].type.name
        if (isVisible){
            console.log(`${value} matches with ${pokemon.name} or ${pokemon.types[0].type.name}`)
        }
        console.log(pokemon)
    })
})

let pokeResults = []

let mappedResults = pokeResults.map(obj => {
    let name = obj.name
    let type = obj.types[0].type.name
    return {name: obj.name, type: obj.types[0].type.name, element: card}
})

async function getPokemon(query) {
    let response = await fetch(`https://pokeapi.co/api/v2/${query}`)
    let jsonData = await response.json();
    // console.log(jsonData);
    
    for (let i = 0; i < jsonData.results.length; i++) {
        let currentPokemon = await fetch(jsonData.results[i].url)
        let currentPokemonJSON = await currentPokemon.json()
        
        // console.log(currentPokemonJSON)
        pokeResults.push(currentPokemonJSON)
        
        let shinySprite = currentPokemonJSON.sprites.front_shiny
        // console.log(shinySprite)
        
        let name = `${currentPokemonJSON.name.charAt(0).toUpperCase()}${currentPokemonJSON.name.slice(1)}`
        // console.log(name)
        
        let type = currentPokemonJSON.types[0].type.name
        // console.log(type)
    }
    return pokeResults
}

getPokemon('pokemon?limit=3')
console.log(pokeResults)
console.log(mappedResults)
// console.log('End of file')
