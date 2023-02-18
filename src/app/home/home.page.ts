import { Component, OnInit } from '@angular/core';
import { RefresherCustomEvent } from '@ionic/angular';

import { DataService, Message } from '../services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  messages$ = this.dataService.messages$;
  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.fetch();
  }

  refresh(ev: any) {
    this.fetch().finally(()=>{
      (ev as RefresherCustomEvent).detail.complete();
    })
  }

  private fetch(): Promise<void>{
    return this.dataService.fetchMessages();
  };



}
