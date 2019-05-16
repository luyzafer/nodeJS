const {courses} = require ('./CoursesData');
const {options} = require ('./Options');


function findCourse(courseId){
    let course = courses.find(function(course){
          return course.id == courseId
    })
    if (course != null) {
        return "Course Name: "+ course.name + "\n" + "Course Id: " + 
        course.id + "\n" + "Course Duration: " + course.duration + "\n" 
        + "Course Price: " + course.price;
    }else{
        return "The course id wasn't found"
    }
}

const argv = require('yargs')
            .command('enroll', 'Enroll Course', options)
            .argv

console.log(findCourse(argv.courseID))

module.exports = {
    argv, findCourse
}