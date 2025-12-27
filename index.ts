import { read } from "fs";
import fs from "fs/promises";

const userArgs : string[] = process.argv.slice(2);

type Task = {
    id : number;
    description : string;
    status : "todo" | "in-progress" | "done" | "all";
    createdAt : Date;
    updatedAt : Date;
}

switch(userArgs[0]) {

    case "add": addTask(userArgs[1]); break;
    case "update": updateTask(parseInt(userArgs[1])); break;
    case "delete": deleteTask(parseInt(userArgs[1])); break;
    case "list": list(userArgs[1]); break;
    default: console.log("Invalid command"); break;


}

async function readFile() : Promise<Task[]> {

    
    const response = await fs.readFile("index.json", "utf-8");
    const data : Task[] = JSON.parse(response);
    return data;

}

async function setID() : Promise<number> {

    const numOfTasks = (await readFile()).length;
    const id = numOfTasks > 0 ? numOfTasks + 1 : 1;
    return id;

}

async function addTask(task : string) { 

    const newTask : Task = {
        id : (await setID()),
        description : task,
        status : "todo",
        createdAt : new Date(),
        updatedAt : new Date()
    }

    const newTasklist : Task[] = [newTask,...await readFile()];

    await fs.writeFile("index.json", JSON.stringify(newTasklist,null,2));

}

async function updateTask(id : number) {

}

async function deleteTask(id : number) {

}

async function list(status : string) {

    switch (userArgs[1]) {
        case "all" : console.log(await readFile()); break;
    }

}
