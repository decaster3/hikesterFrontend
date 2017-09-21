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
      return (<form>
                <div class="form-group row">              
                  <label class="col-sm-2 col-form-label">Title</label>
                  <div class="col-sm-10">
                    <a className="event" href={url}>{event.name}</a>                           
                  </div>
                </div>
              </form>
          //<a className="event" href={url}>{event.name}</a>
      );
    })
    return (
      <div className="event-list">
        {events}
      </div>
    );
    }
    else{
       return (<div/>);
    }
  }
}

export default EventList;
