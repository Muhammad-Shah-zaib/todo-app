import { Observable } from "rxjs"

export const resolve = () => {
    return new Observable( (observer: any) => {
        setTimeout(() => {
            observer.next(alert('Hello from the resolve'));
        }, 1000);
    })
}