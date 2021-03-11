# Hack the North 2021 Frontend Developer Challenge
Thanks for checking out my challenge!

The site can be found at [https://hackthenorth-frontend-challenge.netlify.app/](https://hackthenorth-frontend-challenge.netlify.app/).
Users can log in with username `admin` and password `password` to view private events.

## Additional Features

In addition to the requirements these features are also implemented:
- Login is persistent across site refreshes
- Ability for users to log out

# Writeup
## Question 1: Development Process
>Walk us through your development process as you worked on this project. How did you plan out the structure and design of it? Did you encounter any problems? And if so, how did you solve them? Are there any areas of your code that you're particularly proud of or want to point out?

There were several considerations I made during the planning process, including which frontend framework to use, which API library to use, and which UI library to use. I decided to use the following:
- React
    - I am confortable with both Angular and React, but I believe React will remain the more popular choice so from a maintainability perspective chosing React might be the better choice
- [graphql-request](https://github.com/prisma-labs/graphql-request)
    - I used graphql for other projects and during coop terms and while this challenge only requires a basic query, graphql is more flexible for further functionality
- [antd](https://github.com/ant-design/ant-design)
    - This library provides a very clean UI and I wanted to experiment with different UI libraries

When I planned out the structure, my basic idea was to have a basic landing page, the events page, and an API layer.

### Login and Authentication
I wanted the ability for the user login status to be persistent, so I decided to use `js-cookie` to save the username and a token. Normally this would be a JWT token, but in this case since the username and password is hardcoded, I just stored the string `validToken`. This would allow for integration with a backend that supported real user authentication.

I personally do not like dedicated login pages when I visit any site, so I decided to use a modal for the login functionality. Using this I would also be able to control `history`, and it would allow me to refresh the `events` page upon login.

### API Layer
I designed this layer with future scalability in mind. The request from the `events` page is handled the `getEvents` function in `api.js`, which checks the login status of the user. This function would then call the corresponding `get` function in `eventApi.js` which handles the actual API request. This approach allows for API calls to be grouped by their functionality, for example all `login` requests might be isolated to `loginApi.js`. This is very beneficial for maintainability and provides additional abstraction. 

### Events Page
This is the page that displays the actual events. I designed this component to do the formatting of the events, including converting the `timestamp` into a useful time range for the user. I wanted this page to be clean while displaying all the information, so I decided to use a `card` for each event. I also added a default profile picture for speakers without a profile picture. The design of this page also allows for additional features that a future developer might want to implement.

### Problems
I did not encounter many problems during development, but a problem that I did encounter was with the UI. Since I used `antd`, I had no experience with formatting the specific components and features the library provided. There were many times where the documentation was lacking, so I solved the formatting issues by wrapping the unique components or simply trying different styles until one worked.

### Notable Areas of Code
I think the area that I am most proud of is the API layer as discussed above. I think the level of abstraction and the functionality that the layer provides is critical to improving the functionality of the `events` page and ensuring scalability and maintainability in the future.


## Question 2: Additional Time
>Given additional time, how would you extend your application to become a fully functional product that thousands of hackers and the general public would use at Hackathon Global Inc.™'s next event?

One thing I want to do is improve the styling of the site. I did not make use of themes or other fancier components, so with more time I would definitely ensure the user experience is more pleasant. This might also including adding different backgrounds and animations where it makes sense.

There are also many other features that I would implement including the ability to star an event, filter by name or topic, and sort the events by end time. I think all of these provide very useful functionality to the users, and would turn the product into a more complete one. Another thing I would do is to default to the `events` page if the user is already logged in, since the landing page is not that useful when users are simply looking through events for the 100th time. I would also include a way for users to know that they are not logged in, which might include some warning at the top of the page or making the event permission explicitly visbile to the user. Another way might be to only show the `login` button if the user is not logged in, and only show the `logout` button if the user is logged in.

I would also change how the user is alerted when their login credentials are incorrect. Currently I make use of the default `alert`, but I would change that to be more elegant, which might include displaying the error in the login modal. 

Finally, I would add a more functional navigation panel since the future product would likely include more than just an events page.