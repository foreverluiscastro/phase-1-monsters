document.addEventListener("DOMContentLoaded", () => {
  fetchMonsters();
  createMonsterForm();
  getTotalCollectionCount();

  const form = document.getElementById("create-monster-form");
  form.addEventListener("submit", submitMonster);

  const previousPage = document.getElementById("back");
  previousPage.addEventListener("click", goToPreviousPage);
  const nextPage = document.getElementById("forward");
  nextPage.addEventListener("click", goToNextPage);
});

let currentPage = 1;
let totalColectionCount;

function goToNextPage() {
  const mainConatiner = document.getElementById("monster-container");
  const lastElementId = mainConatiner.lastElementChild.id;
  if (lastElementId < totalColectionCount) {
    console.log("next page");
    currentPage += 1;
    fetchMonsters();
  }
}

function goToPreviousPage() {
  if (currentPage > 1) {
    console.log("going back a page");
    currentPage -= 1;
    fetchMonsters();
  }
}

function getTotalCollectionCount() {
    fetch("http://localhost:3000/monsters")
    .then((res) => res.json())
    .then((collection) => (totalColectionCount = collection.length))
}

function fetchMonsters() {
  fetch(`http://localhost:3000/monsters/?_limit=50&_page=${currentPage}`)
    .then((res) => res.json())
    .then((monsters) => {
      const mainConatiner = document.getElementById("monster-container");
      mainConatiner.innerHTML = "";
      monsters.forEach((monster) => renderMonster(monster));
    });
}

function renderMonster(monster) {
  const mainConatiner = document.getElementById("monster-container");
  const div = document.createElement("div");
  div.id = monster.id;
  const name = document.createElement("h2");
  name.innerText = monster.name;
  const age = document.createElement("p");
  const bold = document.createElement("b");
  age.appendChild(bold);
  bold.innerText = "Age: " + monster.age;
  const bio = document.createElement("p");
  bio.innerText = monster.description;
  div.appendChild(name);
  div.appendChild(age);
  div.appendChild(bio);
  mainConatiner.appendChild(div);
}

function createMonsterForm() {
  const formConatiner = document.getElementById("create-monster");
  const form = document.createElement("form");
  form.id = "create-monster-form";
  const nameInput = document.createElement("input");
  nameInput.placeholder = "name...";
  const ageInput = document.createElement("input");
  ageInput.placeholder = "age...";
  const descriptionInput = document.createElement("input");
  descriptionInput.placeholder = "description...";
  const submitButton = document.createElement("button");
  submitButton.type = "submit";
  submitButton.innerText = "Create";
  form.appendChild(nameInput);
  form.appendChild(ageInput);
  form.appendChild(descriptionInput);
  form.appendChild(submitButton);
  formConatiner.appendChild(form);
}

function submitMonster(e) {
  e.preventDefault();
  const name = e.target.children[0].value;
  const age = e.target.children[1].value;
  const description = e.target.children[2].value;
  fetch("http://localhost:3000/monsters", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      name: name,
      age: age,
      description: description,
    }),
  })
};