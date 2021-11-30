import axios from 'axios';
import { Movie } from '../../interfaces/movieInterface';
import {IUser} from '../../interfaces/userInterface';
const base_URL = 'http://localhost:3001';

const apiService:any = {};

apiService.getUser = (userID: string): Promise<IUser> => {
  return fetch(`${base_URL}/user/profile`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userID),//need to confim userID is correct database column
  })
    .then(res => res.json())
    .catch(err => console.log(err));
};

apiService.getFriends = (userID: string): Promise<IUser> => {
  return fetch(`${base_URL}/user/friends`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userID),//need to confim userID is correct database column
  })
    .then(res => res.json())
    .catch(err => console.log(err));
};

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

apiService.addFriend = (object: object): Promise<IUser> => {
  return fetch(`${base_URL}/user/friends`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(object),
  })
    .then(res => res.json())
    .catch(err => console.log(err));
};

apiService.deleteFriend = (object: object): Promise<IUser> => {
  return fetch(`${base_URL}/user/friendsd`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(object),
  })
    .then(res => res.json())
    .catch(err => console.log(err));
};


apiService.addWant = (object: object): Promise<Movie> => {
  return fetch(`${base_URL}/user/wants`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(object),
  })
    .then(res => res.json())
    .catch(err => console.log(err));
};

apiService.removeWant = (object: object): Promise<Movie> => {
  return fetch(`${base_URL}/user/wants`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(object),
  })
    .then(res => res.json())
    .catch(err => console.log(err));
};

apiService.addBlacklist = (object: object): Promise<Movie> => {
  return fetch(`${base_URL}/user/blacklist`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(object),
  })
    .then(res => res.json())
    .catch(err => console.log(err));
};



apiService.removeBlacklist = (object: object): Promise<Movie> => {
  return fetch(`${base_URL}/user/blacklist`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(object),
  })
    .then(res => res.json())
    .catch(err => console.log(err));
};
