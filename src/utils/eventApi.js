import { gql, GraphQLClient } from 'graphql-request'

// set the base url for the event api
// normally would abstract or save this to .env
const event_url = 'https://api.hackthenorth.com/v3/graphql';

// construct the graphql query
const query = gql`{
        events {
          id
          name
          event_type
          permission
          start_time
          end_time
          description
          speakers {
            name
            profile_pic
          }
          public_url
          private_url
          related_events
        }
}`

/** request all the events */
async function _getAllEvents() {
    const client = new GraphQLClient(event_url, { headers: {} })
    const events = await client.request(query);
    // return only the event objects
    return events.events;
}

/** filter and sort public events */
export async function getPublicEvents() {
    const data = await _getAllEvents();
    var rawEvents = data;
    var events = [];
    // only save the public events
    rawEvents.forEach(item => {
        if (item.permission === "public") {
            events.push(item);
        }
    })
    // sort the events by start time
    events.sort(function(a, b) {
        return a.start_time - b.start_time;
    });
    return events;
}

/** filter and sort private events */
export async function getPrivateEvents() {
    const data = await _getAllEvents();
    var rawEvents = data;
    var events = rawEvents;
    // sort the events by start time
    events.sort(function(a, b) {
        return a.start_time - b.start_time;
    });
    return events;
}

export default _getAllEvents
