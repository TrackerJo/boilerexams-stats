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

    constructor({ attempts, id }: QuestionStat) {
        this.attempts = attempts;
        this.id = id;

    }

    static fromJSON(data: any, id: string): QuestionStat {
        return new QuestionStat({
            attempts: data.attempts.map((a: any) => Attempt.fromJSON(a)),
            id: id
        })
    }

}