$(document).ready(function () {
  var currentPlayer = 1;
  var moves = 0;
  var player1Score = 0;
  var player2Score = 0;

  // Función para verificar si un jugador ha ganado
  function checkWin(player) {
    var rows = [[], [], []];
    var cols = [[], [], []];
    var diagonal1 = [];
    var diagonal2 = [];

    // Recorre las celdas y guarda las coordenadas de los movimientos del jugador actual
    $("#board td").each(function () {
      var row = parseInt($(this).data("row"));
      var col = parseInt($(this).data("col"));
      var value = $(this).text();

      if (value == player) {
        rows[row].push(col);
        cols[col].push(row);

        if (row == col) {
          diagonal1.push(row);
        }

        if (row + col == 2) {
          diagonal2.push(row);
        }
      }
    });

    // Verifica si alguna fila, columna o diagonal tiene 3 movimientos del jugador actual
    var win = false;

    $.each(rows, function (index, row) {
      if (row.length == 3) {
        win = true;
        return false;
      }
    });

    if (!win) {
      $.each(cols, function (index, col) {
        if (col.length == 3) {
          win = true;
          return false;
        }
      });
    }

    if (!win && diagonal1.length == 3) {
      win = true;
    }

    if (!win && diagonal2.length == 3) {
      win = true;
    }

    return win;
  }

  // Función para cambiar el jugador actual
  function changePlayer() {
    currentPlayer = currentPlayer === 1 ? 2 : 1;
    $("#board").toggleClass("player1-turn player2-turn");
  }

  // Función para manejar el clic en una celda
  $("#board td").click(function () {
    if ($(this).text() === "") {
      var row = parseInt($(this).data("row"));
      var col = parseInt($(this).data("col"));

      var player = currentPlayer === 1 ? "X" : "O";
      $(this).text(player);

      moves++;

      if (checkWin(player)) {
        // Incrementa la puntuación del jugador actual y muestra un mensaje de victoria
        if (currentPlayer === 1) {
          player1Score++;
          $("#player1Score").text(player1Score);
          alert("¡Jugador 1 ha ganado!");
        } else {
          player2Score++;
          $("#player2Score").text(player2Score);
          alert("¡Jugador 2 ha ganado!");
        }

        // Reinicia el tablero
        resetBoard();
      } else if (moves === 9) {
        // Empate si no hay más movimientos posibles
        alert("¡Empate!");
        resetBoard();
      } else {
        changePlayer();
      }
    }
  });

  // Función para reiniciar el tablero y las variables
  function resetBoard() {
    $("#board td").text("");
    moves = 0;
    currentPlayer = 1;
    $("#board").removeClass("player2-turn").addClass("player1-turn");
  }

  // Maneja el clic en el botón de reinicio
  $("#resetBtn").click(function () {
    resetBoard();
    player1Score = 0;
    player2Score = 0;
    $("#player1Score").text(player1Score);
    $("#player2Score").text(player2Score);
  });
});
