async function getPokemon(query) {
    let response = await fetch(`https://pokeapi.co/api/v2/${query}`)
    let jsonData = await response.json();

    // console.log(jsonData);
    let wrapper = document.querySelector('#responseWrapper')
    
    for(let i = 0; i < jsonData.results.length; i++) {
        let currentPokemon = await fetch(jsonData.results[i].url)
        let currentPokemonJSON = await currentPokemon.json()

        console.log(currentPokemonJSON.name);
        for (let j = 0; j < currentPokemonJSON.abilities.length; j++) {
            console.log(currentPokemonJSON.abilities[j].ability.name);
        }

        let row = document.createElement('tr')
        let imageCell = document.createElement('td')
        let shinySprite = document.createElement('img')
        shinySprite.src = currentPokemonJSON.sprites.front_shiny
        imageCell.appendChild(shinySprite)
        row.appendChild(imageCell)

        let nameCell = document.createElement('td')
        let capitalizedName = `${currentPokemonJSON.name.charAt(0).toUpperCase()}${currentPokemonJSON.name.slice(1)}`

        nameCell.innerText = capitalizedName
        row.appendChild(nameCell)

        let typeCell = document.createElement('td')
        typeCell.innerText = currentPokemonJSON.types[0].type.name
        row.appendChild(typeCell)


        wrapper.appendChild(row)
    }
}

getPokemon('pokemon?limit=20')
console.log('End of file')