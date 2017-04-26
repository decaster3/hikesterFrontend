import React from 'react';
import style from './form.scss';
import Tags from './Tags';

class Single extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      tags: [],
      showJoinButton: true,
      people_count: 0
    };
  }

  componentWillMount() {
    const url = "http://192.168.137.1:3000/v1/event?id=" + this.props.id

    fetch(url)
    .then((response) => response.json())
    .then((data) => {
      var event = data.events[0];
      var tags = data.events[1].events;
      var showJoinButton = data.events[2].events.length == 0;
      console.log(data.events[2].events.length > 0);
      console.log(event);
      console.log(tags);
      console.log(showJoinButton);
      this.setState({people_count: data.events[2].events.length});
      this.setState({tags});
      this.setState(event);
      this.setState({showJoinButton: showJoinButton});
      event.showJoinButton = showJoinButton;

      console.log(this);

      this.props.eventHandle(event);
    });
  }

  joinHandler(e) {
    const url = "http://192.168.137.1:3000/v1/event/user";

    var data = new FormData();

    var id = $(e.target).data('id');

    data.append('profile_id', 1);
    data.append('event_id', id);

    console.log(id);

    fetch(url,
    {
        method: "POST",
        body: data
    })
    .then((response) => {
      console.log(response);
      if (response.ok == true) {
        this.setState({showJoinButton: false});
      }
      // response.json()
    }).then((data) => {
      var people_count = this.state.people_count + 1;
      this.setState({people_count: people_count})
      console.log(data);
      console.log("EventUser created: " + data);

    })
  }

  render() {
    return (
      <div className="flex-40 content-form events-create">
        <div className="filters">
          <div className="form-group">
            <h3>{this.state.name}</h3>
          </div>
          <div className="form-group">
            <h4>Описание</h4>
            <div className="description">
              {this.state.description}
            </div>
          </div>
          <div className="form-group">
            <h4>Кол-во участников</h4>
            <div className="description">
              {this.state.people_count}
            </div>
          </div>
          <div className="tag-filter">
            <h4>Тэги события</h4>
            <Tags tags={this.state.tags} isClickable={false}/>
          </div>
          { this.state.showJoinButton == true ?
              <button className="button submit" data-id={this.state.id} onClick={this.joinHandler.bind(this)}>Присоединиться</button>
              :
              <div>Вы присоединились к данному событию</div>
          }

        </div>
      </div>
    );
  }

}

export default Single;
