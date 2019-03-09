export class Channel {
    name: string
    owner: string
    id?: string
    
    constructor(name: string, owner: string, id?: string){
        this.id = id;
        this.name = name;
        this.owner = owner;
    }
}