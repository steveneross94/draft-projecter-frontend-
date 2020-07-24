import React, { Component } from 'react'

class PlayersContainer extends Component {

    state = {
        players: []
    }

    componentDidMount(){
        this.getAllPlayers()
    }

    getAllPlayers = () => {
        fetch('http://localhost:3001/api/v1/players')
        .then(r => r.json())
        .then(data => {
            this.setState({
                players: data
            })
        })
    }

    render() {
        console.log(this.state);
        return (
            <div>
                
            </div>
        )
    }
}

export default PlayersContainer