function Create() {
  InputCreate();
  ButtonCreate();
}

function InputCreate() {
  // dinamik olarak inputlarımı oluşturuyorum.
  var inputContainer, inputPholder, inputId, newInput;
  inputContainer = document.getElementsByClassName("inputs")[0];
  inputPholder = [
    "İsim",
    "Soyisim",
    "Mail Adresi",
    "Telefon Numarası",
    "Adres",
    "Kullanıcı Adı",
    "Şifre"
  ];
  inputId = [
    "isim",
    "soyisim",
    "mail",
    "telno",
    "adres",
    "kullaniciadi",
    "sifre"
  ];

  for (var i = 0; i < inputId.length; i++) {
    newInput = document.createElement("input");
    newInput.placeholder = inputPholder[i];
    newInput.id = inputId[i];
    inputContainer.appendChild(newInput);
  }
}
function ButtonCreate() {
  // kayıt ol ve iptal 2 tane buttons
  var buttonContainer, buttonText, buttonId, newButton;
  buttonContainer = document.getElementsByClassName("buttons")[0];
  buttonText = ["Kayıt ol", "Vazgeç"];
  buttonId = ["kayitol", "vazgec"];
  for (var i = 0; i < buttonId.length; i++) {
    newButton = document.createElement("button");
    newButton.id = buttonId[i];
    newButton.innerHTML = buttonText[i];
    // if(i==0)'ise kayıt işlemini database'e geçir bir uyarı ver
    // değilse login sayfasına dönder
    if (i == 0) {
      newButton.onclick = function() {
        TovalueDb(); //  inputlardaki değerleri alacak bir fonksiyon yazıp burada çağır
        alert("Kayıt Başarılı");
        window.location = "signup.html"; // inputları temizlemek için sayfayı yeniliyor birnevi.
      };
    } else {
      // vazgeç butonuna basıldığında
      newButton.onclick = function() {
        window.location = "../index.html";
      };
    }
    buttonContainer.appendChild(newButton);
  }
}
// onclickte bu fonksiyon tetiklendi, bu fonksiyonda databasede'ki insert işlemini tetikleyecek.
function TovalueDb() {
  var isim = document.getElementById("isim").value;
  var soyisim = document.getElementById("soyisim").value;
  var mail = document.getElementById("mail").value;
  var telno = document.getElementById("telno").value;
  var adres = document.getElementById("adres").value;
  var kullaniciadi = document.getElementById("kullaniciadi").value;
  var sifre = document.getElementById("sifre").value;
  insertRecords(isim, soyisim, mail, telno, adres, kullaniciadi, sifre);
}
