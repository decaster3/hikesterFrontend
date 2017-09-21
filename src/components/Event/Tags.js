import React, { Component } from 'react';

class Tags extends Component {

  constructor(props){
    super(props)

    this.state = {
      expr: "",
      request: [],
      isClickable: true
    };

    this.sendRequest = this.sendRequest.bind(this)
  }

  sendRequest(last){
    var value = JSON.parse(JSON.stringify(this.state.request));
    value.push(last);
    console.log(value);
    console.log("Sending request: " + value);
  }

  onButton(t, e){
    console.log(t);
    var childs = this.getChilds(t);

    this.props.selectTag(t);

    if (childs === undefined) {
      childs = [];
      this.props.changeTags(this, childs);
      this.sendRequest(e.target.value);
    } else {
      this.state.request.push(e.target.value);

      var newExpr = this.state.expr.concat(" " + e.target.value);
      this.setState({
        expr: newExpr
      })
      this.props.changeTags(this, childs);
    }

  }

  getChilds(tag){
    var childs = this.props.tags
    return childs;
  }

  render() {

    if (this.props.tags != null){
    if (typeof this.props.tags === 'string' || this.props.tags instanceof String)
    {
      return (
          <button className="button tag btn-round" type="button" value={this.props.tags}>{this.props.tags}</button>
        );
    }
    else{

    var tags = Array.from(this.props.tags)
    var tags = tags.map((t) => {

      if (this.props.isClickable) {
        return (
          <button className="button tag btn-round" type="button" id={t.id} value={t.name} onClick={this.onButton.bind(this, t)}>{t.name}</button>
        );
      } else {
        return (
          <button className="button tag label primary" type="button" id={t.id} value={t.name}>{t.name}</button>
        );
      }
    });
     }
    }


    return (
      <div>
        {tags}
      </div>
    );
  }
}
export default Tags
