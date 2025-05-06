import express from "express"

const app = express()

app.use(express.json())

const PORT = process.env.PORT || 4000


app.listen(PORT, function(){
    console.log(`Server is running on port ${PORT}`)
} )

let tasks = []
let currentId = 1

app.get("/", function(req, res) {
    res.send("Welcome to the To-Do API!");
});

app.post("/addTask", function(req, res) {
    const { taskName } = req.body;
    if (!taskName) {
        return res.status(400).json({ error: "taskName is required" });
    }

    const newTask = {
        id: currentId++,
        taskName
    };

    tasks.push(newTask);
    res.status(201).json({ message: "Task added", task: newTask });
});

app.get("/tasks", function(req, res) {
    res.json(tasks);
});

app.delete("/task/:id", function(req, res) {
    const id = parseInt(req.params.id);
    const index = tasks.findIndex(task => task.id === id);

    if (index === -1) {
        return res.status(404).json({ error: "Task not found" });
    }

    const deletedTask = tasks.splice(index, 1);
    res.json({ message: "Task deleted", task: deletedTask[0] });
});