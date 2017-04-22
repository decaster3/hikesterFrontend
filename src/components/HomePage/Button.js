import React, {Component } from 'react';
import styles from './style.scss';
// import FacebookLogin from 'react-facebook-login';

const responseFacebook = (response) => {

  console.log(response);
}

class Button extends Component {
  constructor(props){
    super(props);
  }

  render() {

    var type = this.props.type;
    var text = this.props.text;
    var clases = "button button_";

    switch (type){
        case "highlight":
          clases += "highlight"
          break;
        case "secondary":
          clases += "secondary"
          break;
        case "small":
          clases += "secondary button_small"
    }
    // if (type === "facebook"){
    //   return <div className="button_wrapper">
    //     <FacebookLogin
    //       appId="1402058173187568"
    //       autoLoad={false}
    //       fields="name,email"
    //       version="2.8"
    //       textButton={text}
    //       callback={responseFacebook} />
    //   </div>
    // }
    console.log(this.props.click);
    return <div className="button_wrapper">
      <a href="#" className={clases} onClick = {this.props.click}>
        {text}
      </a>
    </div>
  }

}
export default Button;
