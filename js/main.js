/**
 * All variables of the program 
 */
// table
let htmlTable = "<table>";
let tileTrap = '<td class="trap" id="';
let tileTreasure = '<td class="treasure" id="';
let imgTrap = '<img class="spike" src="./img/piege.png" alt="piege">';
let imgTreasure = '<img class="chest" src="./img/tresor.png" alt="chest">';
const lenghtTable = 25;
const heightTable = 15;
let count = 0;

//Character
let spawnCharacter = Math.round((lenghtTable * heightTable) / 2);
let positionCharacter = spawnCharacter;
let luffyCharacter;

//Health bar
let healthBar = document.getElementById('healthBar');

//Score
let totalScore = 0;
let score = document.getElementById('score');
let endScreen = document.getElementById("end");
let finalScore = document.getElementById("finalScore");

/**
 * Change the facing position of the character
 * @param {input facing position} facing 
 * @returns 
 */
const luffy = (facing) => {
    switch (facing) {
        case 'a': //Left
            luffyCharacter = '<img class="character_shadow pixelArt" src="./img/characterShadow.png" alt="characterShadow"> <img class="character_spriteSheet pixelArt faceLeft" src="./img/luffy_walk2.png" alt="Character"> ';
            break;

        case 'd': //Right
            luffyCharacter = '<img class="character_shadow pixelArt" src="./img/characterShadow.png" alt="characterShadow"> <img class="character_spriteSheet pixelArt faceRight" src="./img/luffy_walk2.png" alt="Character"> ';
            break;

        case 's': //Down
            luffyCharacter = '<img class="character_shadow pixelArt" src="./img/characterShadow.png" alt="characterShadow"> <img class="character_spriteSheet pixelArt faceDown" src="./img/luffy_walk2.png" alt="Character"> ';
            break;

        case 'w': //Up
            luffyCharacter = '<img class="character_shadow pixelArt" src="./img/characterShadow.png" alt="characterShadow"> <img class="character_spriteSheet pixelArt faceUp" src="./img/luffy_walk2.png" alt="Character"> ';
            break;
    }
    return luffyCharacter;
}

//-------------------------------------------------Health bar--------------------------------------------
/**
 * Add somes heart
 * @param {input the amount of health to give} qte 
 */
const addHeart = (qte) => {
    for (let i = 0; i <= qte; i++) {
        let heart = document.createElement('div');
        heart.classList.add('heart');
        healthBar.append(heart);
    }
}

/**
 * remove somes heart
 * @param {input the amount of health to remove} qte 
 */
const removeHeart = (qte) => {

    for (let i = 0; i < qte; i++) {
        healthBar.firstElementChild.remove('heart');
    }
    for (let i = 0; i < qte; i++) {

        let heart = document.createElement('div');
        heart.classList.add('emptyHeart');
        healthBar.append(heart);
    }
}

//-------------------------------------------------Generation map-----------------------------------------
/**
 * Show map
 */
const showMap = () => {
    document.getElementById('container').innerHTML = htmlTable;
}

/**
 * Generate the map with the character
 */
const generateMap = () => {
    let table2d = [];
    for (let i = 0; i < heightTable; i++) {
        htmlTable += "<tr>";
        table2d.push([]);
        for (let j = 0; j < lenghtTable; j++) {
            let rand = Math.floor(Math.random() * 100) + 0;
            count++;
            table2d[i].push(count);

            if (count === spawnCharacter) {
                htmlTable += '<td class="luffy" id="' + spawnCharacter + '">' + luffy('s') + '</td>'
                positionCharacter = count;
            }

            else {
                if
                    (rand >= 0 && rand <= 90) { htmlTable += tileTrap + count + '">' + imgTrap + "</td>"; }

                else { htmlTable += tileTreasure + count + '">' + imgTreasure + "</td>"; }
            }
        }
        htmlTable += "</tr>";
    }
    htmlTable += "</table>";
    console.log(table2d);
    showMap();
    addHeart(40);
    score.innerHTML = 0;
}

generateMap();

//-----------------------------------------------Deplacement------------------------------------------------------
/**
 * switch the position between the nest tile and the character
 * return if the player as 0 heart left
 * @param {take the id of the next position} id 
 * @returns 
 */
const changeTile = (id) => {

    let element = document.getElementById(id);
    if (element.classList.value === 'trap') {
        removeHeart(1);
        console.log('trap');
        totalScore -= 50;
        score.innerHTML = totalScore;
        document.getElementById(id).firstElementChild.remove();
        document.getElementById(id).classList.remove('trap');
    }
    else if (element.classList.value === 'treasure') {
        console.log('treasure');
        totalScore += 1000;
        score.innerHTML = totalScore;
        document.getElementById(id).firstElementChild.remove();
        document.getElementById(id).classList.remove('treasure');
    }
    else if (element.classList.value === 'empty') {
        totalScore -= 10;
        score.innerHTML = totalScore;
    }

    document.getElementById(id).classList.add('luffy');
    document.getElementById(id).classList.add('empty');
    document.getElementById(id).innerHTML = luffy();
    
    let fullHeart = document.querySelector('.heart');
    if (healthBar.firstElementChild !== fullHeart) {
        console.log('Partie Terminer');
        finalScore.innerHTML = totalScore;
        endScreen.style.display = "block";
        return;
    }
}

/**
 * take the keyboard input to modify the character position and facing
 */
window.addEventListener('keydown', (event) => {
    
    let fullHeart = document.querySelector('.heart');
    if (healthBar.firstElementChild === fullHeart) {

        switch (event.key) {
            
            case 'a': // a
            luffy('a');
            
            if ((positionCharacter - 1) % 25 === 0 || positionCharacter - 1 < 1) {
                console.log("position hors tableau")
            }
            else {
                document.getElementById(positionCharacter).firstElementChild.remove();
                document.getElementById(positionCharacter).lastElementChild.remove();
                document.getElementById(positionCharacter).classList.remove('luffy');
                changeTile(positionCharacter - 1);
                positionCharacter--;
            }
            break;
            
            case 'w': // w
            luffy('w');
            
            if (positionCharacter - 25 <= 0) {
                console.log("position hors tableau")
            }
            else {
                document.getElementById(positionCharacter).firstElementChild.remove();
                document.getElementById(positionCharacter).lastElementChild.remove();
                document.getElementById(positionCharacter).classList.remove('luffy');
                changeTile(positionCharacter - 25);
                positionCharacter -= 25;
            }
            break;
            
            case 'd': // d
            luffy('d');
            
            if ((positionCharacter) % 25 === 0 || positionCharacter + 1 > 375) {
                console.log("position hors tableau")
            }
            else {
                document.getElementById(positionCharacter).firstElementChild.remove();
                document.getElementById(positionCharacter).lastElementChild.remove();
                document.getElementById(positionCharacter).classList.remove('luffy');
                changeTile(positionCharacter + 1);
                positionCharacter++;
            }
            break;
            
            case 's': // s
            luffy('s');
            
            if (positionCharacter + 25 >= 376) {
                console.log("position hors tableau")
            }
            else {
                document.getElementById(positionCharacter).firstElementChild.remove();
                document.getElementById(positionCharacter).lastElementChild.remove();
                document.getElementById(positionCharacter).classList.remove('luffy');
                changeTile(positionCharacter + 25);
                positionCharacter += 25;
            }
            break;
            
            case 'Escape':
                console.log('Partie Terminer');
                finalScore.innerHTML = totalScore;
                endScreen.style.display = "block";
                return;
            }
        }
            
    console.log(positionCharacter);
    console.log(event.key);
});
