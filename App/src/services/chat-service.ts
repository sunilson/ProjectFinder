import { ToastController } from 'ionic-angular';
import { MapperService } from './mapper-service';
import { ChatMessage } from './../data/ChatMessage';
import { LoginService } from './login-service';
import { NetworkConstants } from './../data/constants/NetworkConstants';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Injectable } from '@angular/core';
import io from 'socket.io-client';

@Injectable()
export class ChatService {

    private socket;
    private messages: ChatMessage[] = [];
    private chatSubject: Subject<ChatMessage[]> = new Subject();
    public chatObservable: Observable<ChatMessage[]> = this.chatSubject.asObservable();

    constructor(private loginService: LoginService, private mapperService: MapperService, private toastCtrl: ToastController) {

    }

    public disconnect() {
        if (this.socket) {
            this.socket.disconnect();
            this.socket = null;
        }
    }

    public connect(projectId: string): void {
        if (!this.socket) {
            this.messages = [];
            this.loginService.loginValidation().then((token) => {
                this.socket = io(NetworkConstants.HOME_URL, { query: 'auth_token=' + token });

                this.socket.on('error', (error) => {
                    this.toastCtrl.create({
                        message: "Couldn't connect to chat!",
                        duration: 3000
                    }).present();
                });

                this.socket.on('success', (data) => {
                    this.socket.emit('room', projectId);
                });

                this.socket.on('authorized', (messages) => {
                    this.messages = this.messages.concat(this.mapperService.jsonToChatMessageArray(messages));
                    this.chatSubject.next(this.messages);
                });

                this.socket.on('new-message', (message) => {
                    this.messages.push(this.mapperService.jsonToChatMessage(message));
                    this.chatSubject.next(this.messages);
                });

                this.socket.on('message-error', (error) => {
                    this.toastCtrl.create({
                        message: "Nachricht war ungültig!",
                        duration: 3000
                    }).present();
                });

                this.socket.on('disconnect', () => {
                    this.socket = null;
                });
            });
        }
    }

    public sendMessage(message: string): void {
        if (message && message.length > 0) {
            this.socket.emit('new-message', message);
        }
    }
}