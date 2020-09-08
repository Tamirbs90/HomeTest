import { environment } from './../../environments/environment';
import { Injectable, OnDestroy } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import { of, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { setClassMetadata } from '@angular/core/src/r3_symbols';
import { stringify } from '@angular/compiler/src/util';


@Injectable({
  providedIn: 'root'
})
export class TeamService {

  teams: any[]=[];
  favoriteTeams: number[]=[];
  headers: HttpHeaders;

  constructor(private http:HttpClient) { 
    const favorites= localStorage.getItem("favorites");
    if(favorites){
      this.favoriteTeams=JSON.parse(favorites);
    }

    const headerSettings = {
      "x-rapidapi-host" : environment.apiHost,
      "x-rapidapi-Key": environment.apiKey
    }
    
    this.headers= new HttpHeaders(headerSettings);
  }
  
  getTeams(){
    const teamsList= localStorage.getItem("teams");
    if(teamsList){
      this.teams=  JSON.parse(teamsList);
      return of(this.teams);
    }

    return this.http.get(environment.baseUrl, {headers : this.headers}).
    pipe(map((res:any)=>
    {
      this.teams=res.api.teams;
      localStorage.setItem("teams",JSON.stringify(this.teams));
      return res.api.teams;
    }));
  }

  setTeam(id:number){
    if(this.isFavorite(id)){
      this.favoriteTeams.splice(this.favoriteTeams.indexOf(id),1);
    }
    else{
      this.favoriteTeams.push(id);    
    }

    localStorage.setItem("favorites",JSON.stringify(this.favoriteTeams));
  }

  isFavorite(id:number){
    return this.favoriteTeams.indexOf(id) !==-1;
  }


}
