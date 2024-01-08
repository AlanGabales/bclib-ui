import { Status, YearLevel } from "../_helpers/enums/status";
import { Course } from "./course";

export class Student {
    id?: string;
    student_id?: string;
    first_name?: string;
    last_name?: string;
    full_name?: string;
    course?: Course;
    year_level?: YearLevel;
    enrollment_date?:Date;
    status?: Status;
}