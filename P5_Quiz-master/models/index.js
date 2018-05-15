const Sequelize = require('sequelize');
  
const sequelize = new Sequelize("sqlite:quizzes.sqlite", logging: false);

sequelize.define('quiz', {
    question:{
        type: Sequelize.STRING,
        unique: {msg: "Esta pregunta ya existe"},
        validate: {notEmpty:{msg: "La pregunta no puede estar vacia"}}
    },
    answer: {
        type: Sequelize.STRING,
        validate: {notEmpty: {msg: "La respuesta no puede estar vacia"}}
    }
});

//Cuando la base de datos no está creada, la creo e inicializo asi

sequelize.sync()
.then(() => sequelize.models.quiz.count())
.then(count => {
    if(!count){
    return sequelize.models.quiz.bulkCreate([
        {question: "Capital de Italia", answer: "Roma"},
        {question: "Capital de Francia", answer: "Paris"},
        {question: "Capital de España", answer: "Madrid"},
        {question: "Capital de Portugal", answer: "Lisboa"}
    ]);
}
})
.catch(error => {
    console.log(error);
});

module.exports = sequelize;
