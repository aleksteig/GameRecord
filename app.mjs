import Game from "./models/gameClass.mjs";

let someRandomGame = new Game("Sudoku", "FromSoftware", "New York", "Nintendo", 3096, "2-5", "600 mins", "Easy", "https://youtube.com", 3000, 10);
let someOtherRandomGame = new Game("Sudoku 2", "Reddit", "Norway", "Sega", 1024, "5", "120 mins", "Medium", "https://google.com", 10, 4);
let games = [];

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

function getAllSavedGamesAsJSON(){
    return JSON.parse(localStorage.getItem(gameListKey));
}

function importJSONFileToLocalStorage(JSONfile){
    JSON.stringify(JSONfile);
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

const fileInput = document.getElementById("importSource");
const messageDisplay = document.getElementById("message");

fileInput.addEventListener("change", handleFileSelection);

function  handleFileSelection(event){
    const file = event.target.files[0];
    const extension = file.name.split('.').pop();
    messageDisplay.textContent = "";
    
    if(!file){
        showMessage("No file was selected. Please choose a new file.", "error");
        return;
    } else if(extension != 'json'){
        showMessage("Unsupported file type. Please use a json file.", "error");
        return;
    }

    const reader = new FileReader();
    reader.onload = () => {
        const readFile = reader.result;
        importJSONFileToLocalStorage(readFile);
        addGamesToGameList();
        showListOfSavedGames(games);
    }
    reader.onerror = () => {
        showMessage("Error reading the file. Please try again.", "error");
    }
    reader.readAsText(file);
}

function showMessage(message, type){
    messageDisplay.textContent = message;
    messageDisplay.style.color = type === "error" ? "red" : "green";
}

function addGamesToGameList(){
    const gamesInJSON = getAllSavedGamesAsJSON();
    if(games.length < gamesInJSON.length){
        games = [];
        for(let i = 0; i < gamesInJSON.length; i++){
            games.push(gamesInJSON[i]);
        }
    }
}

function createListedDetails(data){
    let currentData = data;
    let linebreak = document.createElement('br');
    const ul = document.getElementById("gamesList");
    let liElement = document.createElement('li');
    let itemElementHeader = document.createElement('h1');
    let itemElements = document.createElement('section');
    let listedDetails1 = document.createElement('ul');
    let listedDetails2 = document.createElement('ul');
    let listedDetails3 = document.createElement('ul');
    let listedDetails4 = document.createElement('ul');
    let playerCount = document.createElement('section');
    let gameRating = document.createElement('section');
    let playerCountButton = document.createElement('button');
    let slider = document.createElement('input');

    itemElementHeader.appendChild(document.createTextNode(currentData.title));
    itemElements.appendChild(linebreak);
    itemElements.appendChild(document.createTextNode('Year: ' + currentData.year +  ' '.repeat(3)));
    itemElements.appendChild(document.createTextNode('Players: ' + currentData.players +  ' '.repeat(3)));
    itemElements.appendChild(document.createTextNode('Time: ' + currentData.time +  ' '.repeat(3)));
    itemElements.appendChild(document.createTextNode('Difficulty: ' + currentData.difficulty));
    itemElements.style.fontSize = '20px';
    itemElements.style.fontWeight = 'normal';
    listedDetails1.appendChild(document.createTextNode('Designer: ' + currentData.designer));
    listedDetails1.appendChild(document.createElement('br'));
    listedDetails2.appendChild(document.createTextNode('Artist: ' + currentData.artist));
    listedDetails2.appendChild(document.createElement('br'));
    listedDetails3.appendChild(document.createTextNode('Publisher: ' + currentData.publisher));
    listedDetails3.appendChild(document.createElement('br'));
    listedDetails4.appendChild(document.createTextNode('BGG Listing: ' + currentData.url));
    listedDetails4.appendChild(document.createElement('br'));
    playerCount.appendChild(linebreak)
    playerCountButton.textContent = '+'
    playerCountButton.style.height = '20px'
    playerCountButton.style.width = '25px'
    playerCount.appendChild(document.createTextNode('Playercount: ' + currentData.playCount + ' '));
    playerCount.appendChild(playerCountButton)
    slider.type = 'range';
    slider.min = 0;
    slider.max = 10;
    slider.step = 1;
    slider.value = currentData.personalRating;
    gameRating.appendChild(document.createTextNode('Rating: ' + currentData.personalRating + ' '));
    gameRating.appendChild(slider);

    listedDetails1.style.fontSize = '20px'
    listedDetails2.style.fontSize = '20px'
    listedDetails3.style.fontSize = '20px'
    listedDetails4.style.fontSize = '20px'
    itemElementHeader.appendChild(itemElements);
    liElement.appendChild(itemElementHeader);
    liElement.appendChild(listedDetails1);
    liElement.appendChild(listedDetails2);
    liElement.appendChild(listedDetails3);
    liElement.appendChild(listedDetails4);
    liElement.appendChild(playerCount);
    liElement.appendChild(gameRating);
    ul.appendChild(liElement);
}

function showListOfSavedGames(data){
    for(let i = 0; i < data.length; i++){
        let currentSelectedData = data[i];
        createListedDetails(currentSelectedData);
    }
}