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
function createUrunTable() {
  createDb();
  db.transaction(function(tablo_olustur) {
    tablo_olustur.executeSql(
      "create table Urunler(Urun_id INTEGER PRIMARY KEY, Urun_adi TEXT, Urun_fiyat INTEGER, Urun_stok INTEGER, Urun_tanim TEXT, Urun_src TEXT)"
    );
  });
}
function CreateSepetTable() {
  createDb();
  db.transaction(function(tablo_olustur) {
    tablo_olustur.executeSql(
      "create table Sepet(Sepet_id INTEGER PRIMARY KEY, Kullanici_adi TEXT, Urun_id INTEGER, Ayakkabı_num TEXT, Adet INTEGER,  FOREIGN KEY (Kullanici_adi) REFERENCES Musteriler (Kullanici_adi), FOREIGN KEY (Urun_id) REFERENCES Urunler (Urun_id))"
    );
  });
}
createDb(); // database'i oluştur
createMusteriTable(); // tabloyu oluştur
createUrunTable();
CreateSepetTable();

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
      successRecInsert, // executesql'in 3'üncü parametresi result dönderiyor işlem başarılıysa
      errorRecInsert // 4'ünccü parametresi errorları dönderebiliyor
    ); // ben aşağıda yazdığım 2 fonksiyonu burada referans olarak gönderdim.
  });
}

function successRecInsert(transaction, res) {
  // executesql'de succes dönerse burası çalışıyor
  console.log(res);
  alert("Kayıt başarılı bir şekilde yapıldı!");
  window.location = "signup.html"; // inputları temizlemek için
}

function errorRecInsert(transaction, err) {
  // executesql'de error dönerse burası çalışıyor
  console.log(err);
  if (err.code === 6) {
    // kullanici_adi database'de var ise (hata kodu 6)
    alert("Böyle bir kullanıcı var, başka bir kullanıcı adı giriniz.");
  }
}
function InsertProduct(Urun_adi, Urun_fiyat, Urun_stok, Urun_tanim, Urun_src) {
  createDb(); // varsa open, yoksa create edicek.
  db.transaction(function(kayit) {
    kayit.executeSql(
      "insert into Urunler(Urun_adi,Urun_fiyat,Urun_stok,Urun_tanim,Urun_src) values(?,?,?,?,?)",
      [Urun_adi, Urun_fiyat, Urun_stok, Urun_tanim, Urun_src],
      successPdtInsert,
      errorPdtInsert
    );
  });
}
function successPdtInsert(transaction, res) {
  // executesql'de succes dönerse burası çalışıyor
  console.log(res);
  alert("Ürün başarılı bir şekilde oluşturuldu");
  window.location = "addproduct.html"; // inputları temizlemek için
}

function errorPdtInsert(transaction, err) {
  // executesql'de error dönerse burası çalışıyor
  console.log(err);
  alert("Hata!");
}
function InsertBasket(Kullanici_adi, Urun_id, Ayakkabı_num, Adet) {
  createDb();
  db.transaction(function(kayit) {
    kayit.executeSql(
      "insert into Sepet(Kullanici_adi,Urun_id,Ayakkabı_num,Adet) values (?,?,?,?)",
      [Kullanici_adi, Urun_id, Ayakkabı_num, Adet],
      succesBasktInsert,
      errorBasktInsert
    );
  });
}
function succesBasktInsert(transaction, res) {
  // executesql'de succes dönerse burası çalışıyor
  console.log(res);
  alert("Ürün Sepete Eklendi");
  window.location = "../views/product.html"; // inputları temizlemek için
}

function errorBasktInsert(transaction, err) {
  // executesql'de error dönerse burası çalışıyor
  console.log(err);
  alert("Hata!");
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
          setCookieUsername(Kullanici_adi); // kullanici adini cookie'e set et.
          window.location = "views/product.html"; // yönlendiriyor
        } else alert("girilen kullanıcı adı veya şifre yanlış!"); // değilse alerti bas.
      }
    );
  });
}

function BasketDelete(Sepet_id) {
  db.transaction(function(tx) {
    tx.executeSql(
      "delete from Sepet where Sepet_id=?",
      [Sepet_id],
      function(transaction, result) {
        alert("Sepet'ten kaldırıldı");
        window.location = "../views/basket.html";
      },
      function(transaction, error) {
        console.log(error);
      }
    );
  });
}

function BasketUpdate(urunadi, uruntanim, urunsrc, urunfiyat, selecturun) {
  createDb();
  db.transaction(function(tx) {
    tx.executeSql(
      "UPDATE Urunler SET Urun_adi=?, Urun_tanim=?, Urun_src=?, Urun_fiyat=? where Urun_adi=?",
      [urunadi, uruntanim, urunsrc, urunfiyat, selecturun],
      function(transaction, result) {
        alert("Ürün güncelleme başarılı");
        window.location = "../views/editproduct.html";
      },
      function(transaction, error) {
        console.log(error);
      }
    );
  });
}
