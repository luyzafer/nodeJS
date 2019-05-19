const {courses} = require ('./CoursesData');


let course = (num, callback) => {
    setTimeout(function(){
        let text = "Course Name: " + courses[num].name + "\n" +
                    "Course Id: " + courses[num].id + "\n" +
                    "Course Duration: " + courses[num].duration 
                    +"\n" +
                    "Course Price: " + courses[num].price + "\n" ;
        callback(text)

    },2000*courses.indexOf(num));
}

module.exports = {
    course,courses
}

