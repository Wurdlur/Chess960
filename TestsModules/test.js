var black = '01234567';
var spotsChosen = [];
var rookSpot1 = 0;
var rookSpot2 = 0;
var kingSpot = 0;
var bishopSpot1 = 0;
var bishopSpot2 = 0;
placeRook1();
placeRook2();
placeKing();
placeBishop1();
placeBishop2();
placeQueen();
placeKnight1();
placeKnight2();

function setOthers(num) {
    var otherSpot = Math.floor(Math.random() * 8);
    while (spotsChosen.includes(otherSpot)) {
        otherSpot = Math.floor(Math.random() * 8);
    }
    spotsChosen.push(otherSpot);
    if(num == 0) {
        black = black.replace(otherSpot, 'q');
    } else {
        black = black.replace(otherSpot, 'n');
    }
}

function setBishop(num) {
    if (num === 0) {
        var bSpot1 = Math.floor(Math.random() * 8);
        while(bSpot1 % 2 != 0 || spotsChosen.includes(bSpot1)) {
            bSpot1 = Math.floor(Math.random() * 8);
        }
        spotsChosen.push(bSpot1);
        bishopSpot1 = bSpot1;
        black = black.replace(bSpot1, 'b');
    } else {
        var bSpot2 = Math.floor(Math.random() * 8);
        while (bSpot2 % 2 != 1 || spotsChosen.includes(bSpot2)) {
            bSpot2 = Math.floor(Math.random() * 8);
        }
        bishopSpot2 = bSpot2;
        spotsChosen.push(bSpot2);
        black = black.replace(bSpot2, 'b');
    }
}

function setKing() {
    if(rookSpot1 > rookSpot2) {
        var kSpot1 = Math.floor(Math.random() * ((rookSpot1 - 1)
            - rookSpot2) + (rookSpot2 + 1));
        spotsChosen.push(kSpot1);
        kingSpot = kSpot1;
        black = black.replace(kSpot1, 'k');
    } else {
        var kSpot2 = Math.floor(Math.random() * ((rookSpot2 - 1)
            - rookSpot1) + (rookSpot1 + 1));
        spotsChosen.push(kSpot2);
        kingSpot = kSpot2;
        black = black.replace(kSpot2, 'k');
    }
}

function setRook(num) {
    if(num == 0) {
        var rSpot1 = Math.floor(Math.random() * 8);
        rookSpot1 = rSpot1;
        spotsChosen.push(rSpot1);
        black = black.replace(rSpot1, 'r');
    } else {
        var rSpot2 = Math.floor(Math.random() * 8);
        var valid = false;
        while(valid == false) {
            if(rSpot2 == rookSpot1) {
                rSpot2 = Math.floor(Math.random() * 8);
                valid = false;
            } else if (rSpot2 == rookSpot1 + 1) {
                rSpot2 = Math.floor(Math.random() * 8);
                valid = false;
            } else if (rSpot2 == rookSpot1 - 1) {
                rSpot2 = Math.floor(Math.random() * 8);
                valid = false;
            } else {
                valid = true;
            }
        }
        rookSpot2 = rSpot2;
        spotsChosen.push(rSpot2);
        black = black.replace(rSpot2, 'r');
    }
}

function placeRook1() {
    setRook(0);
    if (black.includes('r')) {
        console.log("Test Successful")
    } else {
        console.log("Test Unsuccessful")
    }
}

function placeRook2() {
    setRook(1);
    if(black.includes('r')) {
        if (rookSpot2 != rookSpot1 + 1 && rookSpot2 != rookSpot1 -1) {
            console.log("Test Successful");
        } else {
            console.log("Test Unsuccessful");
        }
    } else {
        console.log("Test Unsuccessful");
    }
}

function placeKing() {
    setKing();
    if (black.includes('k')) {
        if(rookSpot1 > rookSpot2) {
            if (kingSpot < rookSpot1 && kingSpot > rookSpot2) {
                console.log("Test Successful");
            } else {
                console.log("Test Unsuccessful");
            }
        } else if (rookSpot2 > rookSpot1) {
            if (kingSpot < rookSpot2 && kingSpot > rookSpot1) {
                console.log("Test Successful");
            } else {
                console.log("Test Unsuccessful");
            }
        } else {
            console.log("Test Unsuccessful");
        }
    } else {
        console.log("Test Unsuccessful");
    }
}

function placeBishop1() {
    setBishop(0);
    if (black.includes('b')) {
        if (bishopSpot1 % 2 == 0) {
            console.log("Test Successful");
        } else {
            console.log("Test Unsuccessful");
        }
    } else {
        console.log("Test Unsuccessful");
    }
}

function placeBishop2() {
    setBishop(1);
    if (black.includes('b')) {
        if (bishopSpot2 % 2 == 1) {
            console.log("Test Successful");
        } else {
            console.log("Test Unsuccessful");
        }
    } else {
        console.log("Test Unsuccessful");
    }
}

function placeQueen() {
    setOthers(0);
    if (black.includes('q')) {
        console.log("Test Successful");
    } else {
        console.log("Test Unssucceful");
    }
}

function placeKnight1() {
    setOthers(1);
    if (black.includes('n')) {
        console.log("Test Successful");
    } else {
        console.log("Test Unsuccessful");
    }
}

function placeKnight2() {
    setOthers(2);
    if(black.includes('n')) {
        if (!black.includes('1') && !black.includes('2') && 
                !black.includes('3') && !black.includes('4') &&
                !black.includes('5') && !black.includes('6') &&
                !black.includes('7') && !black.includes('8')) {
            console.log("Test Successful");
        } else {
            console.log("Test Unsuccessful");
        }
    } else {
        console.log("Test Unsuccessful");
    }
}