var nameInput = document.getElementById("name");
var ageInput = document.getElementById("age");
var salaryInput = document.getElementById("salary");
var phoneInput = document.getElementById("phone");
var addBtn = document.getElementById("addBtn");
var inputs = document.getElementsByClassName("form-control");
var employees = [];
var editInput;

addBtn.onclick = function () {
  if (addBtn.innerHTML == "Add Employee") {
    addEmployee();
  } else {
    editEmployee();
  }
  displayData();
  resetForm();
  localStorage.setItem("employeesList", JSON.stringify(employees));
};

if (localStorage.getItem("employeesList") == null) {
  employees = [];
} else {
  employees = JSON.parse(localStorage.getItem("employeesList"));
  displayData();
}

function addEmployee() {
  var employee = {
    name: nameInput.value,
    age: ageInput.value,
    salary: salaryInput.value,
    phone: phoneInput.value,
  };

  employees.push(employee);
  localStorage.setItem("employeesList", JSON.stringify(employees));
}

function displayData() {
  var trs = "";
  for (var i = 0; i < employees.length; i++) {
    trs += `
       <tr>
       <td>${employees[i].name}</td>
       <td>${employees[i].age}</td>
       <td>${employees[i].salary}</td>
       <td>${employees[i].phone}</td>
       <td><button onclick="getEmpData(${i})" class="btn btn-warning">update</button></td>
       <td><button onclick="deleteEmployee(${i})" class="btn btn-danger">delete</button></td>      
       </tr>
       `;
  }
  document.getElementById("tableBody").innerHTML = trs;
}

function resetForm() {
  for (var i = 0; i < inputs.length; i++) {
    inputs[i].value = "";
  }
}

function deleteEmployee(index) {
  employees.splice(index, 1);
  localStorage.setItem("employeesList", JSON.stringify(employees));
  displayData();
}

function searchEmployee(item) {
  var trs = "";
  for (var i = 0; i < employees.length; i++) {
    if (employees[i].name.toLowerCase().includes(item.toLowerCase())) {
      trs += `
         <tr>
         <td>${employees[i].name}</td>
         <td>${employees[i].age}</td>
         <td>${employees[i].salary}</td>
         <td>${employees[i].phone}</td>
         <td><button onclick="updateEmployee(${i})" class="btn btn-warning">update</button></td>
         <td><button onclick="deleteEmployee(${i})" class="btn btn-danger">delete</button></td>
         </tr>
         `;
    }
    document.getElementById("tableBody").innerHTML = trs;
  }
}

function getEmpData(index) {
  editInput = index;
  nameInput.value = employees[index].name;
  ageInput.value = employees[index].age;
  salaryInput.value = employees[index].salary;
  phoneInput.value = employees[index].phone;

  addBtn.innerHTML = "update";
}

function editEmployee() {
  var employee = {
    name: nameInput.value,
    age: ageInput.value,
    salary: salaryInput.value,
    phone: phoneInput.value,
  };
  employees[editInput] = employee;
  localStorage.setItem("employeesList", JSON.stringify(employees));
}

function validateName() {
  var nameRegex = /^[A-Za-z]{2,7}$/;
  if (!nameRegex.test(nameInput.value)) {
    addBtn.disabled = "true";
  } else {
    addBtn.removeAttribute("disabled");
  }
}

function validateAge() {
  var ageRegex = /^([2-7][0-9]|80)$/;
  if (!ageRegex.test(ageInput.value)) {
    addBtn.disabled = "true";
  } else {
    addBtn.removeAttribute("disabled");
  }
}

function validateSalary() {
  var salaryRegex = /^[0-9]{0,7}$/;
  if (!salaryRegex.test(salaryInput.value)) {
    addBtn.disabled = "true";
  } else {
    addBtn.removeAttribute("disabled");
  }
}

function validatePhone() {
  var phoneRegex = /^01[0125][0-9]{8}$/;
  if (!phoneRegex.test(phoneInput.value)) {
    addBtn.disabled = "true";
  } else {
    addBtn.removeAttribute("disabled");
  }
}

nameInput.onkeyup = function () {
  validateName();
};
ageInput.onkeyup = function () {
  validateAge();
};
salaryInput.onkeyup = function () {
  validateSalary();
};
/*phoneInput.onkeyup = function () {
  validatePhone();
};*/
