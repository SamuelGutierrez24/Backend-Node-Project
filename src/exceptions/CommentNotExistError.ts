export default class CommentNotExistsError extends Error{
    constructor(message:string){
        super('');
        this.name = this.constructor.name;
        this.stack= message +" : "+ this.stack;
    }
}