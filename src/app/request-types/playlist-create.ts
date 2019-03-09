export class CreatePlaylistRequest {
    name: string;
    public: boolean;
    collaborative: boolean;
    description: string;

    constructor(name: string, isPublic: boolean, isCollaborative: boolean, description: string){
        this.name = name;
        this.public = isPublic;
        this.collaborative = isCollaborative
        this.description = description
    }
}