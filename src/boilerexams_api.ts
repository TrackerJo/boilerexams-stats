import { Question, type Course } from "./constants";

export async function getQuesion(questionId: string): Promise<Question | null> {
    const headers: Headers = new Headers()
    // Add a few headers
    headers.set('Content-Type', 'application/json')
    headers.set('Accept', 'application/json')

    const request: RequestInfo = new Request(`https://api.boilerexams.com/questions/${questionId}`, {
        method: 'GET',
        headers: headers
    })

    return fetch(request)
        .then(res => res.json())
        .then(res => {
            return Question.fromJSON(res)
        })
}

async function getCourse(courseId: string): Promise<Course | null> {
    return null;
}