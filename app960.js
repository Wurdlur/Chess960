var black = '01234567';
var spotsChosen = [];
var rookSpot1 = 0;
var rookSpot2 = 0;
for (var i = 0; i < 2; i++) {
    setRook(i);
}
setKing();
for (var i = 0; i < 2; i++) {
    setBishop(i);
}
for (var i = 0; i < 3; i++) {
    setOthers(i);
}

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
        black = black.replace(bSpot1, 'b');
    } else {
        var bSpot2 = Math.floor(Math.random() * 8);
        while (bSpot2 % 2 != 1 || spotsChosen.includes(bSpot2)) {
            bSpot2 = Math.floor(Math.random() * 8);
        }
        spotsChosen.push(bSpot2);
        black = black.replace(bSpot2, 'b');
    }
}

function setKing() {
    if(rookSpot1 > rookSpot2) {
        var kSpot1 = Math.floor(Math.random() * ((rookSpot1 - 1)
            - rookSpot2) + (rookSpot2 + 1));
        spotsChosen.push(kSpot1);
        black = black.replace(kSpot1, 'k');
    } else {
        var kSpot2 = Math.floor(Math.random() * ((rookSpot2 - 1)
            - rookSpot1) + (rookSpot1 + 1));
        spotsChosen.push(kSpot2);
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

var fenString = black + '/pppppppp/8/8/8/8/PPPPPPPP/' + black.toUpperCase() + ' w KQkq - 0 1';
console.log(fenString);

var game = new Chess();
var board = new ChessBoard('board', {
  onSquareClick: onSquareClick,
  fen: fenString
});

function onSquareClick(clickedSquare, selectedSquares) {
  if (selectedSquares.length === 0) {
    if (game.moves({ square: clickedSquare }).length > 0) {
      board.selectSquare(clickedSquare);
    }

    return;
  }

  var selectedSquare = selectedSquares[0];
   
  if (clickedSquare === selectedSquare) {
    board.unselectSquare(clickedSquare);
    return;
  }

  board.unselectSquare(selectedSquare);

  var clickedPieceObject = game.get(clickedSquare);
  var selectedPieceObject = game.get(selectedSquare);

  if (clickedPieceObject && (clickedPieceObject.color === selectedPieceObject.color)) {
    board.selectSquare(clickedSquare);
    return;
  }

  var legalMoves = game.moves({ square: selectedSquare, verbose: true });
  var isMoveLegal = legalMoves.filter(function(move) {
    return move.to === clickedSquare;
  }).length > 0;

  if (!isMoveLegal) {
    return;
  }

  if (selectedPieceObject.type === 'p' && (clickedSquare[1] === '1' || clickedSquare[1] === '8')) { // Promotion
    board.askPromotion(selectedPieceObject.color, function(shortPiece) {
      move(selectedSquare, clickedSquare, shortPiece);
    });
  } else {
    move(selectedSquare, clickedSquare);
  }
}

function move(from, to, promotionShortPiece) {
  game.move({
    from: from,
    to: to,
    promotion: promotionShortPiece
  });

  board.setPosition(game.fen());

  randomMove();
}

function randomMove() {
  var legalMoves = game.moves();

  var randomIndex = Math.floor(Math.random() * legalMoves.length);

  game.move(legalMoves[randomIndex]);
  board.setPosition(game.fen());

  if (game.game_over()) {
    if (game.in_checkmate()) {
      alert('You ' + (game.turn() === 'w' ? 'lost' : 'won'));
    } else {
      alert('It\'s a draw');
    }
  }
}