let mongoose = require("mongoose");

//mongoDB connection

mongoose
    .connect("mongodb://localhost/projectDB", {useNewUrlParser: true, useUnifiedTopology:true})
    .then(() => console.log(`connected to db`))
    .catch(error => console.log(`something went wrong ${error.message}` ))

//define schema structure

let courseSchema = new mongoose.Schema({
    author: {type:String, min:3, max:25, required:true, trim:true},
    price:{type: Number, required:true},
    courses:[String],
    date: {type:Date, default:Date.now()},
    isPublished:{type:Boolean,required:true}
})

//create model
let coursesModel = mongoose.model("coursesDB", courseSchema);

//Async function ----  Await data
//data create or insert
async function course() {
 let authorcourse = new coursesModel({      //create an instance of model

    author:"rushi",
    price:10000,
    courses:["back end", "node"],
    isPublished:true
 });

 //data save 

 let data = await authorcourse.save()
 console.log(data);
}

//course();


//fetch records
async function allcourses(){

    let data= await coursesModel.find();
    console.log(data);
} 
//allcourses();


//find idivividual specific data 
async function specificcource(){

    let data = await coursesModel.find({"author": "rushi"})
    console.log(data);
}
//specificcource();


//find only specific column data
//sorting up/down
async function specifiColom(){
    let data = await  coursesModel
        .find()
        .select("author price date -_id")
        .sort("-price")
        .count()
    console.log(data);
};
specifiColom();