import { Logger } from '@nestjs/common';
import {
  WebSocketGateway as NestWebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@NestWebSocketGateway()
export class WebSocketGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  private readonly server: Server;
  private readonly logger: Logger;

  constructor() {
    this.logger = new Logger('websocket.gateway');
  }

  handleConnection(client: Socket) {
    this.logger.debug('Socket connected: ', client.id);
  }

  handleDisconnect(client: Socket) {
    this.logger.debug('Socket disconnected: ', client.id);
  }

  broadcastEvent(event: string, data: any) {
    this.server.emit(event, data);
  }

  sendEventToClient(clientId: string, event: string, data: any) {
    this.server.to(clientId).emit(event, data);
  }
}
