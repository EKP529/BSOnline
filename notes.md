# Notes
Notes for CS 260


## Notes(3/16): 
* I learned a bit more about Git and GitHub and made some conflicting changes
that I fixed. I'm more comfortable with GitHub now, but it still may take some getting used to
as well as some further improvement which will come as I go along.

### SSH into Server:
from within the CS 260 directory: `ssh -i production.pem ubuntu@18.218.74.203`

## Notes (3/19):
* I was a bit worried about the complexity of adding pages to the website, but 
through the simon.html code I learned that it is pretty straight forward. I 
also learned, through the deployFile.sh code, about how to add different webpages for 
different subdomains of my domain. I can do similar code for my startup depending 
on my needs. The html files really are pretty simple and bare-bones and I learned 
that the Javscript and CSS files are what really bring the webpages to life, though
the HTML files are still essential.

## Notes (4/8):
* Making the html files for the startup reminded me or further taught me how bare-bones
html is. I had to remind myself that the imagery I'm envisioning for the startup app/website
will be more realized once I learn more about and implement css for it. Making the html files
also helped recognize the importance of keeping things simple and just nailing down my desired 
structure and layout for the startup. It helped me lay a good foundation to build on once I get
going with the css and, eventually, javascript.

### HTML Elements(4/25):
| Element   | Meaning                                                                |
|-----------|------------------------------------------------------------------------|
| `html`    | The page container                                                     |
| `head`    | Header information                                                     |
| `title`   | Title of the page                                                      |
| `meta`    | Metadata for the page such as character set or viewport settings       |
| `script`  | JavaScript reference. Either a external reference, or inline           |
| `include` | External content reference                                             |
| `body`    | The entire content body of the page                                    |
| `header`  | Header of the main content                                             |
| `footer`  | Footer of the main content                                             |
| `nav`     | Navigational inputs                                                    |
| `main`    | Main content of the page                                               |
| `section` | A section of the main content                                          |
| `aside`   | Aside content from the main content                                    |
| `div`     | A block division of content                                            |
| `span`    | An inline span of content                                              |
| `h<1-9>`  | Text heading. From h1, the highest level, down to h9, the lowest level |
| `p`       | A paragraph of text                                                    |
| `b`       | Bring attention                                                        |
| `table`   | Table                                                                  |
| `tr`      | Table row                                                              |
| `th`      | Table header                                                           |
| `td`      | Table data                                                             |
| `ol`/`ul` | Ordered/unordered list                                                 |
| `li`      | List item                                                              |
| `a`       | Anchor the text to a hyperlink                                         |
| `img`     | Graphical image reference                                              |
| `dialog`  | Interactive component such as a confirmation                           |
| `form`    | A collection of user input                                             |
| `input`   | User input field                                                       |
| `audio`   | Audio content                                                          |
| `video`   | Video content                                                          |
| `svg`     | Scalable vector graphic content                                        |
| `iframe`  | Inline frame of another HTML page                                      |

## Notes (4/25):
* The `flex` display layout is useful when you want to partition your application into 
areas that responsively move around as the window resizes or the orientation changes.

* The `grid` display layout is useful when you want to display a group of child 
elements in a responsive grid.

### CSS Combinators (4/26):
| Combinator       | Meaning                     | Example        | Description                                |
|------------------|-----------------------------|----------------|--------------------------------------------|
| Descendant       | A list of descendants       | `body section` | Any section that is a descendant of a body |
| Child            | A list of direct children   | `section > p`  | Any p that is a direct child of a section  |
| General sibling  | A list of siblings          | `p ~ div`      | Any p that has a div sibling               |
| Adjacent sibling | A list of adjacent siblings | `p + div`      | Any p that has an adjacent div sibling     |

### CSS Units (4/26):
| Unit  | Description                                                      |
|-------|------------------------------------------------------------------|
| px    | The number of pixels                                             |
| pt    | The number of points (1/72 of an inch)                           |
| in    | The number of inches                                             |
| cm    | The number of centimeters                                        |
| %     | A percentage of the parent element                               |
| em    | A multiplier of the width of the letter `m` in the parent's font |
| rm    | A multiplier of the width of the letter `m` in the root's font   |
| ex    | A multiplier of the height of the element's font                 |
| vw    | A percentage of the viewport's width                             |
| vh    | A percentage of the viewport's height                            |
| vmin	 | A percentage of the viewport's smaller dimension                 |
| vmax	 | A percentage of the viewport's larger dimension                  |

## Notes(4/27):
* `&nbsp`; non-breaking space
* use `div` and `flex` together to center things easier

### CSS Common Display Options (4/28):
| Value  | Meaning                                                                                                                  |
|--------|--------------------------------------------------------------------------------------------------------------------------|
| none   | Don't display this element. The element still exists, but the browser will not render it.                                |
| block  | Display this element with a width that fills its parent element. A p or div element has block display by default.        |
| inline | Display this element with a width that is only as big as its content. A b or span element has inline display by default. |
| flex   | Display this element's children in a flexible orientation.                                                               |
| grid   | Display this element's children in a grid orientation.                                                                   |

## CSS Deliverable Takeaways(5/1):
What I learned from the CSS Startup deliverable:
* I learned what the `calc()` does for values
* I learned about bootstrap limitations and debugging kinks in its use and overwriting
* I learned about display kinks between desktop/laptop and mobile; I had to change the units I used
in order to accommodate both mobile and desktop views

### Navigation Controls (5/1):
| Navigation Controls | Description                                           |
|---------------------|-------------------------------------------------------|
| App controls        | User settings, payment, and help controls             |
| Device controls     | Device specific controls such as back, next, and home |
| Breadcrumb          | A path of the user's walk through the application     |
| Common actions      | Direct links to locations based on the current view   |

## Notes(5/1):
* Web apps need to support [WAI-ARIA](https://developer.mozilla.org/en-US/docs/Learn/Accessibility/WAI-ARIA_basics) standards to support users with audio, visual, or physical
limitations
* HTML [page](https://htmlpreview.github.io/?https://github.com/webprogramming260/.github/blob/main/profile/javascript/introduction/introduction.html) for Javascript references

## Notes(5/3):
* [Internationalization](https://www.w3.org/standards/webdesign/i18n)

## Notes(5/4):
* [JS Events](https://developer.mozilla.org/en-US/docs/Web/Events)

## Notes(5/28):
| Port | Protocol                                                                                           |
|------|----------------------------------------------------------------------------------------------------|
| 20   | File Transfer Protocol (FTP) for data transfer                                                     |
| 22   | Secure Shell (SSH) for connecting to remote devices                                                |
| 25   | Simple Mail Transfer Protocol (SMTP) for sending email                                             |
| 53   | Domain Name System (DNS) for looking up IP addresses                                               |
| 80   | Hypertext Transfer Protocol (HTTP) for web requests                                                |
| 110  | Post Office Protocol (POP3) for retrieving email                                                   |
| 123  | Network Time Protocol (NTP) for managing time                                                      |
| 161  | Simple Network Management Protocol (SNMP) for managing network devices such as routers or printers |
| 194  | Internet Relay Chat (IRC) for chatting                                                             |
| 443  | HTTP Secure (HTTPS) for secure web requests                                                        |

### HTTP Request Verbs (5/29):
| Verb    | 	Meaning                                                                                                                                                                                                                                                       |
|---------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| GET     | 	Get the requested resource. This can represent a request to get a single resource or a resource representing a list of resources.                                                                                                                             |
| POST    | 	Create a new resource. The body of the request contains the resource. The response should include a unique ID of the newly created resource.                                                                                                                  |
| PUT     | 	Update a resource. Either the URL path, HTTP header, or body must contain the unique ID of the resource being updated. The body of the request should contain the updated resource. <br/>The body of the response may contain the resulting updated resource. |
| DELETE  | 	Delete a resource. Either the URL path or HTTP header must contain the unique ID of the resource to delete.                                                                                                                                                   |
| OPTIONS | 	Get metadata about a resource. Usually only HTTP headers are returned. The resource itself is not returned.                                                                                                                                                   |

### Status Codes for HTTP Responses:
* 1xx - Informational.
* 2xx - Success.
* 3xx - Redirect to some other location, or that the previously cached resource is still valid.
* 4xx - Client errors. The request is invalid.
* 5xx - Server errors. The request cannot be satisfied due to an error on the server.

### Common Status Codes:
| Code | 	Text                  | 	Meaning                                                                                                                           |
|------|------------------------|------------------------------------------------------------------------------------------------------------------------------------|
| 100  | 	Continue              | 	The service is working on the request                                                                                             |
| 200	 | Success	               | The requested resource was found and returned as appropriate.                                                                      |
| 201  | 	Created               | 	The request was successful and a new resource was created.                                                                        |
| 204	 | No Content	            | The request was successful but no resource is returned.                                                                            |
| 304  | 	Not Modified          | 	The cached version of the resource is still valid.                                                                                |
| 307  | 	Permanent redirect	   | The resource is no longer at the requested location. The new location is specified in the response location header.                |
| 308  | 	Temporary redirect    | 	The resource is temporarily located at a different location. The temporary location is specified in the response location header. |
| 400  | 	Bad request           | 	The request was malformed or invalid.                                                                                             |
| 401  | 	Unauthorized          | 	The request did not provide a valid authentication token.                                                                         |
| 403  | 	Forbidden             | 	The provided authentication token is not authorized for the resource.                                                             |
| 404  | 	Not found             | 	An unknown resource was requested.                                                                                                |
| 408  | 	Request timeout       | 	The request takes too long.                                                                                                       |
| 409  | 	Conflict              | 	The provided resource represents an out of date version of the resource.                                                          |
| 418  | 	I'm a teapot          | 	The service refuses to brew coffee in a teapot.                                                                                   |
| 429  | 	Too many requests     | 	The client is making too many requests in too short of a time period.                                                             |
| 500  | 	Internal server error | 	The server failed to properly process the request.                                                                                |
| 503  | 	Service unavailable   | 	The server is temporarily down. The client should try again with an exponential back off.                                         |

### Common HTTP Headers:
| Header                      | 	Example                              | 	Meaning                                                                                              |
|-----------------------------|---------------------------------------|-------------------------------------------------------------------------------------------------------|
| Authorization	              | Bearer         bGciOiJIUzI1NiIsI      | 	A token that authorized the user making the request.                                                 |
| Accept                      | 	image/*                              | 	What content format the client accepts. This may include wildcards.                                  |
| Content-Type                | 	text/html; charset=utf-8             | 	The format of the response content. These are described using standard MIME types.                   |
| Cookie                      | 	SessionID=39s8cgj34; csrftoken=9dck2 | 	Key value pairs that are generated by the server and stored on the client.                           |
| Host                        | 	info.cern.ch                         | 	The domain name of the server. This is required in all requests.                                     |
| Origin                      | 	cs260.click                          | 	Identifies the origin that caused the request. A host may only allow requests from specific origins. |
| Access-Control-Allow-Origin | 	https://cs260.click                  | 	Server response of what origins can make a request. This may include a wildcard.                     |
| Content-Length              | 	368	                                 | The number of bytes contained in the response.                                                        |
| Cache-Control               | 	public, max-age=604800               | 	Tells the client how it can cache the response.                                                      |
| User-Agent                  | 	Mozilla/5.0 (Macintosh)              | 	The client application making the request.                                                           |

### Example Get Request through `fetch` in Javascript:
<pre><code>
    fetch('https://api.quotable.io/random')
        .then((response) => response.json())
        .then((jsonResponse) => {
            console.log(jsonResponse);
    });
</code></pre>

### Example Post Request through `fetch` in Javascript:
<pre><code>
    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify({
            title: 'test title',
            body: 'test body',
            userId: 1,
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
    .then((response) => response.json())
    .then((jsonResponse) => {
        console.log(jsonResponse);
    });
</code></pre>