# Installation (one time)

**Gulp**

* `npm install -g gulp`
* If necessary, `sudo npm install -g gulp`

Then run `npm install` to load up project dependencies.

# Local development

`gulp`

Then navigate to [http://localhost:9090/](http://localhost:9090/).

# Creating content

# Deploying

1. Assets are stored on S3: resources.hillgateconnect.com
1. The bucket is distributed by Cloudfront: d3vu93mrk7frou.cloudfront.net
1. [http://resources.hillgateconnect.com/](http://resources.hillgateconnect.com/)

`gulp deploy` manages deploy to S3 provided you have administrative access.

* html files are not revved and set to expire in 10 minutes
* css and js are revved and set to expire in 10 years
* content is not revved and needs attention
