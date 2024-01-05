const X_CLASS= 'x'; // x ki class
const CIRCLE_CLASS = 'circle'; // circle ki class

// Winning Combinations Yeh Hai
const WINNING_COMBINATION = [
    [0,1,2],
    [3,4,5],
    [6,7,8],

    [0,3,6],
    [1,4,7],
    [2,5,8],

    [0,4,8],
    [2,4,6],
]

// Sab Cells ko Select Karo
const saareCells  = document.querySelectorAll('[data-cell]');

// Poore Board Container ko select karo
const board  = document.querySelector('#board');

// win Message ka Data - Kon Jeeta
const dataWinMessage = document.querySelector('[data-win-text]')

// Win Message ka Container
const WinMessage = document.querySelector('#win-message')

// Restart Button
const restartButton = document.querySelector('#restartButton')

// Circle ki Turn , Undifined , Circle ki turn hai ya nahi
let circleKiTurn;

// Game Start Karo
gameStartKaro();

// restart Button per click karne par phir se game Start Karo
restartButton.addEventListener('click', gameStartKaro)

// First Time Game Start Karo
function gameStartKaro (){
    // circle ki turn nahi hon , sab se pehle x
    circleKiTurn = false;

    // Saare Cells per Loop Lagao
    saareCells.forEach(cell => {
        // Restart karne ke baad , pehle x , circle saare remove karo
        cell.classList.remove(X_CLASS);       
        cell.classList.remove(CIRCLE_CLASS);

        // Cell ko Click Kare , Restart ke baad ClickKarnePar ka saara function function remove karo
        cell.removeEventListener('click', clickKarnePar)       

        // Click karna par handle Karo , Aik Baar hi Click kar sako aik cell ko
        cell.addEventListener('click', clickKarnePar , { once: true })
    });

    // Ab Saare Hover Effect hai X , Circle ka , us ko set kare
    boardKaHoverSetKaro();

    // Restart hone par , Win Message Ko Show Mat Karna , Warna Hate ga hi nahi
    WinMessage.classList.remove('show')
}


function clickKarnePar(e){
    // aik aik cell , e.target mai chala gaya
    const cell = e.target;

    // Cell Jis Per Hone , circle ke turn ya x ki turn
    const cellJisPerHon = circleKiTurn ? CIRCLE_CLASS : X_CLASS

    // Mark Karo Place ko Sab Se Pehle, Cell Kis Jagah per hai
    markPlaceKaro(cell , cellJisPerHon);

    // Check For Win - Cell jis per hon - WinCheckKaro Function check kare ga 
    if(winCheckKaro(cellJisPerHon)){
        gameEndKaro(false); // draw = false
    }
    // ya phir check karO Draw hai Kiya 
    else if (drawHaiKiya()) {
        gameEndKaro(true); // draw = true
    } else {
    
    // Win Nahi hon , Draw bhi nahi hon , toh Phir Turn x ko turn circle mai change karo
    turnChangeKaro();
    // Aur us ke saath hover ko bhi set karo
    boardKaHoverSetKaro();
        
    }

    // In sab mai WinMessage ka PopUp Show karo , agar draw hon toh "Draw!" else X's Win
    function gameEndKaro(draw){
        if (draw){
            dataWinMessage.innerText = 'Draw!'
        } else {
            dataWinMessage.innerText = `${circleKiTurn ? "O's" : "X's"} Wins!`
        }
        WinMessage.classList.add('show')
    }

}

// Draw Hai Kiya Function
function drawHaiKiya(){
    // saare cells ki shallow copy aur reference le kar , us ke har cell mai && ki condition lagao
    // ya phir saare cell x class ko contain kare ya phir saare cell circle_class ko contain kare , toh phir draw kardo
    return [...saareCells].every(cell => {
        return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
    })
}

// 
function markPlaceKaro(cell, cellJisPerHon){
    // circle ke turn ya x ki turn , dono ki classlist add kare , acc to situation
    cell.classList.add(cellJisPerHon);
}

function turnChangeKaro (){
    // Circle ki Turn = Nahi ho Circle ki turn
    circleKiTurn = !circleKiTurn ;// Ternary Operator Yaha
}

function boardKaHoverSetKaro(){
    // Sab se X CLASS and Circle Class ko by default hatado
    board.classList.remove(X_CLASS)
    board.classList.remove(CIRCLE_CLASS)

    // then according to condition , use add karo
    if(circleKiTurn){
        board.classList.add(CIRCLE_CLASS)
    }
    else {
        board.classList.add(X_CLASS)
    }
}

// Win Check Karo , Cell jis per mai honga us per
function winCheckKaro(cellJisPerHon){
    // Winning Combination mai har combination mai || check kare , ya phir 1st combination , ya phir ...combination
    return WINNING_COMBINATION.some(combination => {
        // aur us single combination mai check karo sabko && ,
      return combination.every(index => {
        // us combination ka har index = SaareCell ke index se match hon , jo contain kare Cell Jis per mai honga
        return saareCells[index].classList.contains(cellJisPerHon);
      })  
    })
}