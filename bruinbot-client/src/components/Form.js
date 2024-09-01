// src/components/MultiStepForm.js
import React, { useState } from 'react';
import "/Users/ananyaanand/Desktop/bruinbot/src/index.css"
import '/Users/ananyaanand/Desktop/bruinbot/src/index.js'; 

export const Form = () => {
  const [step, setStep] = useState(1);
  const [major, setMajor] = useState([{college: '', subject: '', technicalBreadth: ""}]);
  const [graduationDate, setGraduationDate] = useState({ season: '', year: '' });
  const [courses, setCourses] = useState([{ subject: '', title: '' }]);
  const [time, setTime] = useState({ start: '', end: '' });
  const [maxLoad, setMaxLoad] = useState('');
  const [summerClasses, setSummerClasses] = useState('');

  const handleAddCourse = () => {
    setCourses([...courses, { subject: '', title: '' }]);
  };

  const handleCourseChange = (index, field, value) => {
    const updatedCourses = [...courses];
    updatedCourses[index][field] = value;
    setCourses(updatedCourses);
  };

  const handleAddMajor = () => {
    setMajor([...major, {college: '', subject: '', technicalBreadth: ''}])
  }

  const handleMajorChange = (index, field, value) => {
    const updatedMajor = [...major];
    updatedMajor[index][field] = value;
    setMajor(updatedMajor)
  }


  const handleNextStep = () => {
    setStep(step + 1);
    }

  const handlePreviousStep = () => {
    setStep(step - 1);
  };

  const handleSubmit = () => {
   const submission = {
      major,
      graduationDate,
      courses,
      time,
      maxLoad,
      summerClasses,
    };
    console.log(submission);

    function getMajorPrompt(){
     let majors = "";

    if(submission.major.length === 1)
    {
      return submission.major[0].subject + " from " + submission.major[0].college
    }

    else if(submission.major.length === 2)
      {
        return submission.major[0].subject + " from " + submission.major[0].college + " and " + submission.major[1].subject + " from " + submission.major[1].college 
      }

     let i;
      for(i = 0; i < submission.major.length - 1; i++)
      {
        majors += submission.major[i].subject + " from " + submission.major[i].college + ", ";
      }
      majors =  majors + "and " + submission.major[i].subject + " from " + submission.major[i].college;
      return majors;
    }

    function getCompletedCoursesPrompt(){
      let courses = "";

      if(submission.courses.length === 1)
        {
          return submission.courses[0].subject + " " + submission.courses[0].title
        }
      else if (submission.courses.length === 2)
      {
        return submission.courses[0].subject + " " + submission.courses[0].title + " and " + submission.courses[1].subject + " " + submission.courses[1].title;
      }


      let i;
       for(i = 0; i < submission.courses.length - 1; i++)
       {
         courses = courses + (submission.courses[i].subject + " " + submission.courses[i].title + ", ");
         
       }
       courses = courses + "and " + (submission.courses[i].subject + " " + submission.courses[i].title)
       return courses;
     }


     function getMajorRequirements(){
      /*
      fetch from database
      should return array in this format:
      [
      {
        "course": "LING 20 - Introduction to Linguistic Analysis",
        "units": 5,
        "prerequisites": None
      },
      {
        "course": "COM SCI 32 - Introduction to Computer Science I",
        "units": 4,
        "prerequisites": ["course 31"]
      }
    ]
      */
     }

     function getGERequirements(){
      /*
      should return in this format 

      {
      "college": "College of Letters and Science",
      "requirements": {
      "Foundations of the Arts and Humanities": 20 units,
      "Foundations of Society and Culture": 20 units,
      "Foundations of Scientific Inquiry": 16 units
    }
      */

    let artUnits = -1;
    let societyUnits = -1;
    let scienceUnits = -1;

    if(submission.major[0].college === "Samueli School of Engineering")
    {
        artUnits = 10;
        societyUnits = 10;
        scienceUnits = 24;
    }
    else if (submission.major[0].college === "College of Letters and Sciences" || "Luskin School of Public Affairs")
    {
      artUnits = 15;
      societyUnits = 15;
      scienceUnits = 38;
    }
    else if (submission.major[0].college === "School of Nursing"){
      artUnits = 15;
      societyUnits = 15;
      scienceUnits = 18;
     }
    else if (submission.major[0].college === "Herb Alpert School of Music"){
      artUnits = 15;
      societyUnits = 15;
      scienceUnits = 8;
     }
return (
    {
      "college": "College of Letters and Science",
      "requirements": {
      "Foundations of the Arts and Humanities": artUnits.toString() + " units",
      "Foundations of Society and Culture": societyUnits.toString() + " units",
      "Foundations of Scientific Inquiry": scienceUnits.toString() + " units"
      }
    })
  }

     function getTechBreadth(){
      /*
      should return in this format: 

      "Required Upper Division Courses (12 units): select from
      BIOENGR 100 through 187. One of the three courses can be substituted by CHEM 20B or LIFESCI 7A 
      if not used to satisfy other degree requirements and additional two courses that are applied to 
      technical breadth area are upper division."
      */
     }


     function getCurrentTerm(){
      const month = new Date().getMonth();
      const day = new Date().getDate();

    if ((month === 11 && day >= 21) || (month === 0) || (month === 1) || (month === 2 && day < 20)) {
        return "Winter";
    } else if ((month === 2 && day >= 20) || (month === 3) || (month === 4) || (month === 5 && day < 21)) {
        return "Spring";
    } else if ((month === 5 && day >= 21) || (month === 6) || (month === 7) || (month === 8 && day < 23)) {
        return "Summer";
    } else if ((month === 8 && day >= 23) || (month === 9) || (month === 10) || (month === 11 && day < 21)) {
        return "Autumn";
    }
     }

    let prompt = 
`Student Academic History: 
    ${getCompletedCoursesPrompt()}
    
Course Requirements:
    {
    "Major Requirements": ${getMajorRequirements()}, 
    "GE Requirements": ${JSON.stringify(getGERequirements())}, 
    "Technical Breadth Requirements": ${getTechBreadth()}
    }

Student Preferences:
    *Preferred class time: ${submission.time.start} to ${submission.time.end}
    *Max Course Load: ${submission.maxLoad}
    *Take summer quarter classes: ${submission.summerClasses}

Create a quarterly class schedule for the student majoring in ${getMajorPrompt()} from ${getCurrentTerm() + " " + new Date().getFullYear()} to ${submission.graduationDate.season + " " + submission.graduationDate.year}, taking into account their completed courses, course requirements, and student preferences. Ensure all preqrequisites for courses are completed before taking them. Don't include completed courses in schedule.
    `
    console.log(prompt)
   
  };

  return (
    <div className="bg-black-gradient min-h-screen bg-cover">
    <h1 className="text-6xl font-bold text-center text-white-600 pb-8 pt-8">Student Information Form</h1>
    <div className="text-gray-500 max-w-4xl mx-auto p-6 bg-gray-100 rounded-lg shadow-md">


 {step === 1 && (
        <div>
          <h2 className="text-xlfont-semibold mb-4">Step 1: Select Your Major(s)</h2>
          {major.map((m, index) => (<>
           <div className="mb-4">
            <label className="block mb-2">College</label>
            <select
              className="block w-full border border-gray-300 rounded p-2"
              value={m.college}
              onChange={(e) => handleMajorChange(index, 'college', e.target.value)}
            >
              <option value="">Select College</option>
              <option value="Samueli School of Engineering">Samueli School of Engineering</option>
              <option value="College of Letters and Sciences">College of Letters and Sciences</option>
              <option value="School of Nursing">School of Nursing</option>
              <option value="Herb Alpert School of Music">Herb Alpert School of Music</option>
              <option value="Luskin School of Public Affairs">Luskin School of Public Affairs</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block mb-2">Major</label>
            <input
              type="text"
              className="block w-full border border-gray-300 rounded p-2"
              value={m.subject}
              onChange={(e) => handleMajorChange(index, 'subject', e.target.value)}
            />

          </div>
          {m.college === 'Engineering' && (
            <div className="mb-4">
              <label className="block mb-2">Technical Breadth</label>
              <input
                type="text"
                className="block w-full border border-gray-300 rounded p-2"
                value={m.technicalBreadth}
                onChange={(e) => handleMajorChange(index, 'technicalBreadth', e.target.value)}
              />
            </div>
          )}
          </>))}

            <button
            type="button"
            className="bg-blue-700 text-white px-4 py-2 rounded mr-2"
            onClick={handleAddMajor}>
            Add Major
          </button>
          <button
            type="button"
            className="bg-blue-700 text-white px-4 py-2 rounded mr-2"
            onClick={handleNextStep}>
            Next
          </button>
        </div>
 )}

      {step === 2 && (
        <div>
          <h2 className="text-xl font-semibold mb-4">Step 2: Target Graduation Date</h2>

          <div className="mb-4">
            <label className="block mb-2">Season</label>
            <select
              className="block w-full border border-gray-300 rounded p-2"
              value={graduationDate.season}
              onChange={(e) => setGraduationDate({ ...graduationDate, season: e.target.value })}
            >

              <option value="">Select Season</option>
              <option value="Fall">{"Fall"}</option>
              <option value="Winter">{"Winter"}</option>
              <option value="Spring">{"Spring"}</option>
              <option value="Summer">{"Summer"}</option>
            </select>
            <label className="block mb-2 pt-2">Year</label>
            <select
              className="block w-full border border-gray-300 rounded p-2"
              value={graduationDate.year}
              onChange={(e) => setGraduationDate({ ...graduationDate, year: e.target.value })}
            >

              <option value="">Select Year</option>
              <option value={new Date().getFullYear()}>{new Date().getFullYear()}</option>
              <option value={new Date().getFullYear() + 1}>{new Date().getFullYear() + 1}</option>
              <option value={new Date().getFullYear() + 2}>{new Date().getFullYear()  + 2}</option>
              <option value={new Date().getFullYear() + 3}>{new Date().getFullYear()  + 3}</option>
              <option value={new Date().getFullYear() + 4}>{new Date().getFullYear()  + 4}</option>
            </select>
          </div>

          <button
            type="button"
            className="bg-blue-700 text-white px-4 py-2 rounded mr-2"
            onClick={handlePreviousStep}
          >
            Previous
          </button>
          <button
            type="button"
            className="bg-blue-700 text-white px-4 py-2 rounded"
            onClick={handleNextStep}
          >
            Next
          </button>
        </div>
      )}

      {step === 3 && (
        <div>
          <h2 className="text-xl font-semibold mb-4">Step 3: Courses Completed So Far</h2>
          {courses.map((course, index) => (
            <div key={index} className="mb-4">
              <label className="block mb-2">Subject Area</label>
              <input
                type="text"
                className="block w-full border border-gray-300 rounded p-2 mb-2"
                value={course.subject}
                onChange={(e) => handleCourseChange(index, 'subject', e.target.value)}
              />
              <label className="block mb-2">Course Title</label>
              <input
                type="text"
                className="block w-full border border-gray-300 rounded p-2"
                value={course.title}
                onChange={(e) => handleCourseChange(index, 'title', e.target.value)}
              />
            </div>
          ))}
          <button
            type="button"
            className="bg-blue-700 text-white px-4 py-2 rounded mb-4"
            onClick={handleAddCourse}
          >
            Add Course
          </button>
          <button
            type="button"
            className="bg-blue-700 text-white px-4 py-2 rounded mr-2 ml-2"
            onClick={handlePreviousStep}
          >
            Previous
          </button>
          <button
            type="button"
            className="bg-blue-700 text-white px-4 py-2 rounded"
            onClick={handleNextStep}
          >
            Next
          </button>
        </div>
      )}

      {step === 4 && (
        <div>
          <h2 className="text-xl font-semibold mb-4">Step 4: Personal Preferences</h2>
          <div className="mb-4">
            <label className="block mb-2">Time</label>
            <div className="flex mb-2">
              <input
                type="time"
                className="block w-full border border-gray-300 rounded p-2 mr-2"
                value={time.start}
                onChange={(e) => setTime({ ...time, start: e.target.value })}
              />
              <input
                type="time"
                className="block w-full border border-gray-300 rounded p-2"
                value={time.end}
                onChange={(e) => setTime({ ...time, end: e.target.value })}
              />
            </div>
            <label className="block mb-2">Max Course Load Units/Quarter</label>
            <select
              className="block w-full border border-gray-300 rounded p-2"
              value={maxLoad}
              onChange={(e) => setMaxLoad(e.target.value)}
            >
              <option value="">Select Units</option>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19].map((num) => (
                <option key={num} value={num}>{num}</option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block mb-2">Summer Classes</label>
            <select
              className="block w-full border border-gray-300 rounded p-2"
              value={summerClasses}
              onChange={(e) => setSummerClasses(e.target.value)}
            >
              <option value="">Yes/No</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>
          <button
            type="button"
            className="bg-blue-700 text-white px-4 py-2 rounded mr-2"
            onClick={handlePreviousStep}
          >
            Previous
          </button>
          <button
            type="button"
            className="bg-blue-700 text-white px-4 py-2 rounded"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      )}
    </div>
    </div>
  );
};
export default Form;
