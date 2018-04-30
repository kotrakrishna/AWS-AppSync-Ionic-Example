import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {Apollo} from 'apollo-angular';
import gql from 'graphql-tag';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

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

}
