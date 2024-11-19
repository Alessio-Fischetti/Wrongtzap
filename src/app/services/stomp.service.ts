import { RxStomp } from "@stomp/rx-stomp";
import { rxStompConfig } from "../config/Stomp.config";
import { inject } from "@angular/core";
import { SessionService } from "./session.service";

export class StompService extends RxStomp{
    constructor(){
        super()
    }
}

export function stompServiceFactory(){
    const istance = new StompService()
    const session = inject(SessionService)
    const token = session.getToken()

    rxStompConfig.beforeConnect = (stompClient: any) => {
        return new Promise<void>((resolve) => {
            stompClient.connectHeaders = {
                Authorization: token ? `Bearer ${token}` : ''
            }
            resolve()
        })
    }

    istance.configure(rxStompConfig)
    
    istance.activate()

    return istance
}