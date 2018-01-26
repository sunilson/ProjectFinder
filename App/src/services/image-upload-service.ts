import { LoginService } from './login-service';
import { LoadingController } from 'ionic-angular';
import { NetworkConstants } from './../data/constants/NetworkConstants';
import { Injectable } from '@angular/core';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';


declare var cordova: any;

@Injectable()
export class ImageUploadService {

    constructor(private transfer: FileTransfer, private loginService: LoginService, private loadingCtrl: LoadingController, private file: File) {

    }

    public uploadProfilePicture(fileName: string) {
        return new Promise((resolve, reject) => {
            let loader = this.loadingCtrl.create({
                content: "Lade hoch..."
            });
            loader.present();

            const fileTransfer: FileTransferObject = this.transfer.create();
            let uploadName;
            try {
                uploadName = this.pathForImage(fileName);
            } catch (error) {
                reject(error);
            }

            if (!uploadName) {
                loader.dismiss();
                reject();
            }

            this.loginService.loginValidation().then(token => {
                let options = {
                    fileKey: "file",
                    fileName: fileName,
                    chunkedMode: false,
                    mimeType: "multipart/form-data",
                    headers: { "Authorization": "Bearer " + token },
                    params: { 'fileName': fileName }
                };

                return fileTransfer.upload(uploadName, NetworkConstants.HOME_URL + "/profile/image", options);
            }).then((data: any) => {
                loader.dismiss();
                resolve(JSON.parse(data.response).url);
            }).catch(e => {
                loader.dismiss();
                reject(e);
            });
        });
    }

    public pathForImage(img) {
        if (img === null) {
            return '';
        } else {
            return this.file.dataDirectory + img;
        }
    }

    public storeImageLocal(namePath, currentName, newFileName) {
        return new Promise((resolve, reject) => {
            this.file.copyFile(namePath, currentName, this.file.dataDirectory, newFileName).then(success => {
                resolve(newFileName);
            }, error => {
                reject(error);
            });
        });
    }

}