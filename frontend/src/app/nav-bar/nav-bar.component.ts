import { Component, DoCheck } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements DoCheck {
  accessLevel!: string;
  userName: any = '';
  constructor(private authService: AuthService, private router: Router) {}
  ngDoCheck(): void {
    this.accessLevel = this.authService.getAccessLevel();

    console.log(this.accessLevel);

    this.userName = this.authService.userBuisnessData.user_name;
    //console.log(this.accessLevel);
  }
  ngOnInit() {
    this.accessLevel = this.authService.getAccessLevel();
  }
  logOut() {
    localStorage.clear();
    this.authService.changeUserBuisnessData(0);
    this.router.navigate(['/']);
  }
}
