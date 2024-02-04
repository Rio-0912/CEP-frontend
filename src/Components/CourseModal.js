import React, { useState, useRef } from 'react';

const CourseModal = ({ addCourseInDept }) => {
  const [name, setname] = useState('');
  const [shortDeptName, setshortDeptName] = useState('');
  const modalRef = useRef();


  const addCourse = async (e) => {
    e.preventDefault();
  
    try {
      if (typeof addCourseInDept !== 'function') {
        throw new Error('addCourseInDept is not a function');
      }
  
      console.log({ name, shortDeptName: localStorage.getItem('shortName') });
      addCourseInDept({ name, shortDeptName: localStorage.getItem('shortName') });
  
      // Clear form fields after submitting
      setname('');
      
      // Programmatically close the modal using the ref
      modalRef.current.click();
    } catch (error) {
      console.error("Error adding course:", error);
    }
  };
  
  
  return (
    <div>
      <button type="button" className="btn btn-outline-dark" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@getbootstrap">Add course</button>

      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLcourseabel">Add Course</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" ref={modalRef}></button>
            </div>
            <div className="modal-body">
              <form onSubmit={addCourse}>
                <div className="mb-3">
                  <label htmlFor="recipient-name" className="col-form-label">Name</label>
                  <input type="text" className="form-control" id="Course Name" name='deptShortName' value={name} onChange={(e) => setname(e.target.value)} />
                </div>
                <div className="mb-3">
                  <label htmlFor="message-text" className="col-form-label">department Short Name</label>
                  <input type="text" className="form-control" id="DeptShortName" name='shortDeptName' disabled value={localStorage.getItem('shortName')}  />
                </div>
                <button type="submit" className="btn btn-primary">Send message</button>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseModal;
