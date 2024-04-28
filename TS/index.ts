let marrid = document.getElementById("isMarried") as HTMLInputElement;
let salary = document.getElementById("salary") as HTMLInputElement;
let adresSlect = document.getElementById("adresSlect") as HTMLInputElement;
let positions = document.getElementById("positions") as HTMLInputElement;
let job = document.getElementById("job") as HTMLInputElement;
let last = document.getElementById("last") as HTMLInputElement;
let first = document.getElementById("first") as HTMLInputElement;
let date = document.getElementById("date") as HTMLInputElement;
let result: HTMLElement | null = document.getElementById("result");
let marrid1 = document.getElementById("isMarried1") as HTMLInputElement;
let salary1 = document.getElementById("salary1") as HTMLInputElement;
let adresSlect1 = document.getElementById("adresSlect1") as HTMLInputElement;
let positions1 = document.getElementById("positions1") as HTMLInputElement;
let job1 = document.getElementById("job1") as HTMLInputElement;
let last1 = document.getElementById("last1") as HTMLInputElement;
let first1 = document.getElementById("first1") as HTMLInputElement;
let date1 = document.getElementById("date1") as HTMLInputElement;
let editbtn = document.getElementById("edit");
let personID: number | null = null;




// Student types
type Student = {
  id: number;
  marrid: boolean;
  salary: number;
  adresSlect: string;
  positions: string;
  job: string;
  last: string;
  first: string;
  date: string;
};

// Student data
let students: Student[] = [];

// Add Student
let save: HTMLElement | null = document.getElementById("save");

save?.addEventListener("click", () => {
  console.log(salary?.value);
  let studentID: Student[] = JSON.parse(localStorage.getItem("persons") || "[]");
  let student: Student = {
    id: studentID.length + 1,
    marrid: marrid?.checked ?? false,
    salary: +salary?.value ?? 0,
    adresSlect: adresSlect?.value ?? "",
    positions: positions?.value ?? "",
    job: job?.value ?? "",
    last: last?.value ?? "",
    first: first?.value ?? "",
    date: date?.value ?? "",
  };
  if (personID === null) {
    students.push(student);    
  } else {
    students[personID] = student;
    personID = null;
  }
  saveToLocalStorage(student);
  render();
  clearInputValues()

});

// reset 
function clearInputValues () {
  if (marrid) marrid.checked = false;
  if (salary) salary.value = "";
  if (adresSlect) adresSlect.value = "all";
  if (positions) positions.value = "all";
  if (job) job.value = "all";
  if (last) last.value = "";
  if (first) first.value = "";
  if (date) date.value = "";
}



//  Student data add localStorage 
function saveToLocalStorage(student: Student) {
  let persons: Student[] = JSON.parse(localStorage.getItem("persons") || "[]");
  persons.push(student);
  localStorage.setItem("persons", JSON.stringify(persons));
}

// Get localStorage on student data
function fetchDataFromLocalStorage(): Student[] {
  return JSON.parse(localStorage.getItem("persons") || "[]");
}

// Student ui 
function fetchData(data: Student[]) {
  let ui = "";
  data.map((el , i) => (
    ui += `
      <tr>
        <th scope="row">${i+1}</th>
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
      </tr>`
  ));
  result?.innerHTML = ui;
}

// Delete Student
function delet(id: number) {
  if (confirm("Delete employee")) {
    let persons: Student[] = JSON.parse(localStorage.getItem("persons") || "[]");
    let updatedPersons = persons.filter((el) => el.id !== id);
    localStorage.setItem("persons", JSON.stringify(updatedPersons));
    fetchData(updatedPersons);
  }
}

// Edit Student
function edit(id: number) {
  let persons: Student[] = JSON.parse(localStorage.getItem("persons") || "[]");
  let personEdit = persons.find((el) => el.id === id);
  if (personEdit) {
    first1!.value = personEdit.first;
    last1!.value = personEdit.last;
    date1!.value = personEdit.date;
    marrid1!.checked = personEdit.marrid;
    job1!.value = personEdit.job;
    adresSlect1!.value = personEdit.adresSlect;
    salary1!.value = personEdit.salary;
    positions1!.value = personEdit.positions;
    editbtn?.addEventListener("click", (e) => {
      e.preventDefault();
      let updateobj: Student = {
        id: personEdit.id,
        first: first1!.value,
        last: last1!.value,
        date: date1!.value,
        marrid: marrid1!.checked,
        job: job1!.value,
        adresSlect: adresSlect1!.value,
        salary: +salary1!.value,
        positions: positions1!.value,
      };
      let updatedPersons = persons.map((el) => (el.id === personEdit!.id ? updateobj : el));
      localStorage.setItem("persons", JSON.stringify(updatedPersons));
      fetchData(updatedPersons);
    });
  }
}

// Job Filter
let jobFilter = document.getElementById("jobFilter") as HTMLSelectElement;

jobFilter?.addEventListener("change", () => {
  let value = jobFilter.value;
  let persons: Student[] = JSON.parse(localStorage.getItem("persons") || "[]");
  let filteredPersons = value === "all" ? persons : persons.filter((el) => el.job === value);
  fetchData(filteredPersons);
});


// Positions Filter
let positionsFilter = document.getElementById("positionsfilter") as HTMLSelectElement;

positionsFilter?.addEventListener("change", () => {
  let value = positionsFilter.value;

  let persons: Student[] = JSON.parse(localStorage.getItem("persons") || "[]");
  let filteredPersons = value === "all" ? persons : persons.filter((el) => el.positions === value);
  fetchData(filteredPersons);
});

// Address Filter
let addressFilter = document.getElementById("addressFilter") as HTMLSelectElement;

addressFilter?.addEventListener("change", () => {
  let value = addressFilter.value;
  
  let persons: Student[] = JSON.parse(localStorage.getItem("persons") || "[]");
  let filteredPersons = value === "all" ? persons : persons.filter((el) => el.adresSlect === value);
  fetchData(filteredPersons);
});

// Salary Filter
let salaryFilter = document.getElementById("salaryFilter") as HTMLSelectElement;

salaryFilter?.addEventListener("change", () => {
  let value = salaryFilter.value;
  let persons: Student[] = JSON.parse(localStorage.getItem("persons") || "[]");
  if (value === "high") {
  persons.sort((a, b) => b?.salary - a?.salary);
   
 } 
  fetchData(persons); 
  console.log(persons);
  
});

// Search 
let search = document.getElementById("search") as HTMLInputElement;

search?.addEventListener("input", () => {
  let value = search.value.toLowerCase();
  let persons: Student[] = JSON.parse(localStorage.getItem("persons") || "[]");
  let filteredPersons = persons.filter(
    (el) =>
      el.first.toLowerCase().includes(value) ||
      el.last.toLowerCase().includes(value) ||
      el.job.toLowerCase().includes(value)
  );
  fetchData(filteredPersons);
});

function render() {
  let persons: Student[] = fetchDataFromLocalStorage();
  fetchData(persons);
}

render();
