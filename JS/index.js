"use strict";
let marrid = document.getElementById("isMarried");
let salary = document.getElementById("salary");
let adresSlect = document.getElementById("adresSlect");
let positions = document.getElementById("positions");
let job = document.getElementById("job");
let last = document.getElementById("last");
let first = document.getElementById("first");
let date = document.getElementById("date");
let result = document.getElementById("result");
let marrid1 = document.getElementById("isMarried1");
let salary1 = document.getElementById("salary1");
let adresSlect1 = document.getElementById("adresSlect1");
let positions1 = document.getElementById("positions1");
let job1 = document.getElementById("job1");
let last1 = document.getElementById("last1");
let first1 = document.getElementById("first1");
let date1 = document.getElementById("date1");
let editbtn = document.getElementById("edit");
let personID = null;
// Student data
let students = [];
// Add Student
let save = document.getElementById("save");
save === null || save === void 0 ? void 0 : save.addEventListener("click", () => {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    console.log(salary === null || salary === void 0 ? void 0 : salary.value);
    let studentID = JSON.parse(localStorage.getItem("persons") || "[]");
    let student = {
        id: studentID.length + 1,
        marrid: (_a = marrid === null || marrid === void 0 ? void 0 : marrid.checked) !== null && _a !== void 0 ? _a : false,
        salary: (_b = +(salary === null || salary === void 0 ? void 0 : salary.value)) !== null && _b !== void 0 ? _b : 0,
        adresSlect: (_c = adresSlect === null || adresSlect === void 0 ? void 0 : adresSlect.value) !== null && _c !== void 0 ? _c : "",
        positions: (_d = positions === null || positions === void 0 ? void 0 : positions.value) !== null && _d !== void 0 ? _d : "",
        job: (_e = job === null || job === void 0 ? void 0 : job.value) !== null && _e !== void 0 ? _e : "",
        last: (_f = last === null || last === void 0 ? void 0 : last.value) !== null && _f !== void 0 ? _f : "",
        first: (_g = first === null || first === void 0 ? void 0 : first.value) !== null && _g !== void 0 ? _g : "",
        date: (_h = date === null || date === void 0 ? void 0 : date.value) !== null && _h !== void 0 ? _h : "",
    };
    if (personID === null) {
        students.push(student);
    }
    else {
        students[personID] = student;
        personID = null;
    }
    saveToLocalStorage(student);
    render();
    clearInputValues();
});
// reset 
function clearInputValues() {
    if (marrid)
        marrid.checked = false;
    if (salary)
        salary.value = "";
    if (adresSlect)
        adresSlect.value = "all";
    if (positions)
        positions.value = "all";
    if (job)
        job.value = "all";
    if (last)
        last.value = "";
    if (first)
        first.value = "";
    if (date)
        date.value = "";
}
//  Student data add localStorage 
function saveToLocalStorage(student) {
    let persons = JSON.parse(localStorage.getItem("persons") || "[]");
    persons.push(student);
    localStorage.setItem("persons", JSON.stringify(persons));
}
// Get localStorage on student data
function fetchDataFromLocalStorage() {
    return JSON.parse(localStorage.getItem("persons") || "[]");
}
// Student ui 
function fetchData(data) {
    let ui = "";
    data.map((el, i) => (ui += `
      <tr>
        <th scope="row">${i + 1}</th>
        <td>${el.first}</td>
        <td>${el.last}</td>
        <td>${el.adresSlect}</td>
        <td>${el.job}</td>
        <td>${el.positions}</td>
        <td>${el.salary}$</td>
        <td>${el.date}</td>
        <td>${el.marrid ? "Yes" : "No"}</td>
        <td>
          <button type="button" class="btn btn-primary" data-bs-toggle="modal"
          data-bs-target="#exampleModal1" onclick="edit(${el.id})">Edit</button>
          <button type="button" class="btn btn-danger" onclick="delet(${el.id})">Delete</button>
        </td>
      </tr>`));
    result === null || result === void 0 ? void 0 : result.innerHTML = ui;
}
// Delete Student
function delet(id) {
    if (confirm("Delete employee")) {
        let persons = JSON.parse(localStorage.getItem("persons") || "[]");
        let updatedPersons = persons.filter((el) => el.id !== id);
        localStorage.setItem("persons", JSON.stringify(updatedPersons));
        fetchData(updatedPersons);
    }
}
// Edit Student
function edit(id) {
    let persons = JSON.parse(localStorage.getItem("persons") || "[]");
    let personEdit = persons.find((el) => el.id === id);
    if (personEdit) {
        first1.value = personEdit.first;
        last1.value = personEdit.last;
        date1.value = personEdit.date;
        marrid1.checked = personEdit.marrid;
        job1.value = personEdit.job;
        adresSlect1.value = personEdit.adresSlect;
        salary1.value = personEdit.salary;
        positions1.value = personEdit.positions;
        editbtn === null || editbtn === void 0 ? void 0 : editbtn.addEventListener("click", (e) => {
            e.preventDefault();
            let updateobj = {
                id: personEdit.id,
                first: first1.value,
                last: last1.value,
                date: date1.value,
                marrid: marrid1.checked,
                job: job1.value,
                adresSlect: adresSlect1.value,
                salary: +salary1.value,
                positions: positions1.value,
            };
            let updatedPersons = persons.map((el) => (el.id === personEdit.id ? updateobj : el));
            localStorage.setItem("persons", JSON.stringify(updatedPersons));
            fetchData(updatedPersons);
        });
    }
}
// Job Filter
let jobFilter = document.getElementById("jobFilter");
jobFilter === null || jobFilter === void 0 ? void 0 : jobFilter.addEventListener("change", () => {
    let value = jobFilter.value;
    let persons = JSON.parse(localStorage.getItem("persons") || "[]");
    let filteredPersons = value === "all" ? persons : persons.filter((el) => el.job === value);
    fetchData(filteredPersons);
});
// Positions Filter
let positionsFilter = document.getElementById("positionsfilter");
positionsFilter === null || positionsFilter === void 0 ? void 0 : positionsFilter.addEventListener("change", () => {
    let value = positionsFilter.value;
    let persons = JSON.parse(localStorage.getItem("persons") || "[]");
    let filteredPersons = value === "all" ? persons : persons.filter((el) => el.positions === value);
    fetchData(filteredPersons);
});
// Address Filter
let addressFilter = document.getElementById("addressFilter");
addressFilter === null || addressFilter === void 0 ? void 0 : addressFilter.addEventListener("change", () => {
    let value = addressFilter.value;
    let persons = JSON.parse(localStorage.getItem("persons") || "[]");
    let filteredPersons = value === "all" ? persons : persons.filter((el) => el.adresSlect === value);
    fetchData(filteredPersons);
});
// Salary Filter
let salaryFilter = document.getElementById("salaryFilter");
salaryFilter === null || salaryFilter === void 0 ? void 0 : salaryFilter.addEventListener("change", () => {
    let value = salaryFilter.value;
    let persons = JSON.parse(localStorage.getItem("persons") || "[]");
    if (value === "high") {
        persons.sort((a, b) => (b === null || b === void 0 ? void 0 : b.salary) - (a === null || a === void 0 ? void 0 : a.salary));
    }
    fetchData(persons);
    console.log(persons);
});
// Search 
let search = document.getElementById("search");
search === null || search === void 0 ? void 0 : search.addEventListener("input", () => {
    let value = search.value.toLowerCase();
    let persons = JSON.parse(localStorage.getItem("persons") || "[]");
    let filteredPersons = persons.filter((el) => el.first.toLowerCase().includes(value) ||
        el.last.toLowerCase().includes(value) ||
        el.job.toLowerCase().includes(value));
    fetchData(filteredPersons);
});
function render() {
    let persons = fetchDataFromLocalStorage();
    fetchData(persons);
}
render();
