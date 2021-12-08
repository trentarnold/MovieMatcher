export interface IStreamProviders {
  id:number,
  results: []
}

export interface IStreamProvider {
  display_priority: number,
  logo_path: string,
  provider_name: string,
  provider_id: number
}
