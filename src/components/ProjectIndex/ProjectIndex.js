import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

// import messages from '../AutoDismissAlert/messages'

import { projectIndex } from '../../api/project'

class Projects extends Component {
  constructor (props) {
    super(props)

    this.state = {
      projects: [],
      project: {
        name: '',
        completed: false,
        priority: '',
        deadline: null,
        time_estimate: 1,
        description: ''
      }
    }
  }
  handleChange = event => this.setState({
    [event.target.name]: event.target.value
  })

  componentDidMount () {
    const { user, msgAlert } = this.props
    projectIndex(user)
      .then(res => {
        this.setState({ projects: res.data.projects })
      })
      // .then(console.log('this is ', this))
      .catch(err => {
        msgAlert({
          heading: 'Project index failed to load',
          variant: 'danger',
          message: 'Error message ' + err.message
        })
      })
  }
  handleInputChange = (event) => {
    event.persist()
    // console.log(event)
    // console.log(event.target.value)
    this.setState(prevState => {
      const updatedField = {
        [event.target.name]: event.target.value
      }
      const updatedData = Object.assign({}, prevState.project, updatedField)
      // console.log({ chat: updatedData })
      return { project: updatedData }
    })
  }
  render () {
    // console.log('this is ', this)
    const projects = this.state.projects.map(project => (
      <div key={`${project._id}`}>
        <h1>{project.name}</h1>
        <h3>{project.deadline}</h3>
        <p>{project.description}</p>
      </div>
    ))
    return (
      <div>
        <form onSubmit={this.onCreateProject} className="createProject">
          <label htmlFor="completed">Completed</label><br/>
          <input type="checkbox" id="completed" name="comlpeted" value="Completed"/>
          <select id="priority" name="priority">
            <option value="Must">Must</option>
            <option value="Should">Should</option>
            <option value="Could">Could</option>
            <option value="Would">Would</option>
          </select>
          <label htmlFor="deadline">Deadline</label><br/>
          <input type="date" id="deadline" name="deadline"/>
          <select id="time_estimate" name="time_estimate">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
          <textarea name="description" rows="15" cols="35"></textarea>
          <button type="submit">Submit</button>
          <output type="text">
            {projects}
          </output>
        </form>
      </div>
    )
  }
}
export default withRouter(Projects)
