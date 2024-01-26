import { Route } from "@angular/router";
import { AllTodosComponent } from "../todos/all-todos/all-todos.component";
import { FavTodosComponent } from "../todos/fav-todos/fav-todos.component";
import { CompletedTodosComponent } from "../todos/completed-todos/completed-todos.component";
import { resolve } from "../auth-guards/resolve";

export default [
    {path: 'allTodos',  component: AllTodosComponent  },
    {path: 'alltodos', component: AllTodosComponent },
    {path: 'favTodos', component: FavTodosComponent, resolve: {data: resolve} },
    {path: 'favtodos', component: FavTodosComponent, resolve: {data: resolve}},
    {path: 'completedTodos', component: CompletedTodosComponent },
    {path: 'completedtodos', component: CompletedTodosComponent },
]as Route[];