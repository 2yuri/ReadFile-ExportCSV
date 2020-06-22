
const fileSelector = document.getElementById('file-selector');
fileSelector.addEventListener('change', (event) => {
  const fileList = event.target.files;
  const teste = Array.from(fileList);


  const yuri = teste.map((item) => {
    const { name } = item;

    return name;
  })



  for (let i = 0; i < teste.length; i++) {

    fetch(`./ext/${yuri[i]}`).then((res) =>
      res.text().then(data => {
        console.log(data);

        if (data == '') {
          const table = document.getElementById("myTable");
          const row = table.insertRow(1);
          const cell1 = row.insertCell(0);
          const cell2 = row.insertCell(1);
          const cell3 = row.insertCell(2);
          const cell4 = row.insertCell(3);
          const cell5 = row.insertCell(4);

          const [cpnjTitle, rest] = yuri[i].split('.')

          cell1.innerHTML = cpnjTitle;
          cell2.innerHTML = '0';
          cell3.innerHTML = '0';
          cell4.innerHTML = '0';
          cell5.innerHTML = '0';
        }

        const linesLength = data.match(/[^\n]*\n[^\n]*/gi).length;

        const array = data.match(/[^\n]*\n[^\n]*/gi);





        for (let i = 0; i < linesLength - 1; i++) {

          const dados = array[i];

          const [cnpj, qtd, desc, band, valor] = dados.split("|")


          const table = document.getElementById("myTable");
          const row = table.insertRow(1);
          const cell1 = row.insertCell(0);
          const cell2 = row.insertCell(1);
          const cell3 = row.insertCell(2);
          const cell4 = row.insertCell(3);
          const cell5 = row.insertCell(4);

          cell1.innerHTML = cnpj;
          cell2.innerHTML = qtd;
          cell3.innerHTML = desc;
          cell4.innerHTML = band;
          cell5.innerHTML = valor;
        }
      })
    );


  }

});

function download_table_as_csv(table_id) {
  // Select rows from table_id
  const rows = document.querySelectorAll('table#' + table_id + ' tr');
  // Construct csv
  let csv = [];
  for (let i = 0; i < rows.length; i++) {
    let row = [], cols = rows[i].querySelectorAll('td, th');
    for (let j = 0; j < cols.length; j++) {
      // Clean innertext to remove multiple spaces and jumpline (break csv)
      let data = cols[j].innerText.replace(/(\r\n|\n|\r)/gm, '').replace(/(\s\s)/gm, ' ')
      // Escape double-quote with double-double-quote (see https://stackoverflow.com/questions/17808511/properly-escape-a-double-quote-in-csv)
      data = data.replace(/"/g, '""');
      // Push escaped string
      row.push('"' + data + '"');
    }
    csv.push(row.join(';'));
  }
  const csv_string = csv.join('\n');
  // Download it
  const filename = 'export_' + table_id + '_' + new Date().toLocaleDateString() + '.csv';
  const link = document.createElement('a');
  link.style.display = 'none';
  link.setAttribute('target', '_blank');
  link.setAttribute('href', 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv_string));
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

