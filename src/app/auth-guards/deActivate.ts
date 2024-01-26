
export const canDeactivateFn = (component: any) => {
    if ( component.canExit ) {
        return component.canExit();
    }
    return true;
} 
