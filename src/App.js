import React, { Component, Fragment } from 'react'
import { Route } from 'react-router-dom'
import { v4 as uuid } from 'uuid'

import AuthenticatedRoute from './components/AuthenticatedRoute/AuthenticatedRoute'
import AutoDismissAlert from './components/AutoDismissAlert/AutoDismissAlert'
import Header from './components/Header/Header'
import SignUp from './components/SignUp/SignUp'
import SignIn from './components/SignIn/SignIn'
import SignOut from './components/SignOut/SignOut'
import ChangePassword from './components/ChangePassword/ChangePassword'
import Home from './components/Home/Home'
import Footer from './components/Footer/Footer'
import ProjectTasks from './components/ProjectTasks/ProjectTasks'
import ProjectIndex from './components/ProjectIndex/ProjectIndex'
import UpdateProject from './components/ProjectUpdate/ProjectUpdate'
class App extends Component {
  constructor () {
    super()
    this.state = {
      user: null,
      msgAlerts: []
    }
  }

  setUser = user => this.setState({ user })

  clearUser = () => this.setState({ user: null })

  deleteAlert = (id) => {
    this.setState((state) => {
      return { msgAlerts: state.msgAlerts.filter(msg => msg.id !== id) }
    })
  }

  msgAlert = ({ heading, message, variant }) => {
    const id = uuid()
    this.setState((state) => {
      return { msgAlerts: [...state.msgAlerts, { heading, message, variant, id }] }
    })
  }

  render () {
    const { msgAlerts, user } = this.state

    return (
      <Fragment>
        <Header user={user} />
        {msgAlerts.map((msgAlert, index) => (
          <AutoDismissAlert
            key={index}
            heading={msgAlert.heading}
            variant={msgAlert.variant}
            message={msgAlert.message}
            id={msgAlert.id}
            deleteAlert={this.deleteAlert}
          />
        ))}
        <main className="container">
          <Route exact path='/' render={() => (
            <Home msgAlert={this.msgAlert} setUser={this.setUser} />
          )} />
          <Route path='/sign-up' render={() => (
            <SignUp msgAlert={this.msgAlert} setUser={this.setUser} />
          )} />
          <Route path='/sign-in' render={() => (
            <SignIn msgAlert={this.msgAlert} setUser={this.setUser} />
          )} />
          <AuthenticatedRoute user={user} path='/projects' render={() => (
            <div>
              <ProjectIndex msgAlert={this.msgAlert} user={user} />
            </div>
          )} />
          <AuthenticatedRoute user={user} path='/update/:projectId' render={({ match, history }) => (
            <div>

              <UpdateProject
                match={match}
                history={history}
                user={user}
                msgAlert={this.msgAlert}
              />
              <ProjectTasks
                match={match}
                history={history}
                user={user}
                msgAlert={this.msgAlert}
              />

            </div>
          )}/>
          <AuthenticatedRoute user={user} path='/sign-out' render={() => (
            <SignOut msgAlert={this.msgAlert} clearUser={this.clearUser} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/change-password' render={() => (
            <ChangePassword msgAlert={this.msgAlert} user={user} />
          )} />
        </main>
        <Footer user={user}/>
      </Fragment>
    )
  }
}

// <ProjectTasks
//   match={match}
//   history={history}
//   user={user}
//   msgAlert={this.msgAlert}
// />

export default App
