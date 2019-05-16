const {courses} = require ('./CoursesData');


for(let i = 0; i < courses.length; i++) {
        console.log("Course Name: " + courses[i].name);
        console.log("Course Id: " + courses[i].id);
        console.log("Course Duration: " + courses[i].duration);
        console.log("Course Price: " + courses[i].price);
        console.log("\n");
}
