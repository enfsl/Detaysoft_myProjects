function createDb() {
  var db_name = "Mydatabase";
  var db_version = "1.0";
  var db_describe = "e-commerce database";
  var db_size = 5120;
  this.db = openDatabase(db_name, db_version, db_describe, db_size);
}

function createMusteriTable() {
  createDb();
  db.transaction(function(tablo_olustur) {
    tablo_olustur.executeSql(
      "create table Musteriler(Isim TEXT, Soyisim TEXT, Mail TEXT, Telno TEXT, Adres TEXT, Kullanici_adi TEXT, Sifre TEXT )"
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
    //var checkusername = function() {
    //checkRecords(Kullanici_adi);
    // };
    kayit.executeSql(
      "insert into Musteriler(Isim,Soyisim,Mail,Telno,Adres,Kullanici_adi,Sifre) values(?,?,?,?,?,?,?)",
      [Isim, Soyisim, Mail, Telno, Adres, Kullanici_adi, Sifre]
    );
  });
}
/*
function checkRecords(kullaniciadi) {
  createDb();
  db.transaction(function(sorgu) {
    sorgu.executeSql(
      "SELECT Kullanici_adi FROM Musteriler WHERE Kullanici_adi = ?",
      [kullaniciadi]
    );
  });
}
*/
