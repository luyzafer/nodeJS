
const {options} = require ('./Options');
const {course,courses} = require ('./CoursesInformation')
const {findCourse} = require ('./FindCourse')
const express = require('express')
const app = express()

let result = ""


const argv = require('yargs')
            .command('enroll', 'Enroll Course', options)
            .argv

let createFile = (argv) => {
    if(argv.courseID != null && argv.studentName  != null && argv.studentId != null){
        const {findCourse} = require ('./FindCourse');
        textCourse =  findCourse(argv.courseID)+ "\n";
        textStudent = "Student name: " + argv.studentName + "\n" +
                        "Student id: " + argv.studentId + "\n" ;
        
        result = textCourse + textStudent;
        
    }else{
        result = "The parameters: courseID, studentName and studentId are required"
    }
};


function coursesApp(argv){
    if(argv.courseID == undefined){
        for (i = 0; i < courses.length; i++) {
            course(i,function(text){
                result = text;
            })
        }
    }else if(argv.courseID != undefined && (argv.studentName  == undefined && argv.studentId == undefined)){
        result= findCourse(argv.courseID);
    } else{
        createFile(argv)
    }
}
coursesApp(argv)

app.get('/', function (req, res) {
    res.send(result)
  })
   
  app.listen(3000)