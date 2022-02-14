const mongoose =  require('mongoose')

const quizThumnailModel = mongoose.Schema({
    title:{
        type : String,
        required : true
    },
    description:{
        type : String,
        required : true
    },
    category:{
        type : String,
        required : true
    },
    image :{
        type : String,
        required : true
    },
    quizPost :{type: mongoose.Schema.Types.ObjectId, ref: 'Quiz'}

})

module.exports = mongoose.model('QuizThumnail',quizThumnailModel)