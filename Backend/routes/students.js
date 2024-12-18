const router = require("express").Router();
let Student = require("../model/student"); // Fixed capitalization for Student model

// Add a new student
// Add a new student
router.route("/add").post((req, res) => {
    const { name, age, gender } = req.body;

    const newStudent = new Student({
        name,
        age,
        gender
    });

    newStudent.save()
        .then(() => {
            res.json("Student Added");
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send({ error: err.message });
        });
});



// Get all students
router.route("/").get((req, res) => {
    Student.find()
        .then((students) => {
            res.json(students);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send({ error: err.message });
        });
});

// Update a student by ID
router.route("/update/:id").put(async (req, res) => {
    let userId = req.params.id;
    const { name, age, gender } = req.body;

    const updateStudent = {
        name,
        age,
        gender
    };

    await Student.findByIdAndUpdate(userId, updateStudent)
        .then(() => {
            res.status(200).send({ status: "User Updated" });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send({ status: "Error with updating data", error: err.message });
        });
});

// Delete a student by ID
router.route("/delete/:id").delete(async (req, res) => {
    let userId = req.params.id;

    await Student.findByIdAndDelete(userId)
        .then(() => {
            res.status(200).send({ status: "User Deleted" });
        })
        .catch((err) => {
            console.log(err.message);
            res.status(500).send({ status: "Error with delete user", error: err.message });
        });
});

// Get a student by ID
router.route("/get/:id").get(async (req, res) => {
    let userId = req.params.id;

    await Student.findById(userId)
        .then((user) => {
            res.status(200).send({ status: "User fetched", user });
        })
        .catch((err) => {
            console.log(err.message);
            res.status(500).send({ status: "Error with get user", error: err.message });
        });
});

module.exports = router;
