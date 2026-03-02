Swal.fire({
  title: "👥 Set Up Your Team",
  html: `
    <p>Enter team member names (comma separated):</p>
    <input id="team" class="swal2-input" placeholder="Nada, Sara, Omar">
  `,
  confirmButtonText: "Create Board",

  preConfirm: () => {
    const value = document.getElementById("team").value.trim();

    if (!value) {
      Swal.showValidationMessage("Please enter at least one name");
      return;
    }

    return value.split(",").map((name) => name.trim());
  },
}).then((result) => {
  if (result.isConfirmed) {
    createTeamMembers(result.value);
  }
});
/**************************Select Elements**********************  */
let addTaskBtn = document.querySelector(".addTaskBtn");
let taskName = document.querySelector(".taskName");
let taskCard = document.querySelectorAll(".taskCard");
let noTasks = document.querySelector(".noTasks");
let noUserTasks = document.querySelectorAll(".noUserTasks");
let greenCard = document.querySelector("#greenCard");
let deleteTaskBtn = document.querySelectorAll(".deleteTaskBtn");
let userCard = document.querySelectorAll(".userCard");
let container = document.querySelector(".container");
let maingreenBox = document.querySelector(".maingreenBox");
let userTaskCard = document.querySelectorAll(".userTaskCard");
let select = document.querySelectorAll(".select");
let greenBox = document.querySelector(".greenBox");

let id = 0;
/**********************Event listener for add task button******************** */

addTaskBtn.addEventListener("click", function (e) {
  if (taskName.value) {
    e.preventDefault();
    noTasks.setAttribute("style", "display: none;");
    let newTaskCard = taskCard[0].cloneNode(true);
    newTaskCard.children[0].innerText = taskName.value;
    newTaskCard.setAttribute("style", "display: block;");
    newTaskCard.setAttribute("draggable", "true");
    newTaskCard.setAttribute("id", `${id}`);
    id++;
    console.log(newTaskCard);
    greenCard.append(newTaskCard);
    taskName.value = "";
  }

  taskCard = document.querySelectorAll(".taskCard");
  //update number of task cards
  mainCard.querySelector(".number").innerText = taskCard.length - 1;
});

/**********************Event listener for delete task button******************** */

document.addEventListener("click", function (e) {
  if (e.target.classList.contains("deleteTaskBtn")) {
    e.preventDefault();

    if (e.target.parentElement.classList.contains("taskCard")) {
      e.target.parentElement.remove();
      taskCard = document.querySelectorAll(".taskCard");
      mainCard.querySelector(".number").innerText = taskCard.length - 1;
      //if there is no tasks show the no tasks paragraph
      if (taskCard.length === 1) {
        noTasks.setAttribute("style", "display: block;");
      }
    } else if (e.target.parentElement.classList.contains("userTaskCard")) {
      let userCard = e.target.parentElement.parentElement.parentElement;

      let numberUser = userCard.querySelector(".number");
      console.log(numberUser);
      e.target.parentElement.remove();

      userTaskCard = userCard.querySelectorAll(".userTaskCard");
      numberUser.innerText = userTaskCard.length - 1;
      //if there is no tasks show the no tasks paragraph
      if (userTaskCard.length === 1) {
        userCard
          .querySelector(".noUserTasks")
          .setAttribute("style", "display: block;");
      }
    }
  }
});
/************************************Create user cards*********************************** */

let createTeamMembers = function (teamMembers) {
  teamMembers.forEach(function (username) {
    //first letter upperCase
    username = username[0].toUpperCase() + username.slice(1);
    //noUserTasks.setAttribute("style", "display: none;");
    let newUserCard = userCard[0].cloneNode(true);
    newUserCard.querySelector(".username").innerText = `${username}`;
    newUserCard.setAttribute("style", "display: inline-block;");
    container.append(newUserCard);
  });
};

/************************************Drag cards*********************************** */

document.addEventListener("dragstart", function (e) {
  if (e.target.classList.contains("taskCard")) {
    greenCard.classList.add("mainboxBorders");
    //console.log(e.target.children[0].innerText);
    e.dataTransfer.setData("taskId", e.target.id);
    console.log("e", e.dataTransfer.getData("taskId"));
    console.log("data", e.dataTransfer);
    console.log("drag started");
  }
  if (e.target.classList.contains("userTaskCard")) {
    greenBox.classList.add("boxBorders");
    e.dataTransfer.setData("taskId", e.target.id);
    console.log("drag red started");
  }
});

document.addEventListener("dragleave", function (e) {
  e.preventDefault();
  if (e.target.classList.contains("maingreenBox")) {
    e.target.classList.remove("mainboxBorders");
    console.log("drag leave");
  } else if (e.target.classList.contains("greenBox")) {
    e.target.classList.remove("boxBorders");
    console.log("drag red leave");
  }
});

document.addEventListener("dragover", function (e) {
  e.preventDefault();

  if (
    e.target.classList.contains("maingreenBox") &&
    !e.target.classList.contains("mainboxBorders")
  ) {
    e.target.classList.add("mainboxBorders");
    console.log("drag over");
  }
});

/************************************drop Event listener for user card **************************** */
document.addEventListener("drop", function (e) {
  e.preventDefault();

  let greenbox = e.target.closest(".greenBox");
  if (!greenbox) {
    return;
  }

  greenbox.classList.remove("boxBorders");
  //remove no user tasks paragraph
  greenbox
    .querySelector(".noUserTasks")
    .setAttribute("style", "display: none;");
  //get task Id
  let taskId = e.dataTransfer.getData("taskId");
  console.log("taskId", taskId);
  if (!taskId) {
    return;
  }
  //get taskCard element
  let newUserTaskCard = document.getElementById(`${taskId}`);
  let parent;
  if (newUserTaskCard && !newUserTaskCard.classList.contains("userTaskCard")) {
    //delete task card class style style from it
    newUserTaskCard.classList.remove("taskCard");
    //add user card red style class to it
    newUserTaskCard.classList.add("userTaskCard");
    //add select list to it
    let newSelect = select[0].cloneNode(true);
    newUserTaskCard.append(newSelect);
    parent = newUserTaskCard.parentElement.parentElement;
    greenbox.appendChild(newUserTaskCard);
    let numberOfCards = parseInt(parent.querySelector(".number").innerText);
    parent.querySelector(".number").innerText = `${numberOfCards - 1}`;
    //if user caed is empty , print no tasks paragraph
    if (numberOfCards === 1) {
      parent.querySelector(".noTasks").setAttribute("style", "display: block;");
    }
    console.log("main");
  } else {
    console.log("user");
    //console.log(newUserTaskCard.parentElement);
    parent = newUserTaskCard.parentElement.parentElement;
    //let numberOfCards = parseInt(parent.querySelector(".number").innerText);
    greenbox.appendChild(newUserTaskCard);
    let numberOfCards = parent.querySelectorAll(".userTaskCard").length;
    console.log("length", numberOfCards);
    parent.querySelector(".number").innerText = `${numberOfCards - 1}`;
    //if user caed is empty , print no tasks paragraph
    if (numberOfCards === 1) {
      parent
        .querySelector(".noUserTasks")
        .setAttribute("style", "display: block;");
    }
  }
  console.log(parent);

  //update number of task cards
  userTaskCard = greenbox.querySelectorAll(".userTaskCard");

  greenbox.parentElement.querySelector(".number").innerText =
    userTaskCard.length - 1;

  console.log("drop");
});

document.addEventListener("dragenter", function (e) {
  e.preventDefault();
  if (e.target.classList.contains("greenBox")) {
    console.log("greenBox", e.target);
    e.target.classList.add("boxBorders");
    maingreenBox = document.querySelector(".maingreenBox");
    maingreenBox.classList.remove("mainboxBorders");
    console.log("drag red leave");
  }
});

/***********************drop Event listener for main card *********************** */
document.addEventListener("drop", function (e) {
  if (e.target.classList.contains("maingreenBox")) {
    let mainbox = e.target;
    console.log("e.target", e.target);
    mainbox.classList.remove("mainboxBorders");
    //remove no user tasks paragraph
    mainbox.querySelector(".noTasks").setAttribute("style", "display: none;");
    //get task Id
    let taskId = e.dataTransfer.getData("taskId");
    //console.log("taskId : ", taskId )

    //get taskCard element
    let newUserTaskCard = document.getElementById(`${taskId}`);
    let parent;
    if (newUserTaskCard && !newUserTaskCard.classList.contains("taskCard")) {
      //delete user card red style class from it
      newUserTaskCard.classList.remove("userTaskCard");
      //add task card class style to it
      newUserTaskCard.classList.add("taskCard");
      //remove select element
      newUserTaskCard.querySelector(".select").remove();
      parent = newUserTaskCard.parentElement.parentElement;

      let numberOfCards = parseInt(parent.querySelector(".number").innerText);
      //if user card is empty , print no tasks paragraph
      if (numberOfCards === 1) {
        parent
          .querySelector(".noUserTasks")
          .setAttribute("style", "display: block;");
      }
      parent.querySelector(".number").innerText = `${numberOfCards - 1}`;

      mainbox.appendChild(newUserTaskCard);
    }

    //update number of task cards
    taskCard = mainbox.querySelectorAll(".taskCard");

    mainbox.parentElement.querySelector(".number").innerText =
      taskCard.length - 1;
    console.log("drop over main area");
  }
});

document.addEventListener("change", function (e) {
  if (e.target.classList.contains("select")) {
    console.log(e.target);
    switch (e.target.value) {
      case "inProgress":
        e.target.parentElement.setAttribute(
          "style",
          "background-color: rgb(125, 193, 248);border-left: solid 4px rgb(40, 84, 121);",
        );
        e.target.parentElement.setAttribute("draggable", "true");
        break;
      case "notStarted":
        e.target.parentElement.setAttribute(
          "style",
          "background-color: rgb(231, 188, 188); border-left: solid 4px rgb(251, 86, 86);",
        );
        e.target.parentElement.setAttribute("draggable", "true");
        break;
      case "finished":
        e.target.parentElement.setAttribute(
          "style",
          "background-color: rgb(62, 215, 72);border-left: solid 4px rgb(14, 108, 20);",
        );
        e.target.parentElement.setAttribute("draggable", "false");
        break;
      default:
        throw new Error("invalid select value");
    }
  }
  if (e.target.classList.contains("avatarInputImg")) {
    e.preventDefault();
    if (e.target.files.length > 0) {
      let avtar = e.target.parentElement.previousElementSibling;
      const file = e.target.files[0];
      avtar.src = URL.createObjectURL(file);
    }
  }
});
