import React, { Component } from 'react'
// import Calendar from 'react-calendar'
import { withRouter, Link } from 'react-router-dom'
import messages from '../AutoDismissAlert/messages'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
// import DatePicker from 'react-bootstrap-date-picker'
import CardColumns from 'react-bootstrap/CardColumns'
import Card from 'react-bootstrap/Card'

import { projectIndex, createProject, projectDelete } from '../../api/project'

class Projects extends Component {
  constructor (props) {
    super(props)
    const today = new Date()
    const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate()
    this.state = {
      projects: [],
      project: {
        name: ' ',
        completed: false,
        priority: 'Must',
        deadline: date,
        time_estimate: 1,
        description: ' '
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
        // console.log('res is ', res)
        this.setState({ projects: res.data })
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
  onCreateProject = (event) => {
    event.preventDefault()

    const today = new Date()
    const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate()
    const { msgAlert } = this.props
    const { user } = this.props
    createProject(this.state.project, user)
      .then(response => {
        // console.log('res is ', response)
        console.log('this state is ', this.state)
        this.setState({
          createdId: response.data._id
        })
      })
      .then(props => {
        projectIndex(this.props.user)
          .then(res => {
            this.setState({ projects: res.data })
          })
      })
      .then(() => this.setState({ project: {
        name: '',
        completed: false,
        priority: 'Must',
        deadline: date,
        time_estimate: 1,
        description: ' '
      } }))
      .then(() => msgAlert({
        heading: 'Created!',
        message: messages.createProjectSuccess,
        variant: 'success'
      }))
      .catch(error => {
        this.setState({ name: '' })
        msgAlert({
          heading: 'Whoops. ' + error.message,
          message: messages.createProjectFailure,
          variant: 'danger'
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
  handleCompleted = (event) => {
    event.persist()
    this.setState(prevState => ({
      completed: !prevState.completed
    }))
  }
  onProjectDelete = (event) => {
    event.preventDefault()
    const projectId = event.target.name

    projectDelete(this.props.user, projectId)
      // .then(console.log(projectId))
      .then(() => {
        // this.setState({ project: {
        //   name: '' } })
        this.props.msgAlert({
          heading: 'Bye bye project.',
          message: messages.deleteProjectSuccess,
          variant: 'success'
        })
      })
      .then(props => {
        projectIndex(this.props.user)
          .then(res => {
            this.setState({ projects: res.data })
          })
      })
      // .then(props => {
      //   projectIndex(this.props.user)
      //     .then(res => {
      //       this.setState({ projects: res.data.projects })
      //     })
      // })
      .catch(error => {
        this.props.msgAlert({
          heading: 'Can not delete message at this time. ' + error.message,
          message: messages.deleteProjectFailure,
          variant: 'danger'
        })
      })
  }
  render () {
    // console.log('this is ', this)
    const projects = this.state.projects.map(project => (
      <div key={`${project.id}`}>
        <Card className="project-cards">
          <h1>{project.name}</h1>
          <h3>{project.deadline}</h3>
          <p>{project.description}</p>
          <div className="row">
            <button className="col-6" id="delete-project" name={project.id} onClick={this.onProjectDelete}>Delete</button>
            <Link className="col-6" to={'/update/' + project.id + '/'}>update</Link>
          </div>
        </Card>
      </div>
    ))
    return (
      <div>
        <Form onSubmit={this.onCreateProject} className="createProject">
          <div className="row">
            <div className="col-12">
              <br />
              <h3>New project</h3>
            </div>
            <div className="col-10">
              <Form.Label htmlFor="title">Project Title:</Form.Label>
              <Form.Control type="text" name="name" id="name" value={this.state.project.name} onChange={this.handleInputChange} />
            </div>
            <div className="col-2">
              <Form.Label htmlFor="completed">Completed:</Form.Label>
              <Form.Control type="checkbox" id="completed" name="completed" value={this.state.project.completed} onChange={this.handleCompleted} />
            </div>
            <div className="col-4">
              <Form.Label htmlFor="deadline">Deadline:</Form.Label>
              <Form.Control type="date" id="deadline" name="deadline" value={this.state.project.deadline} onChange={this.handleInputChange}/>
            </div>
            <div className="col-4">
              <Form.Label htmlFor="time_estimate">Time Estimate:</Form.Label>
              <Form.Control as="select" id="time_estimate" name="time_estimate" value={this.state.project.time_estimate} onChange={this.handleInputChange}>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </Form.Control>
            </div>
            <div className="col-4">
              <Form.Label htmlFor="priority">Priority:</Form.Label>
              <Form.Control className="col-4" as="select" size="sm" id="priority" name="priority" value={this.state.project.priority} onChange={this.handleInputChange} custom>
                <option value="Must">Must</option>
                <option value="Should">Should</option>
                <option value="Could">Could</option>
                <option value="Would">Would</option>
              </Form.Control>
            </div>
            <div className="col-12">
              <Form.Label htmlFor="description">Description:</Form.Label><br/>
              <Form.Control as="textarea" name="description" rows="15" cols="35" value={this.state.project.description} onChange={this.handleInputChange}></Form.Control><br />
            </div>
          </div>
          <Button type="submit">Submit</Button>
          <CardColumns type="text">
            {projects}
          </CardColumns>
        </Form>
      </div>
    )
  }
}
export default withRouter(Projects)
