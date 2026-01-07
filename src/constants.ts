/* eslint-disable @typescript-eslint/no-explicit-any */
enum QuestionType {
    multiple_choice = "MULTIPLE_CHOICE"
}

enum Season {
    fall = "FALL",
    spring = 'SPRING'
}

export class Exam {
    id: string;
    courseId: string;
    number: number;
    year: number;
    season: Season;
    difficulty: number;

    constructor({ id, courseId, number, year, season, difficulty }: Exam) {
        this.id = id;
        this.courseId = courseId;
        this.number = number;
        this.difficulty = difficulty;
        this.year = year;
        this.season = season
    }

    static fromJSON(data: any): Exam {
        return new Exam({
            id: data.id,
            courseId: data.courseId,
            difficulty: data.stats.difficulty,
            year: data.year,
            season: data.season,
            number: data.number
        })
    }
}

export class Topic {
    id: string;
    courseId: string;
    name: string;
    difficulty: number;

    constructor({ id, courseId, name, difficulty }: Topic) {
        this.id = id;
        this.courseId = courseId;
        this.name = name;
        this.difficulty = difficulty;
    }

    static fromJSON(data: any): Topic {
        return new Topic({
            id: data.id,
            courseId: data.courseId,
            name: data.name,
            difficulty: data.stats.difficulty
        })
    }
}

export class Question {
    type: QuestionType;
    id: string;
    courseId: string;
    exam: Exam;
    difficulty: number;


    constructor({ type, id, courseId, exam, difficulty }: Question) {
        this.type = type;
        this.id = id;
        this.courseId = courseId;
        this.exam = exam;
        this.difficulty = difficulty;
    }
    static fromJSON(data: any): Question {
        return new Question({
            type: data.type,
            id: data.id,
            courseId: data.courseId,
            exam: Exam.fromJSON(data.exam),
            difficulty: data.stats.difficulty
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
            totalTimeSpent: data.totalTimeSpent,
            totalQuestions: data.totalQuestions,
            totalExams: data.totalExams,
            difficulty: data.difficulty
        })
    }
}

export class QuestionStat {

}