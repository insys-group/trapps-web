import { Injectable, OnInit } from '@angular/core';

@Injectable()
export class LocalStorageService {

  constructor() {
  }

  static get(key: string){
    return JSON.parse(localStorage.getItem(key));
  }

  static set(key: string, obj : Object){
    localStorage.setItem(key, JSON.stringify(obj));
  }

  static remove(key: string){
    localStorage.removeItem(key);
  }

}