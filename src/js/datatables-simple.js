window.addEventListener("DOMContentLoaded", (event) => {
  // Simple-DataTables
  // https://github.com/fiduswriter/Simple-DataTables/wiki

  const datatablesSimple = document.getElementById("datatablesSimple");

  // if (datatablesSimple) {
  //     new simpleDatatables.DataTable(datatablesSimple);
  // }
  const data = require("employees.json");
  document.write(data.data);
  // console.log(data);
});
