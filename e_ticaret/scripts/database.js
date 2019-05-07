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
      success, // executesql'in 3'üncü parametresi result dönderiyor işlem başarılıysa
      error // 4'ünccü parametresi errorları dönderebiliyor
    ); // ben aşağıda yazdığım 2 fonksiyonu burada referans olarak gönderdim.
  });
}

function success(transaction, res) {
  // executesql'de succes dönerse burası çalışıyor
  console.log(res);
  alert("Kayıt başarılı bir şekilde yapıldı!");
}

function error(transaction, err) {
  // executesql'de error dönerse burası çalışıyor
  console.log(err);
  if (err.code === 6) {
    // kullanici_adi database'de var ise (hata kodu 6)
    alert("Böyle bir kullanıcı var, başka bir kullanıcı adı giriniz.");
  }
}
