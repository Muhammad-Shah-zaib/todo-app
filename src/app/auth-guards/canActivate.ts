import { inject } from "@angular/core";
import { CanActivateChildFn, CanActivateFn, Router } from "@angular/router";
import { ShareUserDataService } from "../services/share-user-data.service";
import { Observable, filter as filter$, map as map$ } from "rxjs";

export function canActivate (): Observable<boolean> {
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

export function canActivateChild(): Observable<boolean> {
    return canActivate(); // logic is same you can even use the upper function just creating this so that readibilitty is maintained
}