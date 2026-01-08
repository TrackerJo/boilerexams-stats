import type { Course } from "../constants";
import "./course_selector.css";



const CourseSelector = ({ courses, selectedCourse, setSelectedCourse }: { courses: Course[], selectedCourse: Course | null, setSelectedCourse: (course: Course | null) => void }) => {
    return (
        <div className={`course-selector`} >
            <div className={`course ${selectedCourse == null ? "selected" : ""}`} onClick={() => setSelectedCourse(null)}><label htmlFor="" className="course-label">Overview</label></div>
            {courses.map((c) => (<div className={`course ${selectedCourse == c ? "selected" : ""}`} onClick={() => setSelectedCourse(c)}><label htmlFor="" className="course-label">{c.abbreviation} {c.number} {c.name}</label></div>))}
        </div >
    )

}

export default CourseSelector;