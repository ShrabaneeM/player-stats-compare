import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import gql from 'graphql-tag';
import { Players, Query } from '../types';

@Component({
  selector: 'app-show-players',
  templateUrl: './show-players.component.html',
  styleUrls: ['./show-players.component.css']
})
export class ShowPlayersComponent implements OnInit {
  players: Observable<Players[]>;
  constructor(private apollo: Apollo) { }

  ngOnInit() {
    this.players = this.apollo.watchQuery<Query>({
      query: gql`
        query allPlayers {
          allPlayers {
            id
            name
            stats {
              matches 
              bats 
              bowls
              innings
              notouts
              fiftys
              hundreds
              fours
              sixes
              highestScore
            }
          }
        }
      `
    })
      .valueChanges
      .pipe(
        map(result => result.data.allPlayers)
      );
  }

}
