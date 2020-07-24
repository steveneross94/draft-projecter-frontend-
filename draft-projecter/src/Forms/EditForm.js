import React from 'react'

function EditForm(props) {
    const { username, currentPassword, newPassword, name, confirmation, favTeam } = props
    return (
        <> 
        <form onSubmit={props.handleSubmit}>
            <label>Your Name:&nbsp;
            <input name="name" placeholder="Name or Nickname" value={name} onChange={props.handleChange}/>
            </label><br/>
            <label>Username:&nbsp;
            <input name="username" placeholder="Username" value={username} onChange={props.handleChange}/>
            </label><br/>
            <label>Current Password:&nbsp;
            <input name="currentPassword" placeholder="Password" type="password" value={currentPassword} onChange={props.handleChange}/>
            </label><br/>
            <label>New Password:&nbsp;
            <input name="newPassword" placeholder="New Password"  type="password" value={newPassword} onChange={props.handleChange}/>
            </label><br/>
            <label>Confirm New Password:&nbsp;
            <input name="confirmation" placeholder="Confirm new Password"  type="password" value={confirmation} onChange={props.handleChange}/>
            </label><br/>
            <label>Your Team:&nbsp;
            <input name="favTeam" placeholder="Your Favorite Team"  type="text" value={favTeam} onChange={props.handleChange}/>
            </label><br/>
            <button type="submit" value="Submit">Submit</button>
        </form>
        </>
    )
}

export default EditForm
