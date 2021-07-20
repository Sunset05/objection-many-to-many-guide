const express = require("express");
const cors = require("cors");
const knex = require("knex");
const databaseConfig = require("./knexfile").development
const port = process.env.PORT || 4000

const { Model } = require("objection")

const app = express();
const database = knex(databaseConfig);
Model.knex(database)

app.use(cors());

class Course extends Model {
    static tableName = "course"
}

class Student extends Model {
    static tableName = "student"
    static relationMappings = {
        courses: {
            relation: Model.ManyToManyRelation,
            modelClass: Course,
            join: {
                from: "student.id",
                through: {
                    from: "enrollment.student_id",
                    to: "enrollment.course_id"
                },
                to: "course.id",

            } 
        }
    };
}


app.get("/students", (request, response) => {
    Student.query().withGraphFetched("courses")
        .then(students => {
            response.json({students})
        }).catch(error => {
            console.error(error.message)
            response.sendStatus(500)
        })
});

app.get("/courses", (request, response) => {
    Course.query()
        .then(courses => {
            response.json({courses})
        })
});

app.get("/", (request, response) => {
    response.json({ message: "You're in flavor country!" })
})

app.listen(port, () => {
    console.log(`I AM LISTENING ON PORT ${port}`)
});