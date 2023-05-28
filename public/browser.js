const itemTemplate = (item) => {
  return `<li class="list-group-item list-group-item-action d-flex align-items-center justify-content-between">
  <span class="item-text">${item.text}</span>
  <div>
    <button data-id ="${item._id}" class="edit-me btn btn-secondary btn-sm mr-1">Edit</button>
    <button data_id ="${item._id}" class="delete-me btn btn-danger btn-sm">Delete</button>
  </div>
</li>`;
};

// chargement page initial
let ourHtml = items
  .map((item) => {
    return itemTemplate(item);
  })
  .join("");
document.getElementById("item-list").insertAdjacentHTML("beforeend", ourHtml);

// création
let createField = document.getElementById("create-field");

document.getElementById("create-form").addEventListener("submit", (e) => {
  e.preventDefault();
  axios
    .post("/create-item", {
      text: createField.value,
    })
    .then(function (response) {
      // create the HTML for a new item
      document
        .getElementById("item-list")
        .insertAdjacentHTML("beforeend", itemTemplate(response.data));
    })
    .catch(function () {
      console.log("Please try again later");
    });
});

// j'update les données du tableau et de la DB //

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("edit-me")) {
    let userInput = prompt(
      "modifié la tâche",
      e.target.parentElement.parentElement.querySelector(".item-text").innerHTML
    );
    if (userInput) {
      axios
        .post("/update-item", {
          text: userInput,
          data: e.target.getAttribute("data-id"),
        })
        .then(function () {
          e.target.parentElement.parentElement.querySelector(
            ".item-text"
          ).innerHTML = userInput;
        })
        .catch(function () {
          console.log("Please try again later");
        });
    }
  }
});

// Je supprime la données du tableau et de la DB //
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete-me")) {
    if (confirm("voulez-vous vraiment supprimer la tâche ?")) {
      axios
        .post("/delete-item", {
          data: e.target.getAttribute("data_id"),
        })
        .then(function () {
          e.target.parentElement.parentElement.remove();
        })
        .catch(function () {
          console.log("Please try again later");
        });
    }
  }
});
