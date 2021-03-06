var taskInput = document.getElementById("new-task");
var addButton = document.getElementsByTagName("button")[0];
var incompleteTaskHolder = document.getElementById("incomplete-tasks");
var completedTasksHolder = document.getElementById("completed-tasks");

var createNewTaskElement = function(taskString) {

    var listItem = document.createElement("li");
    var checkBox = document.createElement("input");
    var label = document.createElement("label");
    var deleteButton = document.createElement("button");

    label.innerText = taskString;

    checkBox.type = "checkbox";

    deleteButton.innerText = "Delete";
    deleteButton.className = "delete";

    listItem.appendChild(checkBox);
    listItem.appendChild(label);
    listItem.appendChild(deleteButton);
    return listItem;
}

var addTask = function() {
    if (!taskInput.value.length) return;
	
    var listItem = createNewTaskElement(taskInput.value);

    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);

    saveItem(taskInput.value);

    taskInput.value = "";
}

var deleteTask = function() {
    var listItem = this.parentNode;
    var ul = listItem.parentNode;
    ul.removeChild(listItem);
    removeItem(listItem.childNodes[1].innerText);
}

var taskCompleted = function() {
    var listItem = this.parentNode;
    completedTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskIncomplete);
}

var taskIncomplete = function() {
    var listItem = this.parentNode;
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);
}

var saveItem = function(task) {
    if (!localStorage.getItem("local")) {
        var local = { "tasks": [] };
    } else {
        var local = JSON.parse(localStorage.getItem("local"));
    }

    local['tasks'].push(task);
    localStorage.setItem("local", JSON.stringify(local));
}

var removeItem = function(task) {
    if (!localStorage.getItem("local")) return;

    var local = JSON.parse(localStorage.getItem("local"));

    for (var i = local['tasks'].length - 1; i >= 0; i--) {
        if (local['tasks'][i] === task) {
            local['tasks'].splice(i, 1);
        }
    }

    localStorage.setItem("local", JSON.stringify(local));
}

var readItems = function() {
    if (!localStorage.getItem("local")) return;

    var local = JSON.parse(localStorage.getItem("local"));

    for (var i = local['tasks'].length - 1; i >= 0; i--) {
        var listItem = createNewTaskElement(local['tasks'][i]);
        incompleteTaskHolder.appendChild(listItem);
        bindTaskEvents(listItem, taskCompleted);
    }
}

addButton.addEventListener("click", addTask);

var bindTaskEvents = function(taskListItem, checkBoxEventHandler) {
    var checkBox = taskListItem.querySelector("input[type=checkbox]");
    var deleteButton = taskListItem.querySelector("button.delete");

    deleteButton.onclick = deleteTask;
    checkBox.onchange = checkBoxEventHandler;
}

for (var i = 0; i < incompleteTaskHolder.children.length; i++) {
    bindTaskEvents(incompleteTaskHolder.children[i], taskCompleted);
}

for (var i = 0; i < completedTasksHolder.children.length; i++) {
    bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}

window.onload = function(e){ 
    readItems();
}
