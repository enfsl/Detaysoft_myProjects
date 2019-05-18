function Create() {
  CreateSelect();
  CreateProduct();
  ProductConfirm();
}
function CreateSelect() {
  createDb();
  var result = [];
  db.transaction(function(tx) {
    tx.executeSql("SELECT * FROM Urunler", [], function(tx, rs) {
      for (var i = 0; i < rs.rows.length; i++) {
        var row = rs.rows.item(i);
        result[i] = row;
      }

      var Container, newSelect, newButton;
      Container = document.getElementsByClassName("Selector")[0];
      newSelect = document.createElement("select");
      newSelect.id = "Urunsec";

      for (var i = 0; i < result.length; i++) {
        var option = document.createElement("option");
        option.value = option.textContent = result[i]["Urun_adi"];
        newSelect.appendChild(option);
      }
      Container.appendChild(newSelect);

      newButton = document.createElement("button");
      newButton.innerHTML = "Seçili olanı getir";
      newButton.onclick = function() {
        var x = document.getElementById("Urunsec").value;
        ResultProduct(x);
      };
      Container.appendChild(newButton);
    });
  });
}

function CreateProduct() {
  var DivContainer, newTable;
  DivContainer = document.getElementsByClassName("ResProduct")[0];
  newTable = document.createElement("table");
  newTable.className = "ResProduct-table";
  DivContainer.appendChild(newTable);

  var newTr, newTd, newImg, newAdi, newFiyat, newTanim, newSrc;
  newTr = document.createElement("tr");
  newTd = document.createElement("td");
  newAdi = document.createElement("input");
  newTanim = document.createElement("input");
  newFiyat = document.createElement("input");
  newSrc = document.createElement("input");

  newTr.id = "ProductTr";
  newTd.id = "ProductTd";
  newAdi.id = "ProductAdi";
  newTanim.id = "ProductTanim";
  newFiyat.id = "ProductFiyat";
  newSrc.id = "ProductSrc";

  newAdi.readOnly = "readonly";
  newTanim.readOnly = "readonly";
  newFiyat.readOnly = "readonly";
  newSrc.readOnly = "readonly";

  newAdi.value = "Ürün ismi";
  newTanim.value = "Ürün tanımı";
  newSrc.value = "Image ismi";
  newFiyat.value = "Ürün fiyatı";

  TableContainer = document.getElementsByClassName("ResProduct-table")[0];
  newTd.appendChild(newAdi);
  newTd.appendChild(newTanim);
  newTd.appendChild(newSrc);
  newTd.appendChild(newFiyat);

  newTr.appendChild(newTd);
  TableContainer.appendChild(newTr);
}

function ProductConfirm() {
  var Container, newButton, ButtonId, ButtonText;
  Container = document.getElementsByClassName("ProductUpdate")[0];
  ButtonId = ["onayla", "vazgec"];
  ButtonText = ["Değişikliği Kayıt et", "Vazgeç"];

  for (var i = 0; i < ButtonId.length; i++) {
    newButton = document.createElement("button");
    newButton.id = ButtonId[i];
    newButton.innerHTML = ButtonText[i];
    if (i == 0) {
      newButton.onclick = function() {
        ConfirmToDatabase();
      };
    }
    if (i == 1)
      newButton.onclick = function() {
        window.location = "../views/product.html";
      };
    Container.appendChild(newButton);
  }
}

function ResultProduct(productname) {
  var row = "";
  createDb();
  db.transaction(function(tx) {
    tx.executeSql(
      "SELECT Urun_id,Urun_adi,Urun_fiyat,Urun_tanim,Urun_src FROM Urunler WHERE Urun_adi=?",
      [productname],
      function(tx, rs) {
        for (var i = 0; i < rs.rows.length; i++) {
          row = rs.rows.item(i);
        }
        var adi, tanim, src, fiyat;
        adi = document.getElementById("ProductAdi");
        tanim = document.getElementById("ProductTanim");
        src = document.getElementById("ProductSrc");
        fiyat = document.getElementById("ProductFiyat");

        adi.value = row["Urun_adi"];
        tanim.value = row["Urun_tanim"];
        src.value = row["Urun_src"];
        fiyat.value = row["Urun_fiyat"];

        adi.readOnly = false;
        tanim.readOnly = false;
        src.readOnly = false;
        fiyat.readOnly = false;
      }
    );
  });
}

function ConfirmToDatabase() {
  var adi = document.getElementById("ProductAdi").value;
  var tanim = document.getElementById("ProductTanim").value;
  var src = document.getElementById("ProductSrc").value;
  var fiyat = document.getElementById("ProductFiyat").value;
  var urunselect = document.getElementById("Urunsec").value;
  if (
    adi.length < 1 ||
    adi == "Ürün ismi" ||
    tanim.length < 1 ||
    tanim == "Ürün tanımı" ||
    src.length < 1 ||
    src == "Image ismi" ||
    fiyat.length < 1 ||
    fiyat == "Ürün fiyatı"
  )
    alert("Lütfen eksiksiz ve düzgün değerler giriniz!");
  else BasketUpdate(adi, tanim, src, fiyat, urunselect);
}
