import {readFile, writeFile} from "fs";

const userArgs : string[] = process.argv.slice(2);

switch(userArgs[0]) {

    case "add": addTask(userArgs[1]); break;
    case "update": updateTask(parseInt(userArgs[1])); break;
    case "delete": deleteTask(parseInt(userArgs[1])); break;
    case "list": list(userArgs[1]); break;
    default: console.log("Invalid command"); break;


}

let numOfTasks = 0;
let totalTasks : Task[] = [];

type Task = {
    id : number;
    description : string;
    status : "todo" | "in-progress" | "done";
    createdAt : Date;
    updatedAt : Date;
}

function addTask(task : string) { 

    numOfTasks++;

    const newTask : Task = {
        id : numOfTasks,
        description : task,
        status : "todo",
        createdAt : new Date(),
        updatedAt : new Date()
    }

    totalTasks.push(newTask);
    
    const JSONTask = JSON.stringify(totalTasks);
    writeFile(`index.json`,JSONTask, (err) =>{ if (err instanceof Error) {
        console.error(err.message);
    } else {
        console.log(`Task added successfully (ID: ${newTask.id})`);
    }});
 
}

async function updateTask(id : number) {

    const response = await fetch('index.json');
    const data = await response.json();
    console.log(data);

}

function deleteTask(id : number) {

}

function list(status : string) {

}
