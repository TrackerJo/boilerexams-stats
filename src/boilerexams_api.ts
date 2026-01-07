/* eslint-disable @typescript-eslint/no-explicit-any */
import { Course, Exam, Question } from "./constants";

const USE_FAKE_API = false

export async function getQuesion(questionId: string): Promise<Question> {
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
                return questions.find((q) => q.id = questionId)!
            }

            return Question.fromJSON(res)
        })
}

export async function getCourse(courseId: string): Promise<Course> {
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
                return courses.find((c) => c.id = courseId)!
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
                return exams.find((e) => e.id = examId)!
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
        request = new Request(`/api/exams/`, {
            method: 'GET',
            headers: headers
        })
    }

    return fetch(request)
        .then(res => res.json())
        .then(res => {
            const exams: Exam[] = [];
            res.forEach((e: any) => exams.push(Exam.fromJSON(e)))
            return exams;

        })
}