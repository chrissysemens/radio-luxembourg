export class Channel {
    id: string
    name: string
    owner: string
    
    constructor(id: string, name: string, owner: string){
        this.id = id;
        this.name = name;
        this.owner = owner;
    }
}