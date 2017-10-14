import React from 'react'
import ReactDOM from 'react-dom'
import $ from 'jquery'; 

export default class App extends React.Component{

  onError(error){
    console.log(error)
  }



  componentDidMount() {
    $.ajax({
      url: 'https://api.github.com/users/mbasso',
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({data: data});
        console.log(this.state.data)
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  }


  render(){
    return (
      <div>
        <div>Working!</div>
        <TestComponent /> 
      </div>
    )
  }
}

class TestComponent extends React.Component{
  render(){

    return (
      <div>
        {console.log(this.props)}
        {this.props.headers ? <div>Your User-Agent: {this.props.headers['User-Agent']}</div>: 'loading'}
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'));



