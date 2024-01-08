import { Status } from "../_helpers/enums/status";
import { Course } from "./course";

export class Employee {
    id?: string;
    employee_id?: string;
    first_name?: string;
    last_name?: string;
    full_name?: string;
    course?: Course;
    status?: Status;
}