const { default: Axios } = require("axios");
const {
  DOMAIN_CYBERBUG,
  TOKEN,
  TOKEN_CYBERSOFT,
} = require("../util/constants/settingSystem");

export const cyberbugsService = {
  signinCyberBugs: (userLogin) => {
    return Axios({
      url: `${DOMAIN_CYBERBUG}/api/users/signin`,
      method: "POST",
      data: userLogin,
    });
  },
  getAllProjectCategory: () => {
    return Axios({
      url: `${DOMAIN_CYBERBUG}/api/ProjectCategory`,
      method: "GET",
      headers: {
        TokenCybersoft: TOKEN_CYBERSOFT,
      },
    });
  },
  createProject: (newProject) => {
    return Axios({
      url: `${DOMAIN_CYBERBUG}/api/Project/createProject`,
      method: "POST",
      data: newProject,
    });
  },
  createProjectAuthorization: (newProject) => {
    console.log(localStorage.getItem(TOKEN));
    return Axios({
      url: `${DOMAIN_CYBERBUG}/api/Project/createProjectAuthorize`,
      method: "POST",
      data: newProject,
      headers: {
        Authorization: "Bearer " + localStorage.getItem(TOKEN),
        TokenCybersoft: TOKEN_CYBERSOFT,
      }, //JWT
    });
  },
  getListProject: () => {
    return Axios({
      url: `${DOMAIN_CYBERBUG}/api/Project/getAllProject`,
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem(TOKEN),
        TokenCybersoft: TOKEN_CYBERSOFT,
      }, //token yêu cầu từ backend chứng minh user đã đăng nhập rồi
    });
  },
};
