const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

const authorSchema = mongoose.model('Author', new mongoose.Schema({
  name: String,
  bio: String,
  website: String
}));

const Course = mongoose.model('Course', new mongoose.Schema({
  name: String,
  authors: [authorSchema]
}));

async function createAuthor(name, bio, website) { 
  const author = new authorSchema({
    name, 
    bio, 
    website 
  });

  const result = await author.save();
  console.log(result);
}

async function createCourse(name, authors) {
  const course = new Course({
    name, 
    author
  }); 
  
  const result = await course.save();
  console.log(result);
}

async function listCourses() { 
  const courses = await Course
    .find()
    .populate('author', 'name -_id')
    //.populate('category', "name")
    .select('name author');
  console.log(courses);
}

async function updateAuthor(courseId){
    const course = await Course.update({_id: courseId}, {
        $set: {
           ' author': ''
        }
    });
    course.author.name = 'Mosh Hamedani';
    course.save();
    //course.author.save();

}
async function addAuthor(courseId, author){
  const course = await course.findById(courseId);
  course.authors.push(author);
  course.save();


}
async function removeAuthor(courseId, authorId){
  const course = await Course.findById(courseId);
  const author = course.authors.id(authorId);
  author.remove();
  course.save();
}




addAuthor('', new Author({ name: "Mosh" }));
removeAuthor("", "")



//createAuthor('Mosh', 'My bio', 'My Website');

// createCourse('Node Course',[
//   new Author({
//     name: "Mosh"
//   }),
//   new Author({
//     name: "Moses"
//   }), 
// ]
// );
 //createCourse('Node Course', 'authorId')

 //listCourses();

 //updateAuthor('63a6b0bfdcf4b1e37c810457')