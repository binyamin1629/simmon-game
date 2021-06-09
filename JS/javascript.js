let DIV = document.querySelector('.contanor-game-area');
let howmanycards = 0;
let Table;
let colorarry = ["Red ", "blue", "Darkred", "Lime", "Green", "Plum", "Navy", "sienna", "DarkOrange"];
let myLength;
let myLevel = 700;
let computerarray = [];
let MyTurnCount = 0;
let intrval;
let intrval1;
let MyOpacityisalerdysamall = false;
let opacityDown = false;
let MyOpacity = 0;
let Temp1 = 0;
let temparry = [];
let userArray = [];
let isgood = false;
let LevelCount = 0;
let Moves;
let countdown = 0;
let chekwin = 0;
let compturn = true;
let goodorbad;
let userTurn = false;
let resetall=false;
document.querySelector('#reset').addEventListener('click', resetevent);

function resetevent() {
    reset();
}
function reset() {

    myLevel = 700;
    if (document.getElementById('mytable')) {
        Table.remove();

    }
    LevelCount = 0;
    temparry = [];
    userArray = [];
    computerarray = []
   //howmanycards = 0;
    document.querySelector('#level-number').textContent = " ";
    clearInterval(intrval)
    document.querySelector("#myselcetval").selectedIndex = 0;
}


 
function choosColors(x) {

    howmanycards = parseInt(x.value)

    if (document.getElementById('mytable')) {
        Table.remove();
    }


    createGmaeTable(howmanycards);


}



function chooseLevel(x) {
    myLevel = x.value;


}


function createGmaeTable(howmanycards) {


    //create table


    Table = document.createElement('table');
    Table.setAttribute('id', 'mytable');
    DIV.appendChild(Table);


    let rows = GetRows(howmanycards);

    let count = 1;
    for (var i = 0; i < rows; i++) {
        let tr = document.createElement('tr');
        Table.appendChild(tr);
        if (rows == 2) {

            if (howmanycards == 6) {
                myLength = 3;
            } else {
                myLength = 2;
            }
            for (var j = 0; j < myLength; j++) {
                let td = document.createElement('td');
                td.setAttribute('id', count);
                td.style.backgroundColor = colorarry[count - 1];
                td.innerHTML = count;
                td.addEventListener('click', PalySimon);
                tr.appendChild(td);
                count++;
            }

        } else {
            for (var j = 0; j < 3; j++) {


                let td = document.createElement('td');
                td.setAttribute('id', count);
                td.style.backgroundColor = colorarry[count - 1];
                td.innerHTML = count;
                td.addEventListener('click', PalySimon);
                tr.appendChild(td);

                count++;
            }
        }

    }
    count = 1;

}

function GetRows(howmanycards) {
    switch (howmanycards) {
        case 4:
            return 2;
            break;
        case 6:
            return 2;
            break;
        case 9:
            return 3;
            break;
    }
}
document.querySelector('#start').addEventListener('click', startGame);

function startGame() {
    // clearInterval(intrval);
    if (howmanycards == 0) {
        alert('You must peek how many cards!!!');
        return;
    } else {
        starmyGame();
    }
}
function GetRandom() {

    return Math.floor(Math.random() * howmanycards) + 1;

}
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}
async function showCards(random) {


    document.getElementById(random).style.opacity = 0.55555000;


    await sleep(200);
    showcardback(random);

}
function showcardback(random) {
    document.getElementById(random).style.opacity = 1;
    //await sleep(200);
}
async function starmyGame() {

    // computerarray = temparry;
    MyTurnCount = computerarray.length;

    Moves = computerarray.length;
    //  LevelCount.parseInt(LevelCount)
    document.querySelector('#level-number').textContent = 'Level ' + (LevelCount + 1);

    if (MyTurnCount == 0) {
        let random = GetRandom();
        computerarray.push(random)
        temparry = computerarray.slice();
        showCards(random);
        SetMoves(1);
        userTurn = true;
    } else {
        if (isgood == false) {
            computerarray = temparry.slice();

        }

        console.log(temparry)
        temparry = computerarray.slice();
        countdown = computerarray.length;
        SetMoves(computerarray.length)
        intrval = setInterval(() => {
            Temp1 = computerarray.shift();
            if (countdown > 0) {
                countdown--;
                showCards(Temp1);
            } else {
                userTurn = true;
                clearInterval(intrval)
            }

            MyTurnCount--;
        }, myLevel);



    }



}
function SetMoves(num) {
    chekwin = num;
    Moves = num;
}

async function PalySimon() {
    if (userTurn == true) {
        showCards(this.id);
        userArray.push(this.id);
        document.querySelector('#level-number').textContent = "you'r Turn!!!"

        if (--Moves > 0) {

            return;
        } else {
            userTurn = false;
        }
        isgood = chekwinner(chekwin);
        //alert(isgood)
        sleep(1000)
        if (isgood) {
            //alert("good")
            goodorbad = showresault(isgood)

            LevelCount++;
            computerarray = [];
            computerarray.length = LevelCount + 1;
            userArray = [];
            createrandomearray();
            // alert(computerarray.length)

            if (goodorbad == true) {
                //      alert();
                await sleep(800)

                startGame();

            }


        } else {

            //  alert(isgood)


            goodorbad = showresault(isgood);
            if (goodorbad == true) {
                computerarray = temparry.slice();
                userArray = [];
                await sleep(800)
                startGame();

            }





        }



    }

}
function createrandomearray() {

    for (var i = 0; i < computerarray.length; i++) {


        let random = GetRandom();
        computerarray[i] = random;
        temparry[i] = random;
    }


}
function chekwinner(chekwin) {
    let wineer = false;
    let winnercount = 0;
    for (var i = 0; i < chekwin; i++) {

        if (userArray[i] == temparry[i]) {
            winnercount++;
        }

    }
    if (winnercount == chekwin) {
        wineer = true;
    }
    return wineer;
}
function showresault(isok) {

    compturn = false;
    let onetimeinterval = 1;
    let show = setInterval(() => {
        if (onetimeinterval == 1) {
            document.getElementById('mytable').style.display = "none";


            let mygoodorbaddiv = document.createElement('div');

            mygoodorbaddiv.setAttribute('class', 'mygoodorbaddiv');
            mygoodorbaddiv.setAttribute('id', 'tempdiv');

            let myText = document.createElement('h1');

            mygoodorbaddiv.appendChild(myText)


            DIV.appendChild(mygoodorbaddiv);


            if (isok == true) {
                myText.textContent = "Good!!!";
            } else {
                myText.textContent = "Try again!!!";
            }
        } else {
            clearInterval(show)
            document.getElementById('mytable').style.display = "block";
            document.getElementById('tempdiv').remove();
            compturn = true;
        }
        onetimeinterval++;
    }, 500);

    return compturn = true;

}