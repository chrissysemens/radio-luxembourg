export class Profile {
    country: string
    display_name: string
    email: string
    followers: number
    profile_url: string
    id: string
    image_url: string
    product: string
    type: string
    uri: string


    constructor(country: string, 
                display_name: string, 
                email: string, 
                followers: number, 
                profile_url: string, 
                id: string, 
                image_url: string, 
                product: string, 
                type: string, 
                uri: string){
                    this.country = country;
                    this.display_name = display_name;
                    this.email = email;
                    this.followers = followers;
                    this.profile_url = profile_url,
                    this.id = id,
                    this.image_url = image_url,
                    this.product = product,
                    this.type = type,
                    this.uri = uri
    }
}