import React, { Component } from 'react';
import TextDisplay from './TextDisplay'
class Tags extends Component {
  constructor(props){
    super(props)
    this.state = {
      expr: []
    }
  }
  onButton(e){
    var newTags = this.state.expr.concat(e.target.value)
    this.setState({
      expr: newTags
    })
  }

    render(){
      var tags = this.props.tags.map((t) => {
        return (
          <div key={t.id}>
            <button value = {t.name} onClick = {this.onButton.bind(this)}>{t.name}</button>
          </div>
       );
      });
        return (<div>
          <TextDisplay expr = {this.state.expr}/>
          {tags}
          </div>
        );
    }
}
export default Tags
