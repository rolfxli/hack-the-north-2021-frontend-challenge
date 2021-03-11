import cookie from "js-cookie";
import { getPublicEvents, getPrivateEvents } from "./eventApi"

/** wrapper to retrieve the correct set of events
 *  depending on user login status
 */
async function getEvents() {
    // with a real backend a JWT token would be saved
    // and would need to be authenticated
    var status = cookie.get("token");
    if ((status == null) || status != "validToken") {
        var events = await getPublicEvents();
        return events;
    } else {
        var events = await getPrivateEvents();
        return events;
    }
}

export default getEvents