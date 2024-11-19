import { RxStomp, RxStompConfig } from '@stomp/rx-stomp';
import { environment } from 'src/environments/environment';

export const rxStompConfig: RxStompConfig = {
  // WebSocket handshake endpoint
    brokerURL: `ws://${environment.domain}/ws`,
    
    heartbeatIncoming: 0, // No heartbeat from server
    heartbeatOutgoing: 20000, // Send heartbeat every 20s

    reconnectDelay: 200

};
