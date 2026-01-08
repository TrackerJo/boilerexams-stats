/* eslint-disable @typescript-eslint/no-explicit-any */
import { Course, Exam, Question } from "./constants";

const USE_FAKE_API = false

export async function getQuesion(questionId: string): Promise<Question> {
    console.log("GETTING QUESTION", questionId)
    const headers: Headers = new Headers()

    headers.set('Content-Type', 'application/json')
    headers.set('Accept', 'application/json')
    let request: RequestInfo;
    if (USE_FAKE_API) {
        request = new Request(`./questions.json`, {
            method: 'GET',
            headers: headers
        })
    } else {
        request = new Request(`/api/questions/${questionId}`, {
            method: 'GET',
            headers: headers
        })
    }


    return fetch(request)
        .then(res => res.json())
        .then(res => {
            if (USE_FAKE_API) {
                const questions: Question[] = [];
                res.forEach((e: any) => questions.push(Question.fromJSON(e)))
                console.log(questions, "QUESTIONS")
                const question: Question = questions.find((q) => q.id == questionId)!
                console.log(question, "FOUND QUESTION")
                return question
            }

            return Question.fromJSON(res)
        })
}

export async function getCourse(courseId: string): Promise<Course> {
    console.log("Getting Course", courseId)
    const headers: Headers = new Headers()

    headers.set('Content-Type', 'application/json')
    headers.set('Accept', 'application/json')
    let request: RequestInfo;
    if (USE_FAKE_API) {
        request = new Request(`./courses.json`, {
            method: 'GET',
            headers: headers
        })
    } else {
        request = new Request(`/api/courses/${courseId}`, {
            method: 'GET',
            headers: headers
        })
    }

    return fetch(request)
        .then(res => res.json())
        .then(res => {
            if (USE_FAKE_API) {
                const courses: Course[] = [];
                res.forEach((e: any) => courses.push(Course.fromJSON(e)))
                return courses.find((c) => c.id == courseId)!
            }
            return Course.fromJSON(res)
        })
}

export async function getExam(examId: string): Promise<Exam> {
    const headers: Headers = new Headers()

    headers.set('Content-Type', 'application/json')
    headers.set('Accept', 'application/json')

    let request: RequestInfo;
    if (USE_FAKE_API) {
        request = new Request(`./exams.json`, {
            method: 'GET',
            headers: headers
        })
    } else {
        request = new Request(`/api/exams/${examId}`, {
            method: 'GET',
            headers: headers
        })
    }

    return fetch(request)
        .then(res => res.json())
        .then(res => {
            if (USE_FAKE_API) {
                const exams: Exam[] = [];
                res.forEach((e: any) => exams.push(Exam.fromJSON(e)))
                return exams.find((e) => e.id == examId)!
            }
            return Exam.fromJSON(res)
        })
}

export async function getAllExams(): Promise<Exam[]> {
    const headers: Headers = new Headers()

    headers.set('Content-Type', 'application/json')
    headers.set('Accept', 'application/json')

    let request: RequestInfo;
    if (USE_FAKE_API) {
        request = new Request(`./exams.json`, {
            method: 'GET',
            headers: headers
        })
    } else {
        request = new Request(`/api/exams`, {
            method: 'GET',
            headers: headers
        })
    }

    return fetch(request)
        .then(res => res.json())
        .then(res => {
            const exams: Exam[] = [];
            console.log("GETTING ALL EXAMS")
            console.log(res);
            console.log(typeof res)
            res.forEach((e: any) => exams.push(Exam.fromJSON(e)))
            return exams;

        })
}