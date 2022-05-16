const express = require('express');
const PORT = 3000;
const app = express();

app.use(express.json());

const students = [
    {
        studentName: 'John',
        studentCollege: 'MIT',
        studentAge: '21',
        studentRollNumber: '1'
    },
    {
        studentName: 'Jane',
        studentCollege: 'IIT',
        studentAge: '22',
        studentRollNumber: '2'
    },
    {
        studentName: 'Jack',
        studentCollege: 'IIT',
        studentAge: '23',
        studentRollNumber: '3'
    },
    {
        studentName: 'Jill',
        studentCollege: 'IIT',
        studentAge: '24',
        studentRollNumber: '4'
    }
];

app.get('/students', (request, response) => {
    return response.status(200).json(students);
});

app.post('/students', (request, response) => {
    const student = request.body;

    if (!student.studentName || !student.studentCollege || !student.studentAge || !student.studentRollNumber) {
        return response.status(500).json({
            message: "One of the information is missing!"
        })
    }

    students.push(student);
    return response.status(201).json(student);
});

app.get('/students/:id', (request, response) => {
    const id = request.params.id;
    const student = students.find(student => student.studentRollNumber === id);

    if (!student) response.status(404).json({ message: 'Student not found' });

    return response.status(200).json(student);
});

app.put('/students/:id', (request, response) => {
    const studentData = request.body;
    if (!studentData.studentName || !studentData.studentCollege || !studentData.studentAge || !studentData.studentRollNumber) {
        return response.status(500).json({
            message: "One of the information is missing!"
        })
    }

    const id = request.params.id;
    const student = students.find(student => student.studentRollNumber === id);

    if (!student) return response.status(404).json({ message: 'Student not found' });

    student = studentData;
    return response.status(200).json(student);
});

app.delete('/students/:id', (request, response) => {
    const id = request.params.id;
    const student = students.find(student => student.studentRollNumber === id);

    if (!student) return response.status(404).json({ message: 'Student not found' });

    students.splice(students.indexOf(student), 1);
    return response.status(200).json({ message: 'Student deleted successfully' });
});

app.listen(PORT, (request, response) => {
    console.log(`Server running at port ${PORT}`)
})
