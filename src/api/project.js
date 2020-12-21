import apiUrl from '../apiConfig'
import axios from 'axios'

export const projectIndex = user => {
  return axios({
    method: 'GET',
    url: apiUrl + '/projects',
    headers: {
      Authorization: `Bearer ${user.token}`
    }
  })
}
