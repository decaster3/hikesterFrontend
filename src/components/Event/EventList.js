import React from 'react';

class EventList extends React.Component {

  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    var events = this.props.events.map(event => {
      var url = "/single/" + event.id;
      return (
        <a className="event" href={url}>{event.name}</a>
      );
    })
    return (
      <div className="event-list">
        {events}
      </div>
    );
  }

}

export default EventList;
