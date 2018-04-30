import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import {SplashScreen} from '@ionic-native/splash-screen';
import {StatusBar} from '@ionic-native/status-bar';

import {MyApp} from './app.component';
import {HomePage} from '../pages/home/home';
import {HttpClientModule, HttpHeaders} from '@angular/common/http';

import {ApolloModule, Apollo} from 'apollo-angular';
import {HttpLinkModule, HttpLink} from 'apollo-angular-link-http';
import {ApolloLink, concat} from 'apollo-link';
import {InMemoryCache} from 'apollo-cache-inmemory';

@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule, // provides HttpClient for HttpLink
    ApolloModule,
    HttpLinkModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {

  constructor(apollo: Apollo,
              httpLink: HttpLink) {

    let http = httpLink.create({uri: 'https://pjtmwcmo35cxni3n55p7w4v7ru.appsync-api.us-east-1.amazonaws.com/graphql'});

    let authMiddleware = new ApolloLink((operation, forward) => {
      // add the authorization to the headers
      // we assume `headers` as a defined instance of HttpHeaders
      operation.setContext({
        headers: new HttpHeaders().set('x-api-key', 'da2-7l3xjosnzjh4dlrfwbd2t6hq7q')
      });

      return forward(operation);
    });

    apollo.create({
      link: concat(authMiddleware, http),
      cache: new InMemoryCache()
    });
  }
}
