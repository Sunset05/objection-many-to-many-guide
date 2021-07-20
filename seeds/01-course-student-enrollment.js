
exports.seed = async knex => {
  await knex("enrollment").del()
  await knex("student").del()
  await knex("course").del()

  await knex("student").insert([{
    id: 1,
    name: "Lynn"
  },{
    id: 2,
    name: "Ben"
  },{
    id: 3,
    name: "Hailey"
  }])

  await knex("course").insert([{
    id: 1,
    title: "JavaScript"
  },{
    id: 2,
    title: "Ruby"
  }])

  await knex("enrollment").insert([{
    student_id: 1,
    course_id: 1,
  },{
    student_id: 1,
    course_id: 2,
  },{
    student_id: 2,
    course_id: 2,
  },{
    student_id: 3,
    course_id: 1,
  }])
};
