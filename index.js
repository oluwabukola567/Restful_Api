const mongoose = require("mongoose");   


mongoose.connect("mongodb://localhost:27017/playground")
    .then(() => console.log("Database connected successfully"))
    .catch(err => console.error("could not connect", err));


const courseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255  
    },
    category: {
        type: String,
        required: true,
        enum: ["web", "mobile", "Network"],
        lowercase: true
    },

    author: String,
    tags: {
        type: Array,
        validate: {
            isAsync: true, 
            //using async validation
            validator: function(v, callback) {
                setTimeout(() => {
                    const result =  v && v.length > 0; 
                    callback(result); 

                }, 4000);
                
                //using custom validation
              // return v && v.length > 0;  
            },
            message: 'A course must have at least one tag'

        }
         
    },
    date: {type: Date, default: Date.now },
    isPublished: Boolean,
    price: {
        type: Number,
        required: function() {
            return this.isPublished
        },
        min: 10,
        max: 200,
        get: v => Math.round(v),
        set: v => Math.round(v)
    }
    
});



const Course = mongoose.model("course", courseSchema);

async function createCourse(){
    const course = new Course({
        name: "kolawole", 
        category: "Web",
        author: "mide",
        tags: ["backend"],
        isPublished: true,
        price:15
    });
    try{
        const result = await course.save()
        console.log(result);
    
    }catch(ex){
        for(field in ex.errors)
        console.log(ex.errors[field].message);
    }
     
}
createCourse();


// async function getCourse(){
//     const pageNumber = 2;
//     const pageSize = 8;
//     const courses =await Course
//     //ends with
//     .find({ author: /mide$/ })
//     //start with
//     .find({ author: /^bukola/})
//     //find anywhere
//     .find({ author: /.*bukola*/})

//     .find({name: "bukola"})
//     .sort({name: 1})
//     .select({name: 1 , tags: 1})
//     //to count
//     .skip((pageNumber - 1 ) * pageSize )
//     .limit(pageSize)
//     .count();
//     console.log(courses);
// }
// getCourse();