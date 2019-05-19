
const {options} = require ('./Options');

const fs= require('fs');


const argv = require('yargs')
            .command('enroll', 'Enroll Course', options)
            .argv

let createFile = (argv) => {
    if(argv.courseID != null && argv.studentName  != null && argv.studentId != null){
        const {findCourse} = require ('./FindCourse');
        textCourse =  findCourse(argv.courseID)+ "\n";
        textStudent = "Student name: " + argv.studentName + "\n" +
                        "Student id: " + argv.studentId + "\n" ;
        
        finalText = textCourse + textStudent;


        fs.writeFile('courseEnrolled.txt', finalText, (err) => {
            if(err) throw (err);
            console.log("Course enrolled and file created")
        });
    }else{
        console.log("The parameters: courseID, studentName and studentId are required")
    }
}

createFile(argv)