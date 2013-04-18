---
layout: post
title: "Creating modular web app with one JavaScript and one CSS file by using RequireJS and Almond"
date: 2013-04-18 06:25
comments: true
categories: [RequireJS, Almond]
---

Have you ever stuck into the web application with lots of JavaScript, CSS files and keeping track of their order of loading then RequireJS will be of your help.


##What is RequireJS ?

RequireJS is a module loading library for the javascript, which will improve the speed and quality of javascript code.

It also comes with a optimization tool r.js which combines related scripts together into build layers and minifies them via UglifyJS (the default) or Closure Compiler (an option when using Java), also it
optimizes CSS by inlining CSS files referenced by @import and removing comments.

##What is Almond ?
It's a replacement AMD loader for RequireJS. It is a smaller "shim" loader, providing the minimal AMD API footprint that includes loader plugin support.

##Problem
A normal web application normally have following script loading structure

```html
<script src="js/lib/jquery.js" type="text/javascript"></script>
<script src="js/lib/underscore.js" type="text/javascript"></script>
<script src="js/lib/backbone.js" type="text/javascript"></script>
<script src="js/models/todo.js" type="text/javascript"></script>
<script src="js/collections/todos.js" type="text/javascript"></script>
<script src="js/views/todoView.js" type="text/javascript"></script>
<script src="js/views/app.js" type="text/javascript"></script>
```

which will lead into the multiple HTTP requests

![requirejs-nrequests](/images/requirejs-nrequests.png)

## Goal
Minimize the browser request to exactly 3 resources one HTML, one JavaScript and one CSS.

![requirejs-3requests](/images/requirejs-3requests.png)

To achieve this we need to understand how RequireJS load the JavaScript files.

## Script Loading
RequireJS takes a different approach to script loading than traditional script tags. As mention on its site RequireJS goal is to encourage modular code.

RequireJS loads all code relative to a baseUrl. The baseUrl is normally set to the same directory as the script used in a data-main attribute for the top level script to load for a page or baseUrl can be set manually via the RequireJS config.

```html
<script data-main="scripts/main" src="scripts/require.js"></script>
```

And the main file with RequireJS configuration will look like this

```js
requirejs.config({
   // The shim config allows us to configure dependencies for
   // scripts that do not call define() to register a module
	shim: {
		underscore: {
			exports: '_'
		},
		backbone: {
			deps: ['underscore', 'jquery'],
			exports: 'Backbone'
		}
	},
	paths: {
		jquery: 'lib/jquery',
		underscore: 'lib/underscore',
		backbone: 'lib/backbone/backbone',
	}
});
// Start the main app logic.
require(['jquery', 'backbone', 'views/app'], function ($, Backbone, AppView) {
	// Initialize the application view
	new AppView();
});
```

##Modules

Modules in RequireJS are an extension of the Module Pattern, with the benefit of not needing globals to refer to other modules. They can explicitly list their dependencies and get a handle on those dependencies without needing to refer to global objects, but instead receive the dependencies as arguments to the function that defines the module.

There should only be one module definition per file on disk. A sample module with dependency looks like this

```js
define(['jquery','underscore','backbone','collections/todos'],
function($, _, Backbone, Todos) {

	var AppView = Backbone.View.extend({
		el: '#todo',
		events: {
			'click #addTodo': 'newTodo'
		},
		initialize: function () {...},
		render: function () {...},
		newTodo: function () {...}
	});

	return AppView;
});
```

##Shims

For older libraries which do not support AMD RequireJS can handle them via shims.

Shims configure the dependencies and exports for older, traditional "browser globals" scripts that do not use define() to declare the dependencies and set a module value.

Here is an example. It requires RequireJS 2.1.0+, and assumes backbone.js, underscore.js and jquery.js have been installed in the baseUrl directory. If not, then you may need to set a paths config for them:

```js
shim: {
      underscore: {
          exports: '_'
      },
      backbone: {
          deps: ['underscore', 'jquery'],
          exports: 'Backbone'
      }
  }
```


Now with this configuration and organizing JavaScript code in our app resolves dependency issue we don't need to track the order in which script gets loaded.

But still there are HTTP request for each javascript file. This can be minimize using the RequireJS optimization tool r.js

##Optimization
r.js tool combines related scripts together into build layers and minifies them and also
optimizes CSS by inlining CSS files referenced by @import and removing comments.

The optimizer can be run using Node, Java with Rhino, or in the browser.

So with node we can easily optimize all  JavaScript and CSS files by using the config file and following command

For JavaScript

	node r.js -o baseUrl=. paths.jquery=some/other/jquery name=main out=main-built.js

CSS files can be optimize by the following command

	node r.js -o cssIn=main.css out=main-built.css

Or we can configure the whole project by giving a single config file and running the following command

	node r.js -o build.js

and build.js config file will look like

```js
({
    baseUrl: ".",
    paths: {
        jquery: "some/other/jquery"
    },
    name: "main",
    out: "main-built.js"
})
```

Once we get this we can modify our HTML to include this new file.

Now with this application will load single CSS file and 2 JavaScript files (require.js and app.js) which is not our goal.

##Almond Configuration
Now as we have minimize all the javascript files into single file we do not require the require js asynchronous script loading functionality thats why jbruck created the almond its a replacement AMD loader for RequireJS. It is a smaller "shim" loader, providing the minimal AMD API footprint that includes loader plugin support.

when it pass to the r.js optimizer it creates the minified script with require module loader functionality

	node r.js -o baseUrl=. name=path/to/almond include=main out=main-built.js wrap=true

So basically this command will wrap everything inside a function

```js
(function () {
    //almond will be here
    //main and its nested dependencies will be here
}());
```

This can also be done with config file by just adding the path to almond file

```js
{
	baseUrl: __dirname + '/public/js/',
	name: 'almond.js',
	out: __dirname + '/public/js/main-built.js',
	mainConfigFile: __dirname + '/public/js/main.js',
	include: ['main'],
	insertRequire: ['main'],
	wrap: true
}
```

now with this JavaScript we can modify our HTML as below

```html
<script src="js/main-built.js" type="text/javascript"></script>
```

Now we have exactly 3 request one HTML, one Javascript and one CSS.


##Optimizing images
Normal web app will have many images on the page for e.g. logo, icons etc. These images are normally added as the css classes with background images. HTTP request call to load them can be save if they are added as the base64 data:image

	background-image: url("data:image/png;base64,iVBOR...");

so that with CSS optimization and serving them as gzip will reduce the size of them dramatically.
