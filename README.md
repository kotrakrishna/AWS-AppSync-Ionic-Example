## Setup

Start an Ionic Project

    ionic start ionic3-appsync-example
    
Added Apollo and other packages to to package.json
    
    "apollo-angular": "^1.0.1",
    "apollo-angular-link-http": "^1.0.3",
    "apollo-cache-inmemory": "^1.1.12",
    "apollo-client": "^2.2.8",
    "graphql": "^0.12.3",
    "graphql-tag": "^2.9.1"

Install additional packages

    npm install 

Add to `app.module.ts`

    import {HttpClientModule, HttpHeaders} from '@angular/common/http';

    import {ApolloModule, Apollo} from 'apollo-angular';
    import {HttpLinkModule, HttpLink} from 'apollo-angular-link-http';
    import {ApolloLink, concat} from 'apollo-link';
    import {InMemoryCache} from 'apollo-cache-inmemory';
    
Add to imports of `app.module.ts`

    HttpClientModule, // provides HttpClient for HttpLink
    ApolloModule,
    HttpLinkModule
    
Create Apollo client in `app.module.ts` constructor so as to use across the code.

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

Replace httpLink endpoint with your own graphql endpoint. Update the `x-api-key` appropriately.

## Make graphql query

Import to `home.ts`
    
    import {Apollo} from 'apollo-angular';
    import gql from 'graphql-tag';
    
Call gql

    constructor(apollo: Apollo) {
        let q = gql(`
        query GetProduct {
          getProduct(id: 1) {
            id
            title
          }
        }
    `);
        apollo.query({query: q}).subscribe(console.log);
      }    
      
Ignore typescript errors from dependency packages

* ADD `"esnext"` to `lib` of ``tsconfig.json``
* exclude `"node_modules/**/*.d.ts"`       

## Run

    ionic cordova run browser


Github Page: https://kotrakrishna.github.io/AWS-AppSync-Ionic-Example/
