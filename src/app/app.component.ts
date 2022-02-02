import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  //styleUrls: ['./app.component.css']
  styles: [`
h3{
color:dodgerblue;
}
`]
})
export class AppComponent {
  username = '';
  showPassword = false;
  log = [0];
  onToggleDetails(){
    this.showPassword = !this.showPassword;
  this.log.push(this.log.length + 0);

  }
}
