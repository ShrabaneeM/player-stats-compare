import { Players } from './types';
// 1
import gql from 'graphql-tag'
export const AllPlayerQuery = gql`
    query allPlayers {
      allPlayers {
        id
        name
      }
    }
  `;

  export const GetPlayerQuery = gql`
  query getPlayer($id: [ID]) {
    getPlayer(id: $id) {
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
  }`
;

export interface AllPlayerQueryResponse {
    allPlayers: Players[];
    loading: boolean;
  };