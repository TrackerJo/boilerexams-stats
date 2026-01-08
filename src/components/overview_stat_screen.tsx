import { useState } from "react";
import { Course, Exam, Question, QuestionStat } from "../constants";
import "./overview_stat_screen.css";
import StatTile from "./stat_tile";
import LargeStatTile from "./large_stat_tile";

type OverviewStatScreenProps = {
    courses: Course[],
    questions: Question[],
    questionStats: QuestionStat[],
    exams: Exam[],
    setSelectedCourse: (course: Course) => void
}

const OverviewStatScreen = ({ courses, questions, questionStats }: OverviewStatScreenProps) => {
    const formatNumber = (n: number): string => {
        let formattedTime: number = 0;
        let unit: string = "";
        if (n < 60) {
            formattedTime = n;
            unit = "Secs";
        } else if (n < 360) {
            formattedTime = n / 60;
            unit = "Mins";
        } else {
            formattedTime = n / 360;
            unit = "Hrs";
        }
        if (formattedTime.toFixed(0) == "1") unit = unit.replace("s", "")
        return formattedTime.toFixed(0) + " " + unit
    }
    const getTotalTimeStudied = (): number => {
        let totalTime: number = 0;
        questionStats.forEach((stat) => {
            totalTime += stat.timeSpent
        })
        return totalTime / 1000
    }

    const getTotalQuestionAnsweredCorrectly = (): number => {
        let answeredCorrectly: number = 0;
        questionStats.forEach((stat) => {
            for (const a of stat.attempts) {
                if (a.correct) {
                    answeredCorrectly++;
                    return;
                }
            }
        })
        return answeredCorrectly;
    }
    const [totalTimeStudied] = useState<number>(getTotalTimeStudied())
    const [totalQuestionAnsweredCorrectly] = useState<number>(getTotalQuestionAnsweredCorrectly())
    const [allCourses, setAllCourses] = useState<Course[]>(courses)



    const getCourseProgress = (course: Course): string => {
        const answeredCourseQuestions: Question[] = questions.filter((q) => q.courseId == course.id);
        const statCourseQuestions: QuestionStat[] = questionStats.filter((q) => answeredCourseQuestions.find((cQ) => cQ.id == q.id))
        let answeredCorrectly: number = 0;
        statCourseQuestions.forEach((stat) => {
            for (const a of stat.attempts) {
                if (a.correct) {
                    answeredCorrectly++;
                    return;
                }
            }
        })
        const progress: number = answeredCorrectly / course.totalQuestions;
        if (progress < 1 && progress != 0) {
            return progress.toFixed(2) + "%";
        }
        return progress.toFixed(0) + "%";

    }
    const generateCourseTimeStat = (course: Course): string => {
        const answeredCourseQuestions: Question[] = questions.filter((q) => q.courseId == course.id);
        const statCourseQuestions: QuestionStat[] = questionStats.filter((q) => answeredCourseQuestions.find((cQ) => cQ.id == q.id))
        let totalTime: number = 0;
        statCourseQuestions.forEach((stat) => {
            totalTime += stat.timeSpent
        })
        totalTime = totalTime / 1000;
        return formatNumber(totalTime)
    }

    const formatCourseName = (course: Course): string => `${course.abbreviation} ${course.number}`

    const generateCourseMap = (courses: Course[]): Map<string, string>[] => {
        const courseMap: Map<string, string>[] = [];
        for (const course of courses) {
            const map: Map<string, string> = new Map<string, string>();
            map.set("Course Name", formatCourseName(course))
            map.set("Progress", getCourseProgress(course))
            map.set("Time Studied", generateCourseTimeStat(course))
            courseMap.push(map)

        }
        return courseMap
    }

    const sortCourses = (header: string, increasing: boolean) => {
        console.log("Sorting Courses")
        const courses = [...allCourses];
        switch (header) {
            case "Course Name":
                courses.sort((a, b) => increasing ? formatCourseName(a).localeCompare(formatCourseName(b)) : formatCourseName(b).localeCompare(formatCourseName(a)))
                break;
            case "Progress":
                courses.sort((a, b) => increasing ? getCourseProgress(a).localeCompare(getCourseProgress(b)) : getCourseProgress(b).localeCompare(getCourseProgress(a)))
                break;
            case "Time Studied":
                courses.sort((a, b) => increasing ? convertStringToNumber(generateCourseTimeStat(a)) - convertStringToNumber(generateCourseTimeStat(b)) : convertStringToNumber(generateCourseTimeStat(b)) - convertStringToNumber(generateCourseTimeStat(a)))
                break;
            default:
                courses.sort((a, b) => increasing ? formatCourseName(a).localeCompare(formatCourseName(b)) : formatCourseName(b).localeCompare(formatCourseName(a)))
                break;
        }
        setAllCourses([...courses])
    }

    const convertStringToNumber = (s: string): number => {
        const parts: string[] = s.split(" ");
        switch (parts[1]) {
            case "Secs":
                return parseInt(parts[0])

            case "Mins":

                return parseInt(parts[0]) * 60
            case "Hrs":

                return parseInt(parts[0]) * 360

            default:
                return parseInt(parts[0])
        }
    }

    return (
        <div className="stat-screen">
            <StatTile stat={formatNumber(totalTimeStudied)} title="Total Time Studied" color="yellow" />
            <StatTile stat={allCourses.length.toString()} title="Courses Studied" color="orange" />
            <StatTile stat={questionStats.length.toString()} title="Total Questions Answered" color="blue" />
            <StatTile stat={totalQuestionAnsweredCorrectly.toString()} title="Total Questions Answered Correctly" color="green" />
            <LargeStatTile title="Course Statistics" headers={["Course Name", "Progress", "Time Studied"]} itemColors={["white", "blue", "yellow"]} items={generateCourseMap(allCourses)} sort={sortCourses} tooltips={["", "Based on questions answered / total questions", ""]} />

        </div >
    )
}

export default OverviewStatScreen