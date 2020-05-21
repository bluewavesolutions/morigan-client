import * as axios from 'axios';

export const charactersApi = axios.default.create({
    baseURL: 'https://cluster-k8s-dev.morigan.pl/gateway/characters/',
    responseType: 'json',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('jwt')}`
    }
});