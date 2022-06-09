import Axios from 'axios';

import { DOMAIN_CYBERBUG, TOKEN, TOKEN_CYBERSOFT } from '../util/constants/settingSystem';

export class baseService {
  // put json về phía backend
  put = (url, model) => Axios({
    url: `${DOMAIN_CYBERBUG}/${url}`,
    method: 'PUT',
    data: model,
    headers: {
      Authorization: `Bearer ${localStorage.getItem(TOKEN)}`,
      TokenCybersoft: TOKEN_CYBERSOFT,
    },
  });

  post = (url, model) => Axios({
    url: `${DOMAIN_CYBERBUG}/${url}`,
    method: 'POST',
    data: model,
    headers: {
      Authorization: `Bearer ${localStorage.getItem(TOKEN)}`,
      TokenCybersoft: TOKEN_CYBERSOFT,
    },
  });

  get = (url) => Axios({
    url: `${DOMAIN_CYBERBUG}/${url}`,
    method: 'GET',
    headers: {
      Authorization: `Bearer ${localStorage.getItem(TOKEN)}`,
      TokenCybersoft: TOKEN_CYBERSOFT,
    },
  });

  delete = (url) => Axios({
    url: `${DOMAIN_CYBERBUG}/${url}`,
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${localStorage.getItem(TOKEN)}`,
      TokenCybersoft: TOKEN_CYBERSOFT,
    },
  });
}
