const express = require("express");
const app = express();

app.use(express.json());

let students = [];

app.get("/students", (req, res) => {
    res.json(students);
});

app.post("/students", (req, res) => {
    const student = {
        id: Date.now(),
        name: req.body.name,
        branch: req.body.branch
    };

    students.push(student);
    res.status(201).json(student);
});

app.patch("/students/:id", (req, res) => {
    const student = students.find(
        s => s.id == req.params.id
    );

    if (!student) {
        return res.status(404).json({
            message: "Student not found"
        });
    }

    if (req.body.name) student.name = req.body.name;
    if (req.body.branch) student.branch = req.body.branch;

    res.json(student);
});

app.delete("/students/:id", (req, res) => {
    students = students.filter(
        s => s.id != req.params.id
    );

    res.json({ message: "Student deleted" });
});

module.exports = app;