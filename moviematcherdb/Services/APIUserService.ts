import axios from 'axios';
import {IUser} from '../../interfaces/userInterface';
const base_URL = 'http://localhost:3001';

const apiService:any = {};

apiService.login = (userObject: object): Promise<IUser> => {
  return fetch(`${base_URL}/login`, {
    method: 'POST',
    credentials: 'include',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userObject),
  })
  .then(res => res.json())
  .catch(err => console.log(err));
}

apiService.createUser = (userObject: object): Promise<IUser> => {
  return fetch(`${base_URL}/user/create`, {
    method: 'POST',
    credentials: 'include',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userObject),
  })
    .then(res => res.json())
    .catch(err => console.log(err));
};

apiService.addWant = (object: object): Promise<> => {
  return fetch(`${base_URL}/user/wants`, {
    method: 'POST',
    headers:{
      'Content-Type': 'application/json'
    }
  }
}