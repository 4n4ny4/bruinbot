// src/components/MultiStepForm.js
import React, { useState } from 'react';
import "/Users/ananyaanand/Desktop/bruinbot/src/index.css"
import '/Users/ananyaanand/Desktop/bruinbot/src/index.js'; 

export const Form = () => {
  const [step, setStep] = useState(1);
  const [major, setMajor] = useState('');
  const [college, setCollege] = useState('');
  const [technicalBreadth, setTechnicalBreadth] = useState('');
  const [graduationDate, setGraduationDate] = useState('');
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

  const handleNextStep = () => {
    setStep(step + 1);
  };

  const handlePreviousStep = () => {
    setStep(step - 1);
  };

  const handleSubmit = () => {
    console.log({
      major,
      college,
      technicalBreadth,
      graduationDate,
      courses,
      time,
      maxLoad,
      summerClasses,
    });
  };

  return (
    <div className="text-gray-500 max-w-4xl mx-auto p-6 bg-gray-100 rounded-lg shadow-md">
      {step === 1 && (
        <div>
          <h2 className="text-xlfont-semibold mb-4">Step 1: Select Your Major(s)</h2>
          <div className="mb-4">
            <label className="block mb-2">Major</label>
            <input
              type="text"
              className="block w-full border border-gray-300 rounded p-2"
              value={major}
              onChange={(e) => setMajor(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">College</label>
            <select
              className="block w-full border border-gray-300 rounded p-2"
              value={college}
              onChange={(e) => setCollege(e.target.value)}
            >
              <option value="">Select College</option>
              <option value="Engineering">College of Engineering</option>
              <option value="Arts">College of Arts</option>
              <option value="Business">College of Business</option>
            </select>
          </div>
          {college === 'Engineering' && (
            <div className="mb-4">
              <label className="block mb-2">Technical Breadth</label>
              <input
                type="text"
                className="block w-full border border-gray-300 rounded p-2"
                value={technicalBreadth}
                onChange={(e) => setTechnicalBreadth(e.target.value)}
              />
            </div>
          )}
          <button
            type="button"
            className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
            onClick={handleNextStep}>
            Next
          </button>
        </div>
      )}

      {step === 2 && (
        <div>
          <h2 className="text-xl font-semibold mb-4">Step 2: Target Graduation Date</h2>
          <div className="mb-4">
            <label className="block mb-2">Graduation Date</label>
            <select
              className="block w-full border border-gray-300 rounded p-2"
              value={graduationDate}
              onChange={(e) => setGraduationDate(e.target.value)}
            >
              <option value="">Select Date</option>
              <option value="2025 Spring">Spring 2025</option>
              <option value="2025 Fall">Fall 2025</option>
              <option value="2026 Spring">Spring 2026</option>
            </select>
          </div>
          <button
            type="button"
            className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
            onClick={handlePreviousStep}
          >
            Previous
          </button>
          <button
            type="button"
            className="bg-blue-500 text-white px-4 py-2 rounded"
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
            className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
            onClick={handleAddCourse}
          >
            Add Course
          </button>
          <button
            type="button"
            className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
            onClick={handlePreviousStep}
          >
            Previous
          </button>
          <button
            type="button"
            className="bg-blue-500 text-white px-4 py-2 rounded"
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
            className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
            onClick={handlePreviousStep}
          >
            Previous
          </button>
          <button
            type="button"
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      )}
    </div>
  );
};
export default Form;
