"use strict";

var $ = function(id) {
    return document.getElementById(id);
};

var tasks = [];

var displayTaskList = function() {
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
            var capitalized = tasks.sort().map(function(value) {
                var first = value.substring(0,1);       // get the first letter
                var remaining = value.substring(1);     // get the remaining letters
                return first.toUpperCase() + remaining; // capitalize
            });
    }

    // display tasks string and set focus on task text box
    $("task_list").value = capitalized && capitalized.join("\n") || "";
    $("task").focus();
};

var addToTaskList = function() {
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


var clearTaskList = function() {
    tasks.length = 0;
    localStorage.tasks = "";
    displayTaskList();
    $("task").focus();
};

window.onload = function() {
    $("add_task").onclick = addToTaskList;
    $("clear_tasks").onclick = clearTaskList;
    displayTaskList();
    $("task").focus();
}