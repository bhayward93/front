import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Navigation as NavigationService } from '../../services/navigation';
import { Session } from '../../services/session';
import { MindsTitle } from '../../services/ux/title';
import { Client } from '../../services/api';
import { LoginReferrerService } from '../../services/login-referrer.service';

@Component({
  selector: 'm-howmanyhours',
  templateUrl: 'howmanyhours.component.html'
})

export class HowManyHoursComponent {
  private seconds : any;
  private user: any;
  constructor(
    public client: Client,
    public title: MindsTitle,
    public session: Session

  ) {
  }
  async ngOnInit() {
    // if (this.session.isLoggedIn()) {
    //   this.router.navigate(['/newsfeed']);
    //   return;
    // }
    this.user = await this.session.getLoggedInUser(); //Get the current user.
    this.seconds = await this.findDifference(this.user.account_time_created, + new Date()); //unary operator used to invoke Date's 'valueOf' function.
    
    // this.seconds = await this.client.get('api/v2/howmanyhours')
    
    // this.seconds = response;
    //         })
    //         .catch(e => {
    //           console.error('[Minds Admin] Cannot load statistics', e);
    //         });
    //console.log(this.account_time_created);
    console.log(this.seconds)
    this.title.setTitle('How Many Hours?');
  }

  async findDifference(a, b){
    a = Number(a) 
    b = Number(b)
    console.log(a,b)
    return (a > b) ? a - b : b - a;
  }

  // (){

  // }
}
