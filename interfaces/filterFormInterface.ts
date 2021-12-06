export interface ActorResult {
    adult?:boolean,
    gender: number,
    id: number,
    known_for_department: string,
    name:string,
    popularity:number,
    profile_path: string,
  }
  
 export interface filterObject {
    genres:string[],
    avoidGenres:string[],
    cast:string[],
    providers:string[],
  }
  
 export interface filterData {
    username: string,
    filter:filterObject
  }