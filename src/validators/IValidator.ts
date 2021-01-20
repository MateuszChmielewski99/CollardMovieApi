export interface IValidator<T> {
    validate(value:T):Promise<{result:boolean, reason:string}>
}