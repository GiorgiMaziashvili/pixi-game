export function backout(amount:number){
    return (t:number) => --t * t * ((amount + 1) * t + amount) + 1;
}