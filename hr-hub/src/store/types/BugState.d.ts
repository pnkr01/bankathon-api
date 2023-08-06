declare type BugState = {
    bugs: Bug[]
}

declare type Bug = {
    id: string;
    sno:string;
    title:string;
    status:string;
    details:string;
}