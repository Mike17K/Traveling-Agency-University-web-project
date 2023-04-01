### Run

To run the program

```
node .\app.js
```

### Info About Handlebars

Layouts are the most ambiguous high-level layer; these are commonly used to set underlying page metadata as well as general layout (for lack of a better term).

Pages are templates which equate to one type of page. For example, the 'post' page on this site is unique from, say, the homepage. Because all posts share elements with one another, hundreds of posts share this same template.

Partials are snippets which can be shared between pages, such as navigation.

A Context is content which is passed to templates and result in being the page's content

Helpers are the closest we get to logic in Handlebars: these allow us to display or omit content based on conditionals such as if statements. For example: showing an author's avatar only if they have uploaded an image.
