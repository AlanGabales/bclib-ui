import { BooksStatus } from "../_helpers/enums/status";
import { Accession } from "./accession";
import { Author } from "./author";
import { Category } from "./category";
import { Publisher } from "./publisher";

export class Book {
    id?: string;
   // name?: string;
    description?: string;
    book_status?: BooksStatus;
    author?: Author;
    category?: Category;
    author_number?: string;
    classification?: string;
    title?: string;
    edition?: string;
    volumes?: string;
    pages?: string;
    source_of_fund?: string;
    cost_price?: number;
    year?: string;
    remarks?: string;
    publisher?: Publisher;
    accession?:Accession;
    number?:number;
    quantity?:number;
}