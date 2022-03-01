import { Component, OnInit } from '@angular/core';
import { AccountsService } from './accounts.service';
import { UserService } from './users.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UserService]
  //styles: [`
//h3{
//color:dodgerblue;
//}
//`]
})
export class AppComponent implements OnInit{
  oddNumbers: number[] = [];
  evenNumbers: number[] = [];

  onIntervalFired(firedNumber: number) {
    if (firedNumber % 2 === 0) {
      this.evenNumbers.push(firedNumber);

    } else {
      this.oddNumbers.push(firedNumber);
    }
    
  }

  serverElements = [{ type: 'server', name: 'Testserver', content: 'just a test!' }];

  onServerAdded(serverData: {serverName:string, serverContent:string}) {
    this.serverElements.push({
     type: 'server',
    name: serverData.serverName,
    content: serverData.serverContent
     });

  }

  onBlueprintAdded(blueprintData: {serverName:string, serverContent:string}) {
     this.serverElements.push({
     type: 'server',
     name: blueprintData.serverName,
     content: blueprintData.serverContent
    });

  }

  onChangeFirst() {
    this.serverElements[0].name = 'Changed!';
  }

  onDestroyFirst() {
    this.serverElements.splice(0, 1);
  }

  username = '';
  showPassword = false;
  log = [0];
  onToggleDetails(){
    this.showPassword = !this.showPassword;
  this.log.push(this.log.length + 0);

  }

  ngOnInit() {
    this.accounts = this.accountsService.accounts;
  }
  
  accounts: { name: string, status: string }[] = [];
  constructor(private accountsService: AccountsService) {

  }
}
