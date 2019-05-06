function createDb() {
  var db_name = "Mydatabase";
  var db_version = "1.0";
  var db_describe = "e-commerce database";
  var db_size = 5120;
  var db = openDatabase(db_name, db_version, db_describe, db_size, function(
    db
  ) {
    console.log(db);
    console.log("Database açıldı yada ilk defa oluşturuldu!");
    createTable(db);
  });
}
function transError(t, e) {
  console.log(t);
  console.log(e);
  console.error("Hata oluştu! Kod:" + e.code + " Mesaj : " + e.message);
}

function transSuccess(t, r) {
  console.info("işlem başarılı!");
  console.log(t);
  console.log(r);
}

function createTable(db) {
  db.transaction(
    function(tx) {
      tx.executeSql(
        "create table Musteriler(Isim TEXT, Soyisim TEXT, Mail TEXT, Telno TEXT, Adres TEXT, Kullanici_adi TEXT, Sifre TEXT )",
        [],
        function(transaction, result) {
          console.log(result);
          console.log("Musteriler tablosu oluşturuldu");
          insertRecords(db);
        },
        function(transaction, error) {
          console.log(
            "transaction hatası Musteriler tablosu oluşturulamadı! :" + error
          );
        }
      );
    },
    transError,
    transSuccess
  );
}

function insertRecords(db) {
  if (db) {
    db.transaction(
      function(tx) {
        tx.executeSql(
          "insert into Musteriler(Isim,Soyisim,Mail,Telno,Adres,Kullanici_adi,Sifre) values(?,?,?,?,?,?,?)",
          [
            "emre",
            "nefesli",
            "emrenqw@gmail.com",
            "05462125652",
            "yozgat/merkez",
            "emrenqw",
            "123456"
          ],
          function(transaction, result) {
            console.log(result.insertId);
          },
          function(transaction, error) {
            console.log(error);
          }
        );
      },
      transError,
      transSuccess
    );
  } else {
    console.log("Database bulunamadı, Oluşturuluyor..");
    createDb();
  }
}

window.onload = createDb();
