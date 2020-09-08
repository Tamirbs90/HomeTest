import { Observable } from 'rxjs';
import { TeamService } from './../services/team.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent implements OnInit {

  teams: any[]=[];

  
  constructor(private teamService:TeamService) { }

  ngOnInit(): void {
      this.teamService.getTeams().subscribe((res:any)=>this.teams=res);
      console.log(this.teams);
      console.log(this.teamService.favoriteTeams);
    }

  
    setTeam(id:number){
      this.teamService.setTeam(id);
    }

    isFavorite(id:number){
      return this.teamService.isFavorite(id);
    }



}
