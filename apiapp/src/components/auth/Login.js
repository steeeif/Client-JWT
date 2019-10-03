import React from 'react'
import axios from 'axios'
import queryString from 'query-string'

class Login extends React.Component {
  state = {
    password: '',
    username: '',
    responsData: ''
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = event => {
    event.preventDefault()

    /*
  
*/

    axios({
      method: 'post',
      url: 'http://localhost:8080/login',
      data: { username: this.state.username, password: this.state.password }
    })
      .then(res => {
        console.log(res.data)

        //console.log(res.data.jwt)
        axios.defaults.headers.common.authorization = 'Bearer '.concat(
          res.data.jwt
        )
        axios({
          method: 'get',
          url: 'http://localhost:8080/api/hello-world'
        })
          .then(res => {
            var { data } = res.data
            this.setState({ responsData: data })

            //console.log(res.data.jwt)
          })
          .catch(err => {
            this.setState({ responsData: 'not loged in' })

            console.log(err)
          })
      })
      .catch(err => {
        this.setState({ responsData: 'not loged in' })
        console.log(err)
      })
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col12">
            <h1>{this.state.responsData}</h1>
          </div>
        </div>
        <div className="row">
          <form onSubmit={this.handleSubmit}>
            <h1>Login</h1>
            <label>Username</label>
            <input
              name="username"
              placeholder="Username"
              value={this.state.username}
              onChange={this.handleChange}
            />
            <br />

            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={this.state.password}
              onChange={this.handleChange}
            />
            <br />

            <input type="submit" />
          </form>
        </div>
      </div>
    )
  }
}
export default Login
