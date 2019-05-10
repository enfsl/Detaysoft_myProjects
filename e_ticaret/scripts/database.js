function createDb() {
  var db_name = "Mydatabase";
  var db_version = "1.0";
  var db_describe = "e-commerce database";
  var db_size = 5120;
  this.db = openDatabase(db_name, db_version, db_describe, db_size); // createdb çağırıldığında beraberinde bunuda götürecek o yüzden this
}

function createMusteriTable() {
  createDb();
  db.transaction(function(tablo_olustur) {
    tablo_olustur.executeSql(
      "create table Musteriler(Isim TEXT, Soyisim TEXT, Mail TEXT, Telno TEXT, Adres TEXT, Kullanici_adi TEXT UNIQUE, Sifre TEXT)"
    );
  });
}
createDb(); // database'i oluştur
createMusteriTable(); // tabloyu oluştur

function insertRecords(
  Isim,
  Soyisim,
  Mail,
  Telno,
  Adres,
  Kullanici_adi,
  Sifre
) {
  createDb();
  db.transaction(function(kayit) {
    kayit.executeSql(
      "insert into Musteriler(Isim,Soyisim,Mail,Telno,Adres,Kullanici_adi,Sifre) values(?,?,?,?,?,?,?)",
      [Isim, Soyisim, Mail, Telno, Adres, Kullanici_adi, Sifre],
      successInsert, // executesql'in 3'üncü parametresi result dönderiyor işlem başarılıysa
      errorInsert // 4'ünccü parametresi errorları dönderebiliyor
    ); // ben aşağıda yazdığım 2 fonksiyonu burada referans olarak gönderdim.
  });
}

function successInsert(transaction, res) {
  // executesql'de succes dönerse burası çalışıyor
  console.log(res);
  alert("Kayıt başarılı bir şekilde yapıldı!");
  window.location = "signup.html"; // inputları temizlemek için
}

function errorInsert(transaction, err) {
  // executesql'de error dönerse burası çalışıyor
  console.log(err);
  if (err.code === 6) {
    // kullanici_adi database'de var ise (hata kodu 6)
    alert("Böyle bir kullanıcı var, başka bir kullanıcı adı giriniz.");
  }
}
function setCookie(username) {
  // kullanıcı giriş yaptığında cookie'ye kullanıcı adını set edicek.
  document.cookie = username;
}
function checkRecord(Kullanici_adi, Sifre) {
  createDb();
  db.transaction(function(kayitkontrol) {
    kayitkontrol.executeSql(
      "SELECT * FROM Musteriler WHERE Kullanici_adi=? AND Sifre=?",
      [Kullanici_adi, Sifre],
      function(kayitkontrol, results) {
        // results'a sorgudan gelenler düşüyor
        if (results.rows.length > 0) {
          // eğer sorgudan geriye row dönerse kullanıcıyı ürün sayfasına
          setCookie(Kullanici_adi); // kullanici adini cookie'e set et.
          window.location = "views/product.html"; // yönlendiriyor
        } else alert("girilen kullanıcı adı veya şifre yanlış!"); // değilse alerti bas.
      }
    );
  });
}
