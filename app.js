const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/mongo-exercises")
    .then(() => console.log("DB connected successfully"))
    .catch(err => console.error("could not connect"));


const courseSchema = new mongoose.Schema({
    name: {type: String, required},
    tags: [ String],
    author: String,
    date: {type: Date, default: Date.now()},
    isPublished: Boolean,
    price:  Number

});

const Course = mongoose.model("Course", courseSchema);

async function getCourses(){
    return await Course
    //finding published course that are backend
    .find({isPublished: true, tags: 'backend'})
    //finding published course that are backend and fronmtend
    .find({isPublished: true, tags: {$in: ['frontend', 'backend']} })
    //using OR to perform same function
    .find({isPublished:true})
    //.or([ {tags: 'frontend' }, {tags: 'backend'}])
    //.sort({price: -1})
   

// get all the published course that are gte 15 and has by in their title
    .find({isPublished:true})
    .or([{price: {$gte: 15}}, {name:/.*by*/i}])
    //selecting the name, author and price
    .select({ name: 1, author: 1, price: 1})
    //another way to select name, author and price
    .select("name author price")
    .sort({ name: 1})
    .select({ name: 1, author: 1 });
} 
async function run(){
    const courses = await getCourses();
    console.log(courses);
}

run();

async function updateCourse(id){
    const course = await Course.findByIdAndUpdate(id, {
        $set: {
            author: "jason",
            isPublished: false
        },

    }, {new: true});
    console.log(course);
    
}
update("")

async function deleteCourse(id){
   // const result = await Course.deleteOne({_id: id});
   const result = await Course.findByIdAndDelete(id);
   console.log(result);
}

deleteCourse("");