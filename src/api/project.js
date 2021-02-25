import apiUrl from '../apiConfig'
import axios from 'axios'

export const projectIndex = user => {
  return axios({
    method: 'GET',
    url: apiUrl + '/projects/',
    headers: {
      Authorization: `Token ${user.token}`
    }
  })
}

export const taskIndex = (user, projectId) => {
  return axios({
    method: 'GET',
    url: apiUrl + '/projects/' + projectId + '/tasks/',
    headers: {
      Authorization: `Token ${user.token}`
    }
  })
}

export const createTask = (task, user, projectId) => {
  console.log('task is ', task)
  return axios({
    method: 'POST',
    url: apiUrl + '/projects/' + projectId + '/tasks/',
    headers: {
      Authorization: `Token ${user.token}`
    },
    data: { task }
  })
}

export const showProject = (user, projectId) => {
  return axios({
    method: 'GET',
    url: apiUrl + '/projects/' + projectId + '/',
    headers: {
      Authorization: `Token ${user.token}`
    }
  })
}

export const createProject = (project, user) => {
  console.log('project is ', project)
  return axios({
    method: 'POST',
    url: apiUrl + '/projects/',
    headers: {
      Authorization: `Token ${user.token}`
    },
    data: { project }
  })
}

export const projectDelete = (user, projectId) => {
  console.log('projectId is ', projectId)
  return axios({
    method: 'DELETE',
    url: apiUrl + '/projects/' + projectId,
    headers: {
      Authorization: `Token ${user.token}`
    }
  })
}

export const projectUpdate = (user, project, id) => {
  return axios({
    method: 'PATCH',
    url: apiUrl + '/projects/' + id + '/',
    headers: {
      Authorization: `Token ${user.token}`
    },
    data: { project }
  })
}
