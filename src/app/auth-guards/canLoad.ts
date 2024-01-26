import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { ShareUserDataService } from "../services/share-user-data.service";
import { Observable, map as map$ } from "rxjs";

export function canLoadFn(): Observable<boolean> {
    // injecting Router and ShareUserDataService
    const router: Router = inject(Router); 
    const userData: ShareUserDataService = inject(ShareUserDataService);

    // returning an Observable of boolean type
    return userData.getState().pipe(
        // going through the each value emitted by the observable and mmodifying it to boolean based on my conition
        map$( (user: any) => {
            if (user.username === undefined || user.username === null){
                alert('You are not logged in!');
                router.navigate(['/login']);
                return false;
            }else {
                return true;
            }
        })
    )
}