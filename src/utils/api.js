import { request, gql, GraphQLClient } from 'graphql-request';
import cookie from "js-cookie";
import {getPublicEvents,getPrivateEvents} from "./eventApi"

async function getEvents() {
    var status = cookie.get("token");
    if ((status == null) || status != "validToken") {
        console.log("retrieving public events")
        var events = await getPublicEvents();
        return events;
    } else {
        console.log("retrieving private events")
        var events = await getPrivateEvents();
        return events;
    }
}

export default getEvents