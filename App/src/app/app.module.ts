import { ImageUploadService } from './../services/image-upload-service';
import { Firebase } from '@ionic-native/firebase';
import { NotificationService } from './../services/notification-service';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { RefreshService } from './../services/refresh-service';
import { DatePipe } from './../pipes/date-pipe';
import { StorageService } from './../services/storage-service';
import { MapperService } from './../services/mapper-service';
import { Autosize } from 'ionic2-autosize';
import { GooglePlus } from '@ionic-native/google-plus';
import { ProjectCardComponent } from './../components/project-card/project-card';
import { ComponentsModule } from './../components/components.module';
import { TagService } from './../services/tag-service';
import { ProjectService } from './../services/project-service';
import { SearchFilterPage } from './../pages/search-filter/search-filter';
import { SearchService } from './../services/search-service';
import { LocationService } from './../services/location-service';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from '../services/http-interceptor';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginService } from '../services/login-service';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';
import { Geolocation } from '@ionic-native/geolocation';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GoogleMaps } from '@ionic-native/google-maps';
import { SQLite } from '@ionic-native/sqlite';
import { Camera } from '@ionic-native/camera';
import { Clipboard } from '@ionic-native/clipboard';
import { FileTransfer } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { FilePath } from '@ionic-native/file-path';
import { SocialSharing } from '@ionic-native/social-sharing';


@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    FormsModule,
    ReactiveFormsModule,
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    SocialSharing,
    File,
    FilePath,
    FileTransfer,
    ImageUploadService,
    Camera,
    Clipboard,
    LocalNotifications,
    Firebase,
    StatusBar,
    SplashScreen,
    LocationService,
    LoginService,
    Geolocation,
    ProjectService,
    GoogleMaps,
    TagService,
    GooglePlus,
    SQLite,
    SearchService,
    MapperService,
    RefreshService,
    NotificationService,
    StorageService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }
