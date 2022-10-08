import React, { Component } from 'react'

export default class FormDemo1 extends Component {
  
    state={username:''}

    onChangeHandler = (event)=>{
        this.setState({username:event.target.value})
    }
  
    render() {
    return (
      <div>
            <form>
                <h3>User name</h3>
                <input onChange={this.onChangeHandler} type="text"></input>
                <h3>User name is {this.state.username}</h3>


            </form>
      </div>
    )
  }
}
