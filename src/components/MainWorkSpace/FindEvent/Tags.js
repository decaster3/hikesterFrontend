import React, { Component } from 'react';
import TextDisplay from './TextDisplay'

class Tags extends Component {

  constructor(props){
    super(props)
    this.state = {
      expr: "",
      request: [],
    };
  }

  onButton(t, e){
    var newExpr = this.state.expr.concat(" " + e.target.value);
    this.setState({
      expr: newExpr
    })

    this.state.request.push(e.target.value)

    var childs = this.getChilds(t)

    if (childs === undefined) {
      childs = []
    }

    this.props.changeTags(this, childs)
  }

  getChilds(tag){
    var childs = this.props.allTags[tag.id.toString()]
    return childs
  }

  render() {
    var tags = this.props.tags.map((t) => {

      return (
        <div key={t.id}>
          <button id={t.id} value = {t.name} onClick = {this.onButton.bind(this, t)}>{t.name}</button>
        </div>
       );
    });

    return (<div>
      <TextDisplay expr = {this.state.expr} request = {this.state.request} changeTags = {this.props.changeTags} tagsCount = {this.props.tags.length}/>
      {tags}
      </div>
    );
  }
}
export default Tags
