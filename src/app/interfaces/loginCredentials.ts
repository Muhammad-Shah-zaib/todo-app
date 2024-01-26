import { FormControl } from "@angular/forms";

export type userData = user[];

export interface user {
    id?: string;
    username?: FormControl<string>;
    password?: FormControl<string>;
}