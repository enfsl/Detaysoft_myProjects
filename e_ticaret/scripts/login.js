function Create() {
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
    // Container'imde class'ım vardı, bu class'a child olarak yeni bir input eklediğimi bildiriyorum.
    inputContainer.appendChild(newInput);
  }
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
        window.location = "views/product.html";
      };
    } else {
      newButton.onclick = function() {
        window.location = "views/signup.html";
      };
    }
    buttonContainer.appendChild(newButton);
  }
}
