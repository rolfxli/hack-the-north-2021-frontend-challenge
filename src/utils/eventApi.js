import { request, gql, GraphQLClient } from 'graphql-request'

// set the base url for the event api
// normally would abstract or save this to .env
const event_url = 'https://api.hackthenorth.com/v3/graphql';

// construct the graphql query to get everything
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

async function _getAllEvents() {
    console.log("inside")
    const client = new GraphQLClient(event_url, { headers: {} })
    const events = await client.request(query);
    console.log(events.events);
    return events.events;
}

export async function getPublicEvents() {
    const data = await _getAllEvents();
    var rawEvents = data;
    console.log(rawEvents);
    var events = [];
    rawEvents.forEach(item => {
        if (item.permission == "public") {
            events.push(item);
        }
    })
    events.sort(function(a, b) {
        return a.start_time - b.start_time;
    });
    return events;
}

export async function getPrivateEvents() {
    console.log("before private")
    const data = await _getAllEvents();
    var rawEvents = data;
    var events = rawEvents; 
    events.sort(function(a, b) {
        return a.start_time - b.start_time;
    });
    return events;
}

export default _getAllEvents
