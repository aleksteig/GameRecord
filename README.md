# GameRecord

# tasks

# task 1 ✅
Step 1:

Create a folder “GameRecord”, make it a git repo and add:

readme.md
app.mjs
style.css
index.html

index.html should contain basic html 5 scaffold, and include the proper references to app.mjs and style.css
Commit and push.

# task 2 ✅
Step 2:

Look at the data structure in the example.json Download example.jsonfile, create a class Game that reflects this data structure. The class should be in its own file in a sub folder named models. The class should be exported as default and it should be imported in app.mjs. The class should be used throughout this project.

Commit and push.

# task 3 ✅
Step 3:
Create a save function that saves a game to localStorage.
Create a function that retrieves all games that are saved in localStorage.
Create a function that outputs all the games as JSON
Create a function that can import the mentioned JSON and save all the games to localStorage
NB! You are not allowed to save games as an array, they must be saved as individual key/value items.

Commit and push

# task 4 ✅
Step 4:

Add a input element with id “importSource” to the index.html
Inn app.mjs write the nessesary code to use a FileReader in conjunction with the code from step 3 so that the data from example.json can be imported to localStorage.
Also create an array games, that keeps an in memory record of all the games added.
The games array should always be populated when the application loads (app.mjs runs).

FileReader: https://developer.mozilla.org/en-US/docs/Web/API/FileReaderLinks to an external site.

Commit and Push

# task 5 ✅
Step 5:

Write the code that is necessary in app.mjs to add a visual record in index.html of each game (see gameRecordUI.png at the bottom of this page, for approximate goal Ticket To Ride used as an example). Note that there is a range input and a button that needs to be part of each games display. Do not add code for making these items interactive yet.
When done with this task each game should be listed out when viewing index.html.

Commit and Push.

# task 6 ✅
Step 6:
Make the play count and rating UI work. i.e. changing the rating etc. should change the data stored in the game array and local storage.

Commit and Push

# task 7 ✅
Step 7:
Add UI to the index.html fil that will facilitate adding a new game to the listing.

Commit and Push

# task 8 ✅
Step 8:
Add code to app.mjs to make the UI from step 7 functional.

Commit and Push

# task 9 ✅
Step 9:
Add UI elements to index.html and code to app.mjs that will delete a game from storage.

Commit and Push.

# task 10 ✅
Step 10:
Add UI and code to enable sorting the game listing on player count, rating, dificulty, play count.

Commit and Push

# task 11 (optional)
Step 11 (Optional):
Make UI and code that enables editing a game entery.

Commit and Push