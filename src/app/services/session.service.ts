import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor(private router: Router) { }

  isAuthorized(): boolean{
    //inject(Router).navigate(["/login"])
    return true
  }

  saveToken(token: string){
    sessionStorage.setItem("token", token)
    sessionStorage.setItem("token-counter", "0")
  }
  getToken(){
    return sessionStorage.getItem("token")
  }

  increaseTokenRefreshCount(){
    const counter = sessionStorage.getItem("token-counter")
    if(counter)
      sessionStorage.setItem("token-counter", `${Number.parseInt(counter) + 1}`)
  }

  //Metodo che chiami ogni 10min
  handleSession(){
    //TODO
    this.getToken()
    //Decodifica token tramite endpoint a BE
    this.increaseTokenRefreshCount()
    //TODO
  }

  // TODO 
  /*
      decodificare il token e verificare che non sia scaduto (di solito il metodo che verifica la scadenza si avvia in automatico ogni 5-10 minuti)
      se la data e` scaduta allora salvi a sessionStorage un conteggio (definire) 

      creare un endpoint chiamato RefreshToken (il token non deve essere scaduto, di solito si refresha gli ultimi 10 minuti prima della scadenza)
 
  */

}
