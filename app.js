const taskInput = document.querySelector("#taskInput");
const addTaskBtn = document.querySelector("#addTaskBtn");
const taskList = document.querySelector("#taskList");
const totalTasks = document.querySelector("#totalTasks");
const completedTasks = document.querySelector("#completedTasks");
const taskCount = document.querySelector("#taskCount");
const emptyState = document.querySelector("#emptyState");
let tasks =[];

//add
const addTask =()=>{
  const title = taskInput.value;

  if (title.trim() ===""){
    return;
  }

  const task = {
   id: Date.now(),
   title,
   completed:false
  };
  tasks.push(task);
  displayTask();
  updateCounters();
  taskInput.value="";
  console.log(tasks);
};
addTaskBtn.addEventListener("click",addTask);
 
//display
const displayTask =()=>{
   // Clear the task list
   taskList.innerHTML = "";

   // If there are no tasks, show the empty state
   if (tasks.length === 0) {
       taskList.appendChild(emptyState);
       return;
   }
   tasks.forEach(task => {

    const taskElement = document.createElement("div");

    taskElement.classList.add("task-item");
    console.log(taskElement.className);
        if(task.completed){
          taskElement.classList.add("completed");
        }
    taskElement.innerHTML = `
        <div class="task-content">

            <div class="task-checkbox ${task.completed ? "checked":""}">
            ${task.completed ? "✓" : ""}
            </div>

            <span class="task-title">
                ${task.title}
            </span>

            <div class="task-actions">
                <button class="delete-btn">
                    🗑️
                </button>
            </div>

        </div>
    `;

    taskList.appendChild(taskElement);

    const deleteButton = taskElement.querySelector(".delete-btn");
    
    deleteButton.addEventListener("click", () => {
        deleteTask(task.id);
    });
    const checkbox = taskElement.querySelector(".task-checkbox");
    checkbox.addEventListener("click",() =>{
      completeTasks(task.id);
    });
});
};

//counter
const updateCounters = () => {
  const completed = tasks.filter(task =>task.completed);
  totalTasks.textContent = tasks.length;
  completedTasks.textContent = completed.length;
  taskCount.textContent = `${tasks.length} task${tasks.length !== 1 ? "s" : ""}`;
};

//delete
const deleteTask = (id) => {
  tasks = tasks.filter(task => task.id !== id);

  displayTask();
  updateCounters();
};

const completeTasks =(id) =>{
    tasks = tasks.map(task =>{
      if (task.id === id){
        return{
          ...task,
          completed: !task.completed
        };
      }
      return task;
    })
    displayTask();
    updateCounters();
};