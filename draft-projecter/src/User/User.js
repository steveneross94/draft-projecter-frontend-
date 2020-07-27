import React from 'react';
import { Link } from 'react-router-dom'
import EditForm from '../Forms/EditForm'
import PlayersContainer from '../containers/PlayersContainer'


const userUrl = 'http://localhost:3001/api/v1/users'

class Auth extends React.Component {
  state = {
      isEditUser: false,
      username: '',
      confirmation: '',
      name: '',
      favTeam: '',
      currentPassword: '', 
      newPassword: '',
      validationPassword: '',
      id: ''
  }

  // this.props.match.params.id NOTE THAT THIS ID IS A STRING
  

  componentDidMount(){
    this.fetchUser()
  }

  fetchUser = () => {
    const { id } = this.props.match.params
    fetch(`${userUrl}/${id}`)
    .then(res => res.json())
    .then(userData => {
      console.log(userData);
      this.setState({
        isEditUser: false,
        username: userData.username,
        name: userData.name,
        favTeam: userData.fav_team,
        validationPassword: userData.password, 
        newPassword: '',
        confirmation: '',
        currentPassword: '',
        id: userData.id
      })
    })
  }

 
  toggleEditButton = () => {
    this.setState(prevState => ({ isEditUser: !prevState.isEditUser}))
  }

  handleChange = e => this.setState({ [e.target.name]: e.target.value })

  handleSubmit = e => {
    e.preventDefault()
      const { id } = this.props.match.params
      const { name, favTeam, newPassword, confirmation, username, validationPassword, currentPassword } = this.state;
      if (validationPassword === currentPassword && newPassword === confirmation) {
        fetch(`${userUrl}/${id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
          },
          body: JSON.stringify({
            username,
            password: newPassword,
            name,
            fav_team: favTeam
          })
        })
        .then(res => res.json())
        .then(userData => 
          this.setState({
            isEditUser: false,
            username: userData.username,
            name: userData.name,
            favTeam: userData.fav_team,
            validationPassword: userData.password, 
            newPassword: '',
            confirmation: '',
            currentPassword: '',
            id: userData.id
          })
          )
       } else {
        this.fetchUser()
        alert('Must Enter Current Password and New Passwords Must Match')
  }
  }

  renderUserPage = () => {
      const { username, name, favTeam } = this.state;
      return (
          <>
            <h2>Name: {name}</h2>
            <h2>Username: {username}</h2>
            <h2>Favorite Team: {favTeam}</h2>
          </>
      )
  }



  deleteUser = () => {
    const { id } = this.props.match.params
  }

  linkToTeams = () => {
    const { id } = this.props.match.params
    this.props.history.push(`/users/${id}/teams`) 
  }

  render(){
    let { isEditUser, username, currentPassword, newPassword, name, confirmation, favTeam } = this.state;
    // console.log('IN AUTH', this.props.history) // routerProps are POWERFUL!!!
      return (
        <div className='content'>
            <div className="column">
              <h1>{isEditUser ? 'Edit Your Account' : 'Account Information'}</h1>
              { isEditUser ? <EditForm  username={username} currentPassword={currentPassword} newPassword={newPassword} name={name} confirmation={confirmation} favTeam={favTeam} handleSubmit={this.handleSubmit} handleChange={this.handleChange}/> : this.renderUserPage() }
              <br/>
              <br/>
              { !isEditUser && <button onClick={this.linkToTeams}>Go To Your Draft Budgets</button>}
              <br/>
              <br/>
              {isEditUser
                ? <h2>Go Back to Your Page</h2>
                : <h2>Edit or Cancel Your Account</h2>}
              <button onClick={this.toggleEditButton}>{isEditUser ? "Stop Edit" : "Edit"}</button>
              <br/>
              <br/>
              { isEditUser && 
              <>
                <h2>Cancel Your Account</h2>
                <button onClick={this.deleteUser}>Delete this Account</button>
              </>}
          </div>
          <div className="column"> 
                <div>
                  <PlayersContainer />
                </div>
          </div>      
        </div>
      )
  }
}

export default Auth;














