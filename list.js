"use strict";

var $ = function (id) {
    return document.getElementById(id);
};

var tasks = [];

var displayTaskList = function () {
    //if there are no tasks in the tasks array, check storage
    if (tasks.length === 0) {
        // get the tasks from storage
        tasks = getStorage("tasks");
    }
    displaySortedTaskList(tasks, $("task_list"), deleteFromTaskList, editTaskListItem);

    //check for user name in session storage
    var name = getSessionStorage("name");
    $("name").innerHTML = name + "'s Tasklist."; 

    // set focus on the task text box
    $("task").focus();
};

var addToTaskList = function () {
    var task = $("task");
    if (task.value === "") {
        alert("please enter a task.");
    } else {
        // add task to task array
        tasks.push(capitalizeTask(task.value));
        setStorage("tasks", tasks);
        task.value = "";
        displayTaskList();
    }
};

var deleteFromTaskList = function () {
    deleteTask(tasks, this.id);  // 'this' is the clicked link
    setStorage("tasks", tasks);
    displayTaskList();
};

var editTaskListItem = function() {
    var newText = prompt("Please enter a new task", tasks[this.title]); // 'this' is the clicked link
    if(newText !== null) {
        editTask(tasks, this.title, capitalizeTask(newText));
        setStorage("tasks", tasks);
        displayTaskList();
    }
};


var setName = function() {
    var userName = prompt("Please enter a name.");
    sessionStorage.setItem("name", userName);
    displayTaskList();
};

var importantTasks = function(element) {
    var lower = element.toLowerCase();
    var index = lower.indexOf("important!");
    return (index > -1) ? true : false;
};

var filterTasks = function() {
    var filtered = tasks.filter(importantTasks);
    filtered = filtered.join("\n");
    $("task_list").innerHTML = filtered;
};

var clearTaskList = function () {
    tasks.length = 0;
    clearStorage("tasks");
    displayTaskList();
    $("task").focus();
};


window.onload = function () {
    $("add_task").onclick = addToTaskList;
    $("clear_tasks").onclick = clearTaskList;
    $("set_name").onclick = setName;
    $("filter_tasks").onclick = filterTasks;
    displayTaskList();
}