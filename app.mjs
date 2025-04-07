import Game from "./models/gameClass.mjs";

let someRandomGame = new Game("Sudoku", "FromSoftware", "New York", "Nintendo", 3096, "2-5", "600 mins", "Easy", "https://youtube.com", 3000, 10);
let someOtherRandomGame = new Game("Sudoku 2", "Reddit", "Norway", "Sega", 1024, "5", "120 mins", "Medium", "https://google.com", 10, 4);

const gameListKey = 'games'
localStorage.clear();

function saveGameToStorage(game){
    let listOfAllTheGames = [];
    if(localStorage.length == 0){
        listOfAllTheGames.push(game);
        localStorage.setItem(gameListKey, JSON.stringify(listOfAllTheGames));
    } else {
        let gamesList = JSON.parse(localStorage.getItem(gameListKey));
        gamesList.push(game);
        localStorage.setItem(gameListKey, JSON.stringify(gamesList));
    }
}

saveGameToStorage(someRandomGame);
saveGameToStorage(someOtherRandomGame);

function retrieveAllGamesFromStorage(){
    if(localStorage.length > 0){
        let output = 0;
        let listOfAllGames = JSON.parse(localStorage.getItem(gameListKey));
        let listOfGames = [];
        let listOfTitles = [];
        while(output < listOfAllGames.length){
            for(let i = 0; i < listOfAllGames.length; i++){
                listOfGames.push(listOfAllGames[i]);
                output += 1;
            }
        }
        for(let i = 0; i < listOfGames.length; i++){
            listOfTitles.push(listOfGames[i].title);
        }
        return listOfTitles;
    }
}

if(localStorage.length > 0){
    console.log(retrieveAllGamesFromStorage());
}

function getAllSavedGamesAsJSON(){
    return JSON.parse(localStorage.getItem(gameListKey));
}

function importJSONFileToLocalStorage(JSONfile){
    try{
        JSONfile = JSON.parse(JSONfile);
    }catch(error){
        console.error(error);
    }
    if(typeof(JSONfile) == 'object'){
        let tempListOfGames = JSON.parse(localStorage.getItem(gameListKey));
        for(let i = 0; i < JSONfile.length; i++){
            tempListOfGames.push(JSONfile[i]);
        }
        localStorage.setItem(gameListKey, JSON.stringify(tempListOfGames));
    }
}
