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

/**
 * Component displaying the amount of hours that a User has been registered with the site.
 */
export class HowManyHoursComponent {
  protected minds = window.Minds;
  protected hours : any;
  private user: any;

  constructor(
    public client: Client,
    public title: MindsTitle,
    public session: Session,
    public router: Router
  ) {
    this.title.setTitle('How Many Hours?');
  }

  async ngOnInit() {
      if (!this.session.isLoggedIn()) { //If not logged in.
        this.router.navigate(['/']); //Pass back to the router with '/'.
        return; //Exit/
      }
      this.client.get('api/v2/howmanyhours') //Get data from endpoint via client
        .then(async (response: any) => { 
          let _seconds = await this.findDifference(response.seconds, + new Date() / 1000) // Unary operator used to invoke Date's 'valueOf' function.
          this.hours = (_seconds / 60).toFixed(2) //2 DP for formatting.
        })
        .catch(e => {
          console.error('[Minds Admin] Cannot get account age.', e);
        });
  }

  /**
   * Finds the difference between two given Numbers, independant of order. 
   * Tolerates string input. 
   * @param a - { Number | String } - The first number to be compared.
   * @param a - { Number | String } - The seconds number to be compared.
   * @returns - { Number } - The difference between the two given numbers.
   */
  async findDifference(a, b){
    a = Number(a) 
    b = Number(b)
    return (a > b) ? a - b : b - a;
  }
}
