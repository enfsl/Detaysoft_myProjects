var getUsername = getCookie("Username");
function Create() {
  ShowBasket(getUsername);
  deneme();
}
function ShowBasket(username) {
  var resultBasket = [];
  createDb();
  db.transaction(function(tx) {
    tx.executeSql(
      "SELECT * FROM Sepet where Kullanici_adi=?",
      [username],
      function(tx, rs) {
        for (var i = 0; i < rs.rows.length; i++) {
          var row = rs.rows.item(i);
          resultBasket[i] = row;
        }
      }
    );
  });
}

// var TableContainer, newTable;
//         TableContainer = document.getElementsByClassName("Showbasket")[0];
//         newTable = document.createElement("table");
//         newTable.className = "basket-table";
//         TableContainer.appendChild(newTable);
//         var TrContainer = document.getElementsByClassName("basket-table")[0];
//         for (var i = 0; i < result.length; i++) {
//           var newTr = document.createElement("tr");

//           var newTd = document.createElement("td");
//           newTr.appendChild(newTd);

//           var newImg = document.createElement("img");
//           newImg.src = "../img/" + result[i]["Urun_src"];
//           newTd.appendChild(newImg);
//         }
