import {Injectable} from '@angular/core';
import {language} from "./language";

@Injectable()
export class LanguageService {
  lang: LanguageInterface = DEFAULT_LANGUAGE;
  languages: Array<LanguageInterface> = [
    {
      id: 1,
      abrv: 'fr',
      name: 'Francais'
    }, {
      id: 2,
      abrv: 'en',
      name: 'English'
    }
  ];
  STORAGE_ITEM_KEY: string = 'Language';

  constructor() {
    this.getLanguage();
  }

  getLanguageText(key: string):string {
    return language[this.lang.abrv][key];
  }

  setLanguage(key: LanguageInterface) {
    localStorage.setItem(this.STORAGE_ITEM_KEY, JSON.stringify(key));
    this.lang = key;
  }

  getLanguage() {
    const key = localStorage.getItem(this.STORAGE_ITEM_KEY);
    if (key != null) {
      this.lang = JSON.parse(key);
    }
  }
}

export interface LanguageInterface {
  id: number,
  name: string,
  abrv: string;
}

export const DEFAULT_LANGUAGE: LanguageInterface = {
  id: 1,
  abrv: 'fr',
  name: 'Français'
};
