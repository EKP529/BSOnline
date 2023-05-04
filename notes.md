# Notes
Notes for CS 260


## Notes(3/16): 
* I learned a bit more about Git and GitHub and made some conflicting changes
that I fixed. I'm more comfortable with GitHub now, but it still may take some getting used to
as well as some further improvement which will come as I go along.

## SSH into Server:
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

## HTML Elements(4/25):
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

## CSS Combinators (4/26):
| Combinator       | Meaning                     | Example        | Description                                |
|------------------|-----------------------------|----------------|--------------------------------------------|
| Descendant       | A list of descendants       | `body section` | Any section that is a descendant of a body |
| Child            | A list of direct children   | `section > p`  | Any p that is a direct child of a section  |
| General sibling  | A list of siblings          | `p ~ div`      | Any p that has a div sibling               |
| Adjacent sibling | A list of adjacent siblings | `p + div`      | Any p that has an adjacent div sibling     |

## CSS Units (4/26):
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

## CSS Common Display Options (4/28):
| Value  | Meaning                                                                                                                  |
|--------|--------------------------------------------------------------------------------------------------------------------------|
| none   | Don't display this element. The element still exists, but the browser will not render it.                                |
| block  | Display this element with a width that fills its parent element. A p or div element has block display by default.        |
| inline | Display this element with a width that is only as big as its content. A b or span element has inline display by default. |
| flex   | Display this element's children in a flexible orientation.                                                               |
| grid   | Display this element's children in a grid orientation.                                                                   |

## Notes(5/1):
What I learned from the CSS Startup deliverable:
* I learned what the `calc()` does for values
* I learned about bootstrap limitations and debugging kinks in its use and overwriting
* I learned about display kinks between desktop/laptop and mobile; I had to change the units I used
in order to accommodate both mobile and desktop views

## Navigation Controls (5/1):
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