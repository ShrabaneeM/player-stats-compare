import { Component, OnInit } from '@angular/core';
import { Apollo, QueryRef } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import gql from 'graphql-tag';
import { Players } from '../types';
import { AllPlayerQueryResponse, AllPlayerQuery, GetPlayerQuery } from '../graphql';
@Component({
  
  selector: 'app-show-players',
  templateUrl: './show-players.component.html',
  styleUrls: ['./show-players.component.css']
})

export class ShowPlayersComponent implements OnInit {
  players: Observable<Players[]>;
  playersToCompare;
  selectedIds = [];
  playerStats = ["matches", "bats", "bowls", "innings", "notouts", "fiftys", "hundreds", "fours", "sixes", "highestScore"];

  constructor(private apollo: Apollo) { }

  ngOnInit() {
    this.players = this.apollo.watchQuery({
      query: AllPlayerQuery
    })
    .valueChanges
      .pipe(
        map(result => result.data['allPlayers'])
      );
  }

  onChange(id) {
    if(this.selectedIds.indexOf(id) > -1) {

    }
    else this.selectedIds.push(id);
  }
  getPlayerById() {
    this.apollo.watchQuery({
      query: GetPlayerQuery,
      variables : {'ids' : this.selectedIds }
    })
    .valueChanges
      .subscribe(
        result => {
          this.playersToCompare = result.data['getPlayer'];
        }
      );
  }
}

