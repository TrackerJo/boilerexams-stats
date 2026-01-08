import { useState } from "react";
import { Course, Exam, Question, QuestionStat, Topic } from "../constants";
import "./course_stat_screen.css";
import StatTile from "./stat_tile";
import LargeStatTile from "./large_stat_tile";

type CourseStatScreenProps = {
    course: Course,
    questions: Question[],
    questionStats: QuestionStat[],
    exams: Exam[],
    topics: Topic[]
}

const CourseStatScreen = ({ course, questionStats, exams, topics, questions }: CourseStatScreenProps) => {
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
    const [courseExams, setCourseExams] = useState<Exam[]>(exams);
    const [courseTopics, setCourseTopics] = useState<Topic[]>(topics);


    const getCourseProgress = (): string => {

        let answeredCorrectly: number = 0;
        questionStats.forEach((stat) => {
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

    const getExamProgress = (exam: Exam): string => {

        const attemptedExamQuestios: QuestionStat[] = questionStats.filter((qS) => exam.questions.includes(qS.id))
        const progress: number = attemptedExamQuestios.length / exam.questions.length;
        if (progress < 1 && progress != 0) {
            return progress.toFixed(2) + "%";
        }
        return progress.toFixed(0) + "%";

    }

    const getExamGrade = (exam: Exam): string => {
        const attemptedExamQuestios: QuestionStat[] = questionStats.filter((qS) => exam.questions.includes(qS.id))
        let answeredCorrectly: number = 0;
        attemptedExamQuestios.forEach((stat) => {
            for (const a of stat.attempts) {
                if (a.correct) {
                    answeredCorrectly++;
                    return;
                }
            }
        })
        const grade: number = answeredCorrectly / exam.questions.length;
        return (grade * 100).toFixed(2) + "%"

    }

    const getCompletedExams = (): number => {
        let completedExams: number = 0;
        courseExams.forEach((exam) => {
            for (const question of exam.questions) {
                if (!questionStats.find((qS) => qS.id == question)) {
                    return;
                }
            }
            completedExams++;
        });
        return completedExams;
    }

    const formatExamName = (exam: Exam): string => {

        // if (exam.number == 0) examType = "Midterm 1";
        // if (exam.number == 1) examType = "Midterm 2";
        // if (exam.number == 2) examType = "Final";
        return exam.season + " " + exam.year + " " + (exam.number + 1)
    }

    const generateExamMap = (exams: Exam[]): Map<string, string>[] => {
        const examMap: Map<string, string>[] = [];
        for (const exam of exams) {
            const map: Map<string, string> = new Map<string, string>();
            map.set("Exam", formatExamName(exam))
            map.set("Progress", getExamProgress(exam))
            map.set("Current Score", getExamGrade(exam))
            examMap.push(map)

        }
        return examMap
    }

    const sortExams = (header: string, increasing: boolean) => {
        console.log("Sorting Exams")
        const exams = [...courseExams];
        switch (header) {
            case "Exam":
                exams.sort((a, b) => increasing ? formatExamName(a).localeCompare(formatExamName(b)) : formatExamName(b).localeCompare(formatExamName(a)))
                break;
            case "Progress":
                exams.sort((a, b) => increasing ? getExamProgress(a).localeCompare(getExamProgress(b)) : getExamProgress(b).localeCompare(getExamProgress(a)))
                break;
            case "Current Score":
                exams.sort((a, b) => increasing ? getExamGrade(a).localeCompare(getExamGrade(b)) : getExamGrade(b).localeCompare(getExamGrade(a)))
                break;
            default:
                exams.sort((a, b) => increasing ? formatExamName(a).localeCompare(formatExamName(b)) : formatExamName(b).localeCompare(formatExamName(a)))
                break;
        }
        setCourseExams([...exams])
    }

    const getTopicProgress = (topic: Topic): string => {
        let completedQuestions: number = 0;
        questionStats.forEach((qStat) => {
            let answeredCorrectly: boolean = false;
            for (const a of qStat.attempts) {
                if (a.correct) {
                    answeredCorrectly = true;
                    break;
                }
            }
            if (!answeredCorrectly) return;
            const question: Question = questions.find((q) => q.id == qStat.id)!;
            if (question.topics.find((t) => t.id == topic.id)) completedQuestions++;
        })
        const progress: number = completedQuestions / topic.totalQuestions;
        if (progress < 1 && progress != 0) {
            return progress.toFixed(2) + "%";
        }
        return progress.toFixed(0) + "%";


    }

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

    const getTopicTimeStudied = (topic: Topic): string => {
        let timeStudied: number = 0;
        questionStats.forEach((qStat) => {

            const question: Question = questions.find((q) => q.id == qStat.id)!;
            if (question.topics.find((t) => t.id == topic.id)) timeStudied += qStat.timeSpent;
        })
        timeStudied = timeStudied / 1000;
        return formatNumber(timeStudied);


    }

    const generateTopicMap = (topics: Topic[]): Map<string, string>[] => {
        const topicMap: Map<string, string>[] = [];
        for (const topic of topics) {
            const map: Map<string, string> = new Map<string, string>();
            map.set("Topic", topic.name)
            map.set("Progress", getTopicProgress(topic))
            map.set("Time Studied", getTopicTimeStudied(topic))
            topicMap.push(map)

        }
        return topicMap
    }

    const sortTopics = (header: string, increasing: boolean) => {
        console.log("Sorting Topics")
        const topics = [...courseTopics];
        switch (header) {
            case "Topic":
                topics.sort((a, b) => increasing ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name))
                break;
            case "Progress":
                topics.sort((a, b) => increasing ? getTopicProgress(a).localeCompare(getTopicProgress(b)) : getTopicProgress(b).localeCompare(getTopicProgress(a)))
                break;
            case "Time Studied":
                topics.sort((a, b) => increasing ? convertStringToNumber(getTopicTimeStudied(a)) - convertStringToNumber(getTopicTimeStudied(b)) : convertStringToNumber(getTopicTimeStudied(b)) - convertStringToNumber(getTopicTimeStudied(a)))
                break;
            default:
                topics.sort((a, b) => increasing ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name))
                break;
        }
        setCourseTopics([...topics])
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
            <StatTile stat={getCourseProgress()} title="Course Progress" color="orange" />
            <StatTile stat={formatNumber(totalTimeStudied)} title="Total Time Studied" color="yellow" />
            <StatTile stat={questionStats.length.toString()} title="Total Questions Answered" color="blue" />
            <StatTile stat={totalQuestionAnsweredCorrectly.toString()} title="Total Questions Answered Correctly" color="green" />
            <StatTile stat={getCompletedExams().toString()} title={`${getCompletedExams() > 1 ? "Exams" : "Exam"} Completed`} color="pink" />
            {/* <div className="stat-tile large-stat-tile">
                <h3 className="title">Exam Statistics</h3>
                <div className="headers">
                    <label htmlFor="">Exam Name</label>
                    <label htmlFor="">Progress</label>
                    <label htmlFor="">Current Score</label>
                </div>
                {
                    exams.map((exam) => (<div className="exam-stat"> <h1 className="name">{formatExamName(exam)}</h1><h1 className="progress">{getExamProgress(exam)}</h1><h1 className="grade">{getExamGrade(exam)}</h1> </div>))
                }
            </div> */}
            <LargeStatTile title="Exam Statistics" headers={["Exam", "Progress", "Current Score"]} items={generateExamMap(courseExams)} sort={sortExams} itemColors={["white", "blue", "green"]} tooltips={["", "Based on questions answered / total questions", ""]} />
            <LargeStatTile title="Topic Statistics" headers={["Topic", "Progress", "Time Studied"]} items={generateTopicMap(courseTopics)} sort={sortTopics} itemColors={["white", "blue", "yellow"]} tooltips={["", "Based on questions answered correctly / total questions", ""]} />

        </div >
    )
}

export default CourseStatScreen