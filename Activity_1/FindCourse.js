const {courses} = require ('./CoursesData');


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

module.exports = {
    findCourse
}