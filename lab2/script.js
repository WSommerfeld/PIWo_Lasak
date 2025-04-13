//kosz (let, a nie const, bo przypisujemy różne obiekty)
let bin = [];


//zmienne dla modalu (zad.6)
let taskToDelete = null; //także let, bo przypisujemy różne taski
const deleteModal = document.getElementById("Modal");
const confirmDeleteBtn = document.getElementById("confirmDelete");
const cancelDeleteBtn = document.getElementById("cancelDelete");
const taskTextToDelete = document.getElementById("taskText");
const closeModalBtn = document.querySelector(".close");

//dodawanie nowego zadania (zad.1)
function addTodo() {
  const input = document.getElementById("todoInput");
  const text = input.value.trim();

  if (text === "") {
    alert("Puste zadanie!");
    return;
  }

  const li = document.createElement("li");

  
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";

  
  const taskText = document.createElement("span");
  taskText.textContent = text;
  taskText.style.marginLeft = "8px";
  taskText.style.cursor = "pointer";

  // Przycisk X (zad.4)
  const removeBtn = document.createElement("button");
  removeBtn.textContent = "X";
  removeBtn.title = "Usuń";
  removeBtn.style.marginLeft = "10px";
  removeBtn.style.color = "black";
  removeBtn.style.cursor = "pointer";
  removeBtn.style.border = "none";
  removeBtn.style.background = "grey";
  removeBtn.style.fontSize = "1em";

  //obsługa kosza (tylko 1 element)
  removeBtn.addEventListener("click", () => {
    //bin.pop();
    //bin.push({
      //li: li,
      //checked: checkbox.checked,
      //taskText: taskText.style.textDecoration, // tekst
      //taskColor: taskText.style.color, //kolor 
      //checkboxState: checkbox.checked //checkbox
	taskToDelete = li;
    taskTextToDelete.textContent = text; 
    deleteModal.style.display = "block"; 
    //});
    //li.style.display = "none"; 
  });

  //zaznaczanie (tekst + checkbox)
  taskText.addEventListener("click", () => {
    checkbox.checked = !checkbox.checked;
    mark(li, taskText, checkbox);
  });

  
  checkbox.addEventListener("change", () => {
    mark(li, taskText, checkbox);
  });

  //Element listy
  li.appendChild(checkbox);
  li.appendChild(taskText);
  li.appendChild(removeBtn);

  // Dodanie do listy
  document.getElementById("todoList").appendChild(li);
  
  //czyszczenie inputu
  input.value = "";
}

// zaznaczanie/odznaczanie (zad.2)
function mark(li, taskText, checkbox) {
  const existingDate = li.querySelector(".date");
	//uzmiennienie przycisku, żeby dodawanie daty nie rozjeżdżało wszystkiego po wystylowaniu w css
	const removeBtn = li.querySelector("button");
	//skreślenie
  if (checkbox.checked) {
    taskText.style.textDecoration = "line-through";
    taskText.style.color = "gray";
    taskText.style.opacity = "0.6";

	//dodanie daty (zad.3)
    if (!existingDate) {
      const now = new Date();
      const dateStr = now.toLocaleString("pl-PL");

      const dateSpan = document.createElement("span");
      dateSpan.textContent = ` ${dateStr}`;
      dateSpan.className = "date";
      dateSpan.style.marginLeft = "10px";
      dateSpan.style.fontSize = "0.9em";
      dateSpan.style.color = "gray";

      li.insertBefore(dateSpan, removeBtn); 
    }
  } else {
    taskText.style.textDecoration = "none";
    taskText.style.color = "black";
    taskText.style.opacity = "1";

    if (existingDate) {
      existingDate.remove();
    }
  }
}

// ctrl+z listener
document.addEventListener("keydown", (event) => {
  if (event.ctrlKey && event.key === "z") {
    back(); 
  }
});

// cofnięcie usunięcia (zad.5)
function back() {
  if (bin.length > 0) {
    const lastDeleted = bin.pop(); 
    const li = lastDeleted.li;
    const checkbox = li.querySelector("input[type='checkbox']");
    const taskText = li.querySelector("span");
    const removeBtn = li.querySelector("button"); // Pobranie przycisku X

   
    checkbox.checked = lastDeleted.checkboxState;


    taskText.style.textDecoration = lastDeleted.taskText;
    taskText.style.color = lastDeleted.taskColor;

	//najpierw checkbox
    if (!li.contains(checkbox)) {
      li.insertBefore(checkbox, taskText);
    }

    //przycisk na końcu
    removeBtn.style.position = 'absolute'; 
    removeBtn.style.right = '10px'; 
    removeBtn.style.top = '50%'; 
    removeBtn.style.transform = 'translateY(-50%)'; 

   
    li.style.display = "flex"; 
    li.style.position = 'relative'; 

    // przywrócenie na listę
    const todoList = document.getElementById("todoList");
    todoList.appendChild(li);


    li.insertBefore(checkbox, taskText);

  
    li.classList.add("restored");
  }
}


function start(){
	alert("Przepraszam najmocniej, mam małe zaległości z powodu dwutygodniowej nieobecności i mam drobne problemy z ich nadrobieniem, czy mógłbym jeszcze dzisiaj dokończyć to zadanie?");
}

//obsługa modalu
closeModalBtn.onclick = function () {
  deleteModal.style.display = "none"; 
};

cancelDeleteBtn.onclick = function () {
  deleteModal.style.display = "none"; 
};

confirmDeleteBtn.onclick = function () {
  if (taskToDelete) {
    const checkbox = taskToDelete.querySelector("input[type='checkbox']");
    const taskText = taskToDelete.querySelector("span");
	bin.pop();
    bin.push({
      li: taskToDelete,
      checked: checkbox.checked,
      taskText: taskText.style.textDecoration,
      taskColor: taskText.style.color,
      checkboxState: checkbox.checked,
    });

    taskToDelete.style.display = "none";
    taskToDelete = null;
  }
  deleteModal.style.display = "none";
};


window.onclick = function (event) {
  if (event.target === deleteModal) {
    deleteModal.style.display = "none"; 
  }
};