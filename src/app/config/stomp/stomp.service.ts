import { RxStomp } from "@stomp/rx-stomp";
import { rxStompConfig } from "./stomp.config";
import { inject } from "@angular/core";
import { SessionService } from "../../services/session.service";

export class StompService extends RxStomp{
    constructor(){
        super()
    }
}

export function stompServiceFactory(){
  const istance = new StompService()
  const session = inject(SessionService)
  const token =  session.getToken()

  const stompConfig = {
    ...rxStompConfig,
    webSocketFactory: () => {
      // Create a new WebSocket instance with the dynamic token in Sec-WebSocket-Protocol
      return new WebSocket(rxStompConfig.brokerURL!, [`Bearer${token}`, 'v12.stomp', 'v11.stomp']);
    },
    beforeConnect: (stompClient: any) => {
      // No need to add Authorization header here, because the token is already in the Sec-WebSocket-Protocol header
      return new Promise<void>((resolve) => {
        stompClient.connectHeaders = {
          'login': `Bearer ${token}`,
          'passcode': 'unused'
        };  // No need to send Authorization header here
        resolve();  // Proceed to connect
      });
    }
  };

  istance.configure(stompConfig)
  istance.activate()

  return istance
}
