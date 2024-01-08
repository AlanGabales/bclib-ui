import { BookStatus, ReturnStatus, Status } from "../_helpers/enums/status";
import { Book } from "./book";
import { Employee } from "./employee";
import { Student } from "./student";

export class BorrowersRecord {
    id?: string;
    borrower_type?: string;
    student?: Student;
    employee?: Employee;
    book?: Book;
    date_borrowed?: Date;
    date_returned?: Date;
    remarks?: string;
    books_status?: BookStatus;
    return_status?:ReturnStatus;
    fee?: number;
}