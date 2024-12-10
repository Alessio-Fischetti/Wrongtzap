import { RxStompConfig } from '@stomp/rx-stomp';
import { environment } from 'src/app/config/environments/environment';
import {Inject, Injector} from "@angular/core";
import {SessionService} from "../../services/session.service";

export const rxStompConfig: RxStompConfig = {

    brokerURL: `ws://${environment.domain}/ws`,

    heartbeatIncoming: 0,
    heartbeatOutgoing: 20000,

    reconnectDelay: 200
};
