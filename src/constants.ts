/* eslint-disable @typescript-eslint/no-explicit-any */
enum QuestionType {
    multiple_choice = "MULTIPLE_CHOICE"
}

enum Season {
    fall = "FALL",
    spring = 'SPRING'
}

// export interface Sortable<T> {
//     sortBy(value: string, increasing: boolean): T[]
// }

// export class ExamList implements Sortable<Exam> {
//     exams: Exam[]

//     constructor({ exams }: ExamList) {
//         this.exams = exams;
//     }

//     sortBy(value: string, increasing: boolean): Exam[] {
//         const sortedList = this.exams.sort((a, b) => a[value].compareTo(b[value]))
//     }
// }

export class Exam {
    id: string;
    courseId: string;
    number: number;
    year: number;
    season: Season;
    difficulty: number;
    questions: string[];

    constructor({ id, courseId, number, year, season, difficulty, questions }: Exam) {
        this.id = id;
        this.courseId = courseId;
        this.number = number;
        this.difficulty = difficulty;
        this.year = year;
        this.season = season;
        this.questions = questions;
    }

    static fromJSON(data: any): Exam {
        return new Exam({
            id: data.id,
            courseId: data.courseId,
            difficulty: data.stats.difficulty,
            year: data.year,
            season: data.season,
            number: data.number,
            questions: data.questions.map((q: any) => q.id)
        })
    }
}

export class Topic {
    id: string;
    courseId: string;
    name: string;
    difficulty: number;
    totalQuestions: number;

    constructor({ id, courseId, name, difficulty, totalQuestions }: Topic) {
        this.id = id;
        this.courseId = courseId;
        this.name = name;
        this.difficulty = difficulty;
        this.totalQuestions = totalQuestions;
    }

    static fromJSON(data: any): Topic {
        return new Topic({
            id: data.id,
            courseId: data.courseId,
            name: data.name,
            difficulty: data.stats.difficulty,
            totalQuestions: data.stats.questions
        })
    }
}

export class Question {
    type: QuestionType;
    id: string;
    courseId: string;
    topics: Topic[];
    difficulty: number;


    constructor({ type, id, courseId, difficulty, topics }: Question) {
        this.type = type;
        this.id = id;
        this.courseId = courseId;
        this.difficulty = difficulty;
        this.topics = topics;
    }
    static fromJSON(data: any): Question {
        return new Question({
            type: data.type,
            id: data.id,
            courseId: data.courseId,
            difficulty: data.stats.difficulty,
            topics: data.topics.map((t: any) => Topic.fromJSON(t))
        });
    }
}

export class Course {
    id: string;
    abbreviation: string;
    number: number;
    name: string;
    subject: string;
    color: string;
    totalTimeSpent: number;
    totalQuestions: number;
    totalExams: number;
    difficulty: number;

    constructor({ id, abbreviation, number, name, subject, color, totalTimeSpent, totalQuestions, totalExams, difficulty }: Course) {
        this.id = id;
        this.abbreviation = abbreviation;
        this.number = number;
        this.name = name;
        this.subject = subject;
        this.color = color;
        this.totalTimeSpent = totalTimeSpent;
        this.totalQuestions = totalQuestions;
        this.totalExams = totalExams;
        this.difficulty = difficulty;

    }

    static fromJSON(data: any): Course {
        return new Course({
            id: data.id,
            abbreviation: data.abbreviation,
            number: data.number,
            name: data.name,
            subject: data.subject,
            color: data.color,
            totalTimeSpent: data.stats.timeSpent,
            totalQuestions: data.stats.questions,
            totalExams: data.stats.exams,
            difficulty: data.stats.difficulty
        })
    }
}

export class Attempt {
    id: string;
    correct: boolean;
    userSolution: string[];
    type: QuestionType;

    constructor({ id, correct, userSolution, type }: Attempt) {
        this.id = id;
        this.correct = correct;
        this.userSolution = userSolution;
        this.type = type;
    }

    static fromJSON(data: any): Attempt {
        return new Attempt({
            id: data.id,
            correct: data.correct,
            userSolution: data.userSolution,
            type: data.type
        })
    }
}

export class QuestionStat {
    id: string;
    attempts: Attempt[];
    timeSpent: number;

    constructor({ attempts, id, timeSpent }: QuestionStat) {
        this.attempts = attempts;
        this.id = id;
        this.timeSpent = timeSpent;

    }

    static fromJSON(data: any, id: string): QuestionStat {
        return new QuestionStat({
            attempts: data.attempts.map((a: any) => Attempt.fromJSON(a)),
            id: id,
            timeSpent: Math.random() * 600000
        })
    }

}

