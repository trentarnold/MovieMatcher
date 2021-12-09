export interface IActorResult {
    adult?:boolean,
    gender: number,
    id: number,
    known_for_department: string,
    name:string,
    popularity:number,
    profile_path: string,
  }
  
 export interface IFilterObject {
    genres:string[],
    avoidGenres:string[],
    cast:string[],
    providers:string[],
  }
  
 export interface IFilterData {
    username: string,
    filter: IFilterObject
  }

  export interface IActorMini {
    name: string,
    id: number,
  }