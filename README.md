# Installation (one time)

**Gulp**

* `npm install -g gulp`
* If necessary, `sudo npm install -g gulp`

Then run `npm install` to load up project dependencies.

# Local development

`gulp`

Then navigate to [http://localhost:9090/](http://localhost:9090/).

# Creating content

Content sits in src/content and will be categorized into folders (e.g. guides,
case studies, etc.).

## Markdown cheatsheet

A full syntax reference for markdown is
[http://daringfireball.net/projects/markdown/syntax](here), but here are the
big ideas:

* Do not include the article title in the content. Next iteration I have a
  better approach for that, and for now it's hard-coded
* Only use h1 and h2 headings (# and ##) to define the hierarchy of your
  content.
* Our table of contents will automatically extract all h1 headings (#)
* For ease of code-reading, separate paragraphs with a blank space
* Two asterisks for **bold**, underscore for _italic_
* Brackets and parentheses for links
* Greater-than signs for quotes
* Numbers for numbered lists, and asterisks for bullet lists

You can see the raw version of this document [https://raw.githubusercontent.com/hillgate/resources.hillgateconnect.com/master/README.md](here) and the compiled version [https://github.com/hillgate/resources.hillgateconnect.com/blob/master/README.md](here)
 as an example.
# Deploying

1. Assets are stored on S3: resources.hillgateconnect.com
1. The bucket is distributed by Cloudfront: d3vu93mrk7frou.cloudfront.net
1. [http://resources.hillgateconnect.com/](http://resources.hillgateconnect.com/)

`gulp deploy` manages deploy to S3 provided you have administrative access.

* html files are not revved and set to expire in 10 minutes
* css and js are revved and set to expire in 10 years
* content is not revved and needs attention
