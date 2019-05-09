function Create() {
  InputCreate();
  ButtonCreate();
}
function InputCreate() {
  // Container'ler içerisinde class ismi şu olan objeyi çekip atmam için, [0]'da o objeyi alabilmem için.
  var inputContainer, newInput, inputValue, inputId;
  inputContainer = document.getElementsByClassName("inputs")[0];
  inputId = ["kullaniciad", "kullanicisifre"];
  inputValue = ["Kullanıcı Adı", "Kullanıcı Şifresi"];
  for (var i = 0; i < inputValue.length; i++) {
    // newinput adında bir değişkene input elementi oluşturup atıyorum. ve id value değerlerini veriyorum.
    newInput = document.createElement("input");
    newInput.id = inputId[i];
    newInput.placeholder = inputValue[i];
    if (newInput.id == "kullanicisifre") newInput.type = "password";
    // Container'imde class'ım vardı, bu class'a child olarak yeni bir input eklediğimi bildiriyorum.
    inputContainer.appendChild(newInput);
  }
}
function ButtonCreate() {
  var buttonContainer, newButton, buttonId, buttonText;
  buttonContainer = document.getElementsByClassName("buttons")[0];
  buttonId = ["giris", "kayitol"];
  buttonText = ["Giriş yap", "Kayıt ol"];
  for (var i = 0; i < buttonId.length; i++) {
    newButton = document.createElement("button");
    newButton.id = buttonId[i];
    newButton.innerHTML = buttonText[i];
    newButton.type = "button";
    // eğer giriş butonu ise product.html'e yönlendirilecek, kayıt olma butonu ise signup.html'e
    if (i == 0) {
      newButton.onclick = function() {
        checkAccountdb();
      };
    }
    if (i == 1)
      newButton.onclick = function() {
        window.location = "views/signup.html";
      };
    buttonContainer.appendChild(newButton);
  }
}
function checkAccountdb() {
  // inputlara girilen değeri kontrol edip inputlardaki değerleri database.js'teki
  // checkreord'a yollayıp fonksiyonunu çağıracak.
  var kullaniciadi = document.getElementById("kullaniciad").value;
  var kullanicisifre = document.getElementById("kullanicisifre").value;
  if (kullaniciadi.length >= 4 && kullanicisifre.length >= 6) {
    checkRecord(kullaniciadi, kullanicisifre);
  } else
    alert(
      "Kullanıcı adı 4, Kullanıcı şifresi 6 karakter veya daha büyük olmalıdır!"
    );
}
