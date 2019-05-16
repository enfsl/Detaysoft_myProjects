function Create() {
  // navbar'da anasayfa, kullanıcı adı, sepet, çıkış
  CreateNavbar();
  DisplayProduct();
}
function CreateNavbar() {
  var ButtonContainer, ButtonText, ButtonId, newButton;
  ButtonContainer = document.getElementsByClassName("navbar")[0];
  ButtonText = ["Anasayfa", "Sepet", "Ürün Ekle", "Ürün Düzenle", "Çıkış"];
  ButtonId = ["Anasayfa", "Sepet", "Urunekle", "Urunduzenle", "Cıkıs"];

  var InputContainer, newInput, InputValue;
  InputContainer = document.getElementsByClassName("navbar")[0];
  InputValue = getCookie("Username");
  // Input'un value'sine cookie'den username'i çekip atacak.
  // kullanıcı giriş yaptığında cookie'ye kullanıcı adını set edicek.
  for (var i = 0; i < ButtonId.length; i++) {
    newButton = document.createElement("button");
    newButton.id = ButtonId[i];
    newButton.innerHTML = ButtonText[i];
    if (i == 0)
      newButton.onclick = function() {
        window.location = "product.html";
      };
    if (i == 1)
      newButton.onclick = function() {
        window.location = "basket.html";
      };
    if (i == 2)
      newButton.onclick = function() {
        window.location = "../views/addproduct.html";
      };
    if (i == 3) {
      newButton.onclick = function() {
        window.location = "../views/editproduct.html";
      };
    }
    if (i == 4) {
      newButton.onclick = function() {
        window.location = "../index.html";
      };
    }

    ButtonContainer.appendChild(newButton);
  }
  newInput = document.createElement("input");
  newInput.id = "kullaniciad";
  newInput.value = "Merhaba " + InputValue;
  newInput.readOnly = "readonly";
  InputContainer.appendChild(newInput);
}

function DisplayProduct() {
  var result = [];
  db.transaction(function(tx) {
    tx.executeSql("SELECT * FROM Urunler", [], function(tx, rs) {
      for (var i = 0; i < rs.rows.length; i++) {
        var row = rs.rows.item(i);
        result[i] = row;
      }

      var TableContainer, newTable;
      TableContainer = document.getElementsByClassName("products")[0];
      newTable = document.createElement("table");
      newTable.className = "product-table";
      TableContainer.appendChild(newTable);

      var TrContainer = document.getElementsByClassName("product-table")[0];

      var sayac = 0;
      for (var i = 0; i < 3; i++) {
        var newTr = document.createElement("tr");

        for (var j = 0; j < 3; j++) {
          var newTd = document.createElement("td");
          newTr.appendChild(newTd);

          if (sayac < result.length) {
            var newImg = document.createElement("img");
            newImg.src = "../img/" + result[sayac]["Urun_src"];
            newTd.appendChild(newImg);
            var newH = document.createElement("h2");
            newH.innerHTML = result[sayac]["Urun_adi"] + " Ayakkabı";
            var newH4 = document.createElement("h4");
            newH4.innerHTML =
              "Ürün fiyatı " + result[sayac]["Urun_fiyat"] + "TL";

            newButton = document.createElement("button");
            newButton.innerHTML = "Sepete Ekle";
            newButton.id = "button" + sayac; // buttona oluşacak  button kadar 0 dan başlayıp id attım.
            newButton.onclick = function() {
              // hangi butondan clicklenmiş onun id'sini aldım.
              getId(this.id);
              alert("Ürün Sepete Eklendi");
              window.location = "../views/product.html";
            };

            newTd2 = document.createElement("td");

            newInputCt = document.createElement("input");
            newInputCt.type = "number";
            newInputCt.min = "1";
            newInputCt.max = "99";
            newInputCt.value = "1";
            newInputCt.id = "InputCount" + sayac;

            newSelectNum = document.createElement("select");
            newSelectNum.id = "SelectNum" + sayac;
            var Numsec = [
              "Numara Seç",
              "40",
              "41",
              "42",
              "43",
              "44",
              "45",
              "46"
            ];
            for (var f = 0; f < 8; f++) {
              var option = document.createElement("option");
              option.value = option.textContent = Numsec[f];
              newSelectNum.appendChild(option);
            }
            newTd.appendChild(newH);
            newTd.appendChild(newH4);
            newTd2.appendChild(newButton);
            newTd.appendChild(newSelectNum);
            newTd2.appendChild(newInputCt);
            newTd.appendChild(newTd2);
            sayac++;
          }
          TrContainer.appendChild(newTr);
        }
      }
    });
  });
}
