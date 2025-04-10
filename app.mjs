import Game from "./models/gameClass.mjs";

let someRandomGame = new Game("Sudoku", "FromSoftware", "New York", "Nintendo", 3096, "2-5", "600 mins", "Easy", "https://youtube.com", 3000, 10);
let someOtherRandomGame = new Game("Sudoku 2", "Reddit", "Norway", "Sega", 1024, "5", "120 mins", "Medium", "https://google.com", 10, 4);
let games = [];

const gameListKey = 'games'
localStorage.clear();

function saveNewGameToStorage(game){
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

saveNewGameToStorage(someRandomGame);
saveNewGameToStorage(someOtherRandomGame);
addGamesToGameList();
showListOfSavedGames(games);


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
    let extension;
    if(file != undefined){
        extension = file.name.split('.').pop();
    }
    
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
        let readFile = reader.result;
        importJSONFileToLocalStorage(readFile);
        JSON.stringify(readFile);
        try{
            readFile = JSON.parse(readFile);
        }catch(error){
            console.error(error);
        }
        for(let i = 0; i < readFile.length; i++){
            games.push(readFile[i])
            showListOfSavedGames(readFile[i]);
        }
        
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

function createListedDetails(data, dataindex){
    let currentData = data;
    let currentIndex = dataindex;
    let linebreak = document.createElement('br');
    const ul = document.getElementById("gamesList");
    let liElement = document.createElement('li');
    let itemElementHeader = document.createElement('h1');
    let itemElements = document.createElement('section');
    let listedDetails1 = document.createElement('ul');
    let listedDetails2 = document.createElement('ul');
    let listedDetails3 = document.createElement('ul');
    let listedDetails4 = document.createElement('ul');
    let timesPlayed = document.createElement('section');
    let gameRating = document.createElement('section');
    let addTimesPlayedButton = document.createElement('button');
    let slider = document.createElement('input');
    let playCountNode = document.createTextNode('Playcount: ' + currentData.playCount + ' ');
    let ratingNode = document.createTextNode('Rating: ' + currentData.personalRating + ' ');
    let deleteGameFromListsButton = document.createElement('button');

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
    timesPlayed.appendChild(linebreak)
    addTimesPlayedButton.textContent = '+'
    addTimesPlayedButton.style.height = '20px'
    addTimesPlayedButton.style.width = '25px'
    addTimesPlayedButton.value = currentData.playCount;
    addTimesPlayedButton.addEventListener('click', function (event) {
        let newValue = parseInt(this.value) + 1;
        this.value = newValue.toString();
        if(this.value != games[currentIndex].playCount){
            games[currentIndex].playCount = this.value;
            let tempGameList = JSON.parse(localStorage.getItem(gameListKey));
            tempGameList[currentIndex].playCount = this.value;
            saveEditToLocalStorage(tempGameList);
            playCountNode.nodeValue = 'Playcount: ' + this.value + ' ';
        }
    })
    timesPlayed.appendChild(playCountNode);
    timesPlayed.appendChild(addTimesPlayedButton)
    gameRating.appendChild(ratingNode);
    slider.type = 'range';
    slider.min = 0;
    slider.max = 10;
    slider.step = 1;
    slider.value = currentData.personalRating;
    slider.id = "slider";
    slider.addEventListener('input', function (event) {
        if(this.value != games[currentIndex].personalRating){
            games[currentIndex].personalRating = this.value;
            let tempGameList = JSON.parse(localStorage.getItem(gameListKey));
            tempGameList[currentIndex].personalRating = this.value;
            saveEditToLocalStorage(tempGameList);
            ratingNode.nodeValue = 'Rating: ' + this.value + ' ';
        }
    })
    gameRating.appendChild(slider);

    deleteGameFromListsButton.classList.add('deleteGameFromLists');
    deleteGameFromListsButton.textContent = 'Delete Game';
    deleteGameFromListsButton.style.color = 'red'
    deleteGameFromListsButton.style.height = '24px';
    deleteGameFromListsButton.style.width = '100px';
    deleteGameFromListsButton.style.marginTop = '10px';
    deleteGameFromListsButton.value = currentIndex;
    deleteGameFromListsButton.addEventListener('click', function (event) {
        let targetIndex = parseInt(this.value);
        games.splice(targetIndex, 1);
        localStorage.setItem(gameListKey, JSON.stringify(games));

        const ul = document.getElementById('gamesList');
        ul.innerHTML = "";

        for(let i = 0; i < games.length; i++){
            createListedDetails(games[i], i);
        }
    });

    listedDetails1.style.fontSize = '20px';
    listedDetails2.style.fontSize = '20px';
    listedDetails3.style.fontSize = '20px';
    listedDetails4.style.fontSize = '20px';
    timesPlayed.style.fontSize = '20px';
    gameRating.style.fontSize = '20px';
    itemElementHeader.appendChild(itemElements);
    liElement.appendChild(itemElementHeader);
    liElement.appendChild(listedDetails1);
    liElement.appendChild(listedDetails2);
    liElement.appendChild(listedDetails3);
    liElement.appendChild(listedDetails4);
    liElement.appendChild(timesPlayed);
    liElement.appendChild(gameRating);
    liElement.appendChild(deleteGameFromListsButton);
    ul.appendChild(liElement);
}

function showListOfSavedGames(data){
    if(games[games.length-1].title == document.querySelector('#title').value){
        for(let i = 0; i < games.length; i++){
            if(data == games[i]){
                createListedDetails(data, i);
            }
        }
    } else {
        for(let i = 0; i < games.length; i++){
            if(data == games[i]){
                createListedDetails(data, i);
            }
        }
    }
    if(data.toString()[0] == '['){
        for(let i = 0; i < data.length; i++){
            let currentSelectedData = data[i];
            createListedDetails(currentSelectedData, i);
        }
    }
}

function saveEditToLocalStorage(exportedLocalData){
    localStorage.setItem(gameListKey, JSON.stringify(exportedLocalData));
}

let newGameButton = document.querySelector('#addGameToList');
newGameButton.addEventListener('click', addNewGameToListOfGames);

function addNewGameToListOfGames(event) {
    const valOfTitle = document.querySelector('#title').value;
    const valOfDesigner = document.querySelector('#designer').value;
    const valOfArtist = document.querySelector('#artist').value;
    const valOfPublisher = document.querySelector('#publisher').value;
    const valOfYear = document.querySelector('#year').value;
    const valOfPlayers = document.querySelector('#players').value;
    const valOfTime = document.querySelector('#time').value;
    const valOfDifficulty = document.querySelector('#difficulty').value;
    const valOfUrl = document.querySelector('#url').value;
    const valOfPlayCount = document.querySelector('#playCount').value;
    const valOfPersonalRating = document.querySelector('#personalRating').value;

    let targetElement = event.target;
    if(targetElement.className === 'addNewGameToList'){
        let newGameData = new Game(valOfTitle, valOfDesigner, valOfArtist, valOfPublisher, valOfYear, valOfPlayers, valOfTime, valOfDifficulty, valOfUrl, valOfPlayCount, valOfPersonalRating);
        if(parseInt(valOfPlayCount).toString() != 'NaN'){
            saveNewGameToStorage(newGameData);
            games.push(newGameData);
            showListOfSavedGames(newGameData);
        }
    }
}
