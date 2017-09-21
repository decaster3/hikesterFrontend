import React from 'react';

class EventList extends React.Component {

  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    console.log(this.props.events)
    if(this.props.events.length != 0){
    var events = this.props.events.map(event => {
      var url = "/single/" + event.event_id;
      return (<tr>
                  <td>
                    <a className="event" href={url}>{event.name}</a>
                  </td>
                  <td>
                    <a className="event" href={url}>{event.date_begin}</a>
                  </td>
                  <td>
                    <a className="event" href={url}>{event.locality}</a>
                  </td>
                  <td>
                    <a className="event" href={url}>{event.address}</a>
                  </td>
              </tr>
      );
    })
    return (
      <div className="event-list">
        <table className=" table table-striped table-hover">
          <thead>
            <tr>
              <th>Title</th>
              <th>Begin</th>
              <th>Locality</th>
              <th>Address</th>
            </tr>
          </thead>
          <tbody>
            {events}
          </tbody>
        </table>
      </div>
    );
    }
    else{
       return (<div/>);
    }
  }
}

export default EventList;
