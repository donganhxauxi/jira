const { default: Axios } = require('axios');
const {
  DOMAIN_CYBERBUG,
  TOKEN,
  TOKEN_CYBERSOFT,
} = require('../util/constants/settingSystem');

export const cyberbugsService = {
  signinCyberBugs: (userLogin) => Axios({
    url: `${DOMAIN_CYBERBUG}/api/users/signin`,
    method: 'POST',
    data: userLogin,
  }),
  getAllProjectCategory: () => Axios({
    url: `${DOMAIN_CYBERBUG}/api/ProjectCategory`,
    method: 'GET',
    headers: {
      TokenCybersoft: TOKEN_CYBERSOFT,
    },
  }),
  createProject: (newProject) => Axios({
    url: `${DOMAIN_CYBERBUG}/api/Project/createProject`,
    method: 'POST',
    data: newProject,
  }),
  createProjectAuthorization: (newProject) => {
    console.log(localStorage.getItem(TOKEN));
    return Axios({
      url: `${DOMAIN_CYBERBUG}/api/Project/createProjectAuthorize`,
      method: 'POST',
      data: newProject,
      headers: {
        Authorization: `Bearer ${localStorage.getItem(TOKEN)}`,
        TokenCybersoft: TOKEN_CYBERSOFT,
      },
    });
  },
  getListProject: () => Axios({
    url: `${DOMAIN_CYBERBUG}/api/Project/getAllProject`,
    method: 'GET',
    headers: {
      Authorization: `Bearer ${localStorage.getItem(TOKEN)}`,
      TokenCybersoft: TOKEN_CYBERSOFT,
    },
  }),
  updateProject: (projectUpdate) => Axios({
    url: `${DOMAIN_CYBERBUG}/api/Project/updateProject?projectId=${projectUpdate.id}`,
    method: 'PUT',
    data: projectUpdate,
    headers: {
      Authorization: `Bearer ${localStorage.getItem(TOKEN)}`,

      TokenCybersoft: TOKEN_CYBERSOFT,
    },
  }),
};
