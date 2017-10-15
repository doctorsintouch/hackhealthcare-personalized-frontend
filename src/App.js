import React from 'react'
import ReactDOM from 'react-dom'
import $ from 'jquery'; 

export default class App extends React.Component{

  onError(error){
    console.log(error)
  }

  constructor(props) {
    super(props);
    this.state = {
              firstname: "",
              lastname: '',
              dobday: '',
              dobmonth: '',
              dobyear: '',
              referrer: '',
              email: '',
              phone: '',
              loggedIn: false
            }
  }

  componentDidMount() {
    
  } 


  render(){
    return (
                  
          <div>
              <p style={{color: "lightgrey", fontSize: "small"}}>WellBeing: A simple cloud to-do list</p>
              { !this.state.firstname ? <h1>Hi! What is your name?</h1> : null}
              { this.state.firstname ? <h1>Hi, {this.state.firstname}!</h1> : null}
              <form>
                <input
                  autoFocus
                  type="text"
                  className="addItemInput"
                  onSubmit={this.handleUsernameSubmit}
                  onChange={this.handleUsernameChange('firstname')}
                  value={this.state.firstname}

                />
                <input
                  className="submitButton"
                  type="submit"
                  value="Let's Go!"
                  onClick={this.handleUsernameSubmit} />
              </form>
              <hr />
              <Results />
            </div>
    )
  }

    handleUsernameChange () {
      return function (e) {
        var state = {};
        state.firstname = e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1);
        this.setState(state);
      }.bind(this);

    }




    handleUsernameSubmit(e) {
        e.preventDefault();

        this.setState({
              firstname: this.state.firstname,
              loggedIn: true
            })
        console.log(this.state.firstname)
        $.ajax({
          type: "POST",
          url: 'https://localhost:3000/login',
          dataType: 'json',
          cache: false,
          success: function(data) {
            this.results = data
          }.bind(this),
          error: function(xhr, status, err) {
            console.error(this.props.url, status, err.toString());
          }.bind(this)
        });
      }







}




class Results extends React.Component{

  results = [
        {
          id: '9403930493f',
          name: 'dr. robert', 
          address: '680 Haight Street', 
          phone: '9177043031'
        },
        {
          id: 'o2394kljl',
          name: 'dr. george', 
          address: '250 George Street', 
          phone: '930450375'
        }
        ]

  componentDidMount() {

    $.ajax({
      type: "GET",
      url: 'https://localhost:3000/results',
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.results = data
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });

    console.log(this.results)
  }



  render(){

    return (
      <div>
      Results:
        <ul>
          {this.results.map(result => (
            <li key={result.id}>{result.name}<br />{result.address}<br />{result.phone}<br /><br /></li>
            
          ))}
        </ul>

      </div>
    )
  }
}




ReactDOM.render(<App />, document.getElementById('root'));



