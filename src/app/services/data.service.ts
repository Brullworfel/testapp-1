import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { BehaviorSubject, firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface Message {
  fromName: string;
  subject: string;
  date: string;
  id: number;
  readed: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  messages$: BehaviorSubject<Message[]> = new BehaviorSubject<Message[]>([]);

  constructor(
    private httpClient: HttpClient,
    private toastController: ToastController,
  ) { }

  public fetchMessages(): Promise<void> {
    return firstValueFrom(
      this.httpClient.get(`${environment.apiUrl}?action=getMessages`,{
        responseType:'json'
      })
    ).then(response=>{
      this.messages$.next(response as Message[]);
    }).catch(async error=>{
      const toast = await this.toastController.create({
        message: error.error.message ?? 'Неизвестная ошибка!',
        duration: 2000,
        color: 'danger',
      });
      toast.present();
    })
  }

  public getMessageById(id: number): Message | undefined {
    return this.messages$.getValue().find(m=>m.id===id);
  }
}
