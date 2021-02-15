"use strict";

var $ = function (id) {
    return document.getElementById(id);
};

var tasks = [];
var sortDirection = "ASC";

var displayTaskList = function () {
    //if there are no tasks in the tasks array, check storage
    if (tasks.length === 0) {
        // get the tasks from storage
        var storage = localStorage.getItem("tasks") || "";

        //if not empty, convert to an array and store in global tasks variable
        if (storage.length > 0) {
            tasks = storage.split("|");
        }
    }
    // if there are tasks in array, sort and create tasks string
    if (tasks.length > 0) {
        if (sortDirection === "ASC") {
            tasks.sort();
        } else {
            tasks.reverse();
        }
        var capitalized = tasks.map(function (value) {
            var first = value.substring(0, 1);       // get the first letter
            var remaining = value.substring(1);     // get the remaining letters
            return first.toUpperCase() + remaining; // capitalize
        });
    }

    // display tasks string and set focus on task text box
    $("task_list").value = capitalized && capitalized.join("\n") || "";
    $("task").focus();

    var userName = (sessionStorage.name || "");
    $("name").firstChild.nodeValue = (userName.length === 0) ? "Tasks" : userName + "'s " + "Tasks";

};

var addToTaskList = function () {
    var task = $("task");
    if (task.value === "") {
        alert("please enter a task.");
    } else {
        // add task to task array
        tasks.push(task.value);
        localStorage.tasks = tasks.join("|");
        task.value = "";
        displayTaskList();
    }
};

var deleteTask = function () {
    var index = parseInt(prompt("Please enter index of item to delete"));
    if (!isNaN(index) || index.length > tasks.length) {
        tasks.splice(index, 1);
        localStorage.tasks = tasks.join("|");
        displayTaskList();
    }
};

var toggleSort = function () {
    sortDirection =  (sortDirection === "ASC") ? "DESC" : "ASC";
    displayTaskList();
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
    $("task_list").value = filtered;
};

var clearTaskList = function () {
    tasks.length = 0;
    localStorage.tasks = "";
    displayTaskList();
    $("task").focus();
};

window.onload = function () {
    $("add_task").onclick = addToTaskList;
    $("delete_task").onclick = deleteTask;
    $("toggle_sort").onclick = toggleSort;
    $("set_name").onclick = setName;
    $("filter_tasks").onclick = filterTasks;
    $("clear_tasks").onclick = clearTaskList;
    displayTaskList();
    $("task").focus();
}