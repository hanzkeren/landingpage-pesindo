export enum MatchStatus {
  Available = 'available',
  SoldOut = 'sold_out',
}

export interface Team {
  name: string;
  logoUrl: string;
}

export interface Match {
  id: number;
  date: string;
  time: string;
  team1: Team;
  team2: Team;
  status: MatchStatus;
}
