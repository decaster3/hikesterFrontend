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
    var childs = this.props.allTags[tag.id.toString()];
    return childs;
  }

  render() {
    console.log(this.props.tags)
    var tags = this.props.tags
    //var tags = this.props.tags.map((t) => 
     for (var i = 0; i < tags.length; i++) {
      if (this.props.isClickable) {
        return (
          <button className="button tag" type="button" id={tags[i].id} value={tags[i].name} onClick={this.onButton.bind(this, tags[i])}>{tags[i].name}</button>
        );
      } else {
        console.log(tags[i]);
        return (           
          <button className="button tag" type="button" id={tags[i].id} value={tags[i].name}>{tags[i].name}</button>
        );
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
