import { Component, OnInit } from '@angular/core';
import { RadioService } from '../radio/radio.service';
import { ProfileService } from '../profile/profile.service';
import { Profile } from '../types/profile';

const routes = {
  me: () => `/v1/me`,
};

@Component({
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
  providers: [ProfileService, RadioService]
})

export class WelcomeComponent implements OnInit {

  searchResults: Array<any>;
  userId: string;

  constructor(
    private radioService: RadioService,
    private profileService: ProfileService) {};

  ngOnInit(){
    this.profileService.query(routes.me())
      .subscribe((resp: any) => {

        const profile = new Profile(
          resp.country,
          resp.display_name,
          resp.email,
          resp.followers.total,
          resp.profile_url,
          resp.id,
          resp.images[0].url,
          resp.product,
          resp.type,
          resp.uri
        )
      });
  }

  searched(results: Array<any>){
    this.searchResults = results;
  }

  startRadio(){
    this.radioService.connect();
  }
}
