fetch('teste.txt').then((res) =>
  res.text().then(data => {
    const respon = data;

    const lines = data.match(/[^\n]*\n[^\n]*/gi).length;

    const array = data.match(/[^\n]*\n[^\n]*/gi);



    for (let i = 0; i < lines - 1; i++) {

      let dados = array[i];

      const [cnpj, qtd, desc, band, valor] = dados.split("|")


      var table = document.getElementById("myTable");
      var row = table.insertRow(1);
      var cell1 = row.insertCell(0);
      var cell2 = row.insertCell(1);
      var cell3 = row.insertCell(2);
      var cell4 = row.insertCell(3);
      var cell5 = row.insertCell(4);

      cell1.innerHTML = cnpj;
      cell2.innerHTML = qtd;
      cell3.innerHTML = desc;
      cell4.innerHTML = band;
      cell5.innerHTML = valor;
    }
  })
);
