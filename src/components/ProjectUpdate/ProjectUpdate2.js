// import React, { useState } from 'react'
// import { Redirect, Link } from 'react-router-dom'
// import { projectUpdate } from '../../api/project'
//
// import axios from 'axios'
// import apiUrl from '../apiConfig'
//
// class ProjectUpdate extends Component {
//   constructor () {
//     super()
//     const today = new Date()
//     const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate()
//     this.state = {
//       project: {
//         name: ' ',
//         completed: false,
//         priority: 'Must',
//         deadline: date,
//         time_estimate: 1,
//         description: ' '
//       },
//       updated: false
//     }
//   }
//   componentDidMount () {
//     axios(`${apiUrl}/projects/${this.props.match.params.id}`)
//       .then(response => {
//         this.setState({ project: response.data.project })
//       })
//       .catch(console.error)
//   }
//
//   handleInputChange = (event) => {
//     event.persist()
//
//     this.setState(prevState => {
//       const updatedField = {
//         [event.target.name]: event.target.value
//       }
//       const updatedData = Object.assign({}, prevState.project, updatedField)
//       return { project: updatedData }
//     })
//   }
//   handleSubmit = (event) => {
//     event.preventDefault()
//
//     projectUpdate({
//       url: `${apiUrl}/projects/${this.props.match.params.id}`,
//       method: 'patch',
//       data: { project: this.state.project }
//     })
//       .then(response => {
//         this.setState({ updated: true })
//       })
//       .then(() => msgAlert({
//         heading: 'Update successful',
//         message: 'Project has been edited',
//         variant: 'success'
//       }))
//       .catch(err => msgAlert({
//         eading: 'Update failed',
//         message: 'Unable to edit at this time. ' + err.message,
//         variant: 'danger'
//       }))
//   }
// }
