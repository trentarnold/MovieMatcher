import axios from 'axios';
import activity from ''; //need activity model;
const base_URL = 'http://localhost:3001';

const apiService: any = {};

apiService.addtoActivity = () : Promise<Activity> => {
  return fetch(`${base_URL}/activity`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },

  })
}