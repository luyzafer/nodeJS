const {findCourse} = require ('./FindCourse');
const {options} = require ('./Options');

const fs= require('fs');

const argv = require('yargs')
            .command('enroll', 'Enroll Course', options)
            .argv

let createFile = (argv) => {
    textCourse =  findCourse(argv.courseID)+ "\n";
    textStudent = "Student name: " + argv.studentName + "\n" +
                    "Student id: " + argv.studentId + "\n" ;
    
    finalText = textCourse + textStudent;

    fs.writeFile('courseEnrolled.txt', finalText, (err) => {
        if(err) throw (err);
        console.log("Course enrolled and file created")
    });
}

createFile(argv)