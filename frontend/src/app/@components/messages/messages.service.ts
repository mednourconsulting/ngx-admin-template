import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {LanguageService} from "../languages/language.service";

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  private errorMessage: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);
  private successMessage: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);

  constructor(
    private languageService: LanguageService
  ) {}

  setErrorMessage(messages: string[]) {
    console.log(messages);
    this.errorMessage.next(messages);
  }

  setSuccessMessage(messages: string[]) {
    this.successMessage.next(messages);
  }

  clearErrorMessage() {
    this.errorMessage.next([]);
  }

  clearSuccessMessage() {
    this.successMessage.next([]);
  }

  getErrorMessage(): Observable<string[]> {
    return this.errorMessage;
  }

  getSuccessMessage(): Observable<string[]> {
    return this.successMessage;
  }
  setMessage(status: number) {
    if (status === 200) {
      this.successMessage.next(this.getMessageText(status));
    } else {
      this.errorMessage.next(this.getMessageText(status));
    }
  }
  setErrorMessageFromStatus(status: number) {
    this.errorMessage.next(this.getMessageText(status));
  }
  setSuccessMessageFromStatus(status: number) {
    this.successMessage.next(this.getMessageText(status));
  }
  getMessageText(status: number) : string[]{
    const msg = this.languageService.getLanguageText('response_status_'+ status);
    console.warn(msg);
    return [msg];
  }
}
