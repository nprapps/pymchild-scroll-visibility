pymchild-scroll-visibility
==========================

* [What is this?](#what-is-this)
* [Assumptions](#assumptions)
* [What's in here?](#whats-in-here)
* [Bootstrap the project](#bootstrap-the-project)
* [Hide project secrets](#hide-project-secrets)
* [Run the project](#run-the-project)
* [Build the project](#build-the-project)
* [Update the project](#update-the-project)
* [Versioning](#versioning)
* [License and credits](#license-and-credits)
* [Additional contributors](#additional-contributors)


What is this?
-------------

This is a work in progress.

After the release of [Pym.js version 1.3.0](https://github.com/nprapps/pym.js/releases/tag/v1.3.0) pym has added native optional support for scroll tracking, allowing the child pages to have all the information needed to determine if one of the child's element is currently on the viewport or not.

`pymchild-scroll-visibility` is a small library built for being included on the pym embedded child pages that take advantage of this new capability to make the appropriate calculations to invoke a callback function if the supplied element is currently visible. Optionally you can also pass it another callback function to be invoked if the element is visible for a configurable period of time (signaling it is read).

In order for this to work you'll need to set you pym parent to opt into scroll tracking, read more about how to do that [here](http://blog.apps.npr.org/pym.js/#optional-scroll-tracking).

Once that is setup you need to create a `Tracker` for each element that you want to track and provide a callback function to be run when the element is visible:

```
var tracker = new PymChildScrollVisibility.Tracker('example', function(id) {
    console.log(id, 'visible')});
```

And also you'll need to listen in the child to updates from the parent on scroll position and if received perform a check to see if the visibility has changed

```
pymChild.onMessage('viewport-iframe-position', function(parentInfo) {
    tracker.checkIfVisible(parentInfo);
```

Assumptions
-----------

The following things are assumed to be true in this documentation.

* You are running OS X.
* You have installed Node.js.
* You have installed Grunt globally.

For more details on the technology stack used in NPR Visuals' app template, see our [development environment blog post](http://blog.apps.npr.org/2013/06/06/how-to-setup-a-developers-environment.html).

Modern versions of Windows and Linux should work equally well but are untested by the NPR Visuals Team.

What's in here?
---------------

The project contains the following folders and important files:

* ``dist`` -- Unminified and minified versions of pymchild-scroll-visibility library.
* ``examples`` -- Collection of working use cases for pymchild-scroll-visibility.
* ``src`` -- Source files for this project
* ``Gruntfile.js`` -- [Grunt.js](http://gruntjs.com/) task runner config file

Bootstrap the project
---------------------

Node.js is required. If you don't already have it, get it like this:

```
brew install node
```

Then, Make sure you have grunt installed globally

```
npm install -g grunt
```

Then bootstrap the project:

```
npm install
```

Hide project secrets
--------------------

Project secrets should **never** be stored anywhere else in the repository. They will be leaked to the client if you do. Instead, always store passwords, keys, etc. in environment variables and document that they are needed here in the README.

Run the project
---------------

In order to check pymchild-scroll-visibility the best approach is to fire up a local webserver and go to the examples to see it in action.

The included server includes `livereload` so each time you change something on the `examples` or `src` folder the server will refresh the page for you.

```
$ cd pymchild-scroll-visibility
$ grunt server
```

## Development tasks

Grunt configuration is included for running common development tasks.

Javascript can be linted with [jshint](http://jshint.com/):

```
grunt jshint
```

Unminified source can be regenerated with:

```
grunt concat
```

Minified source can be regenerated with:

```
grunt uglify
```

API documention can be generated with [jsdoc](https://github.com/jsdoc3/jsdoc):

```
grunt jsdoc
```

Build the project
-----------------

We use grunt tasks to build the project into the `dist` folder. Linting JS, uglyfing, etc.

```
$ grunt
```

That execution will create a minified and unminified version of our custom folder on the `dist` folder.

It will also generate an API documentation if you want to check that out run:
```
$ grunt server
```

and navigate to http://localhost:9000/api/pymchild-scroll-visibility/X.X.X/ on your browser.

Where X.X.X is the actual version of the loader defined in `package.json`

Update the project
------------------

**NPR only** If a new version of this library is needed the workflow would be:

* Make the needed changes on code and test it thoroughly.
* Change the version according following the [semantic versioning](http://semver.org/) pattern.

We use grunt tasks to build the project into the `dist` folder. Linting JS, uglyfing, etc.

```
$ grunt
```

That execution will create a minified and unminified version of our custom folder on the `dist` folder.

It will also generate an API documentation if you want to check that out run:
```
$ grunt server
```

and navigate to http://localhost:9000/api/pymchild-scroll-visibility/X.X.X/ on your browser.

Where X.X.X is the actual version of the loader defined in `package.json`.

Versioning
----------

The project follows the [semantic versioning](http://semver.org/) pattern MAJOR.MINOR.PATCH.

* MAJOR version changes for backwards-incompatible API changes.
* MINOR version for new backwards-compatible functionality.
* PATCH version for backwards-compatible bug fixes.

License and credits
-------------------

Released under the MIT open source license. See `LICENSE` for details.

pymchild-scroll-visibility.js was built by the [NPR Visuals](http://github.com/nprapps) team
