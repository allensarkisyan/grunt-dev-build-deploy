Grunt - Conitunous Development Environment
================================

Grunt Dev, Build, and Deploy - boilerplate project for quickly setting up a continuous integration development, build, and deployment environment for HTML5 applications. clean, concat, cssmin, uglify & copy with automated unit testing and livereload. - Enabling true test driven development.


>Author: Allen Sarkisyan

>Copyright: (c) 2014 Allen Sarkisyan

>License: MIT


Dependencies
--

* Node.JS
* NPM (Node Package Manager)
* Grunt CLI
* Karma CLI
* PhantomJS
* Azure CLI (if using the Windows Azure Platform)
* Nodemon
* Node Inspector

---

Get up and running - Install Dependencies
--

```bash
# Install Git
# - Download from: http://git-scm.com/download

# Install Node & NPM
# - Download from: http://nodejs.org/download/

# Install Grunt CLI via NPM
npm install -g grunt-cli

# Install Karma CLI via NPM
npm install -g karma-cli

# Install PhantomJS via NPM
npm install -g phantomjs

# Install Azure CLI via NPM
npm install -g azure-cli

# Install Nodemon via NPM
npm install -g nodemon

# Install Node Inspector via NPM
npm install -g node-inspector

# Clone the repository to your dev environment directory
git clone https://github.com/allensarkisyan/grunt-dev-build-deploy.git

# Install all application dependencies - Run npm install from your workspace directory
npm install
```

---

Configuration
--

###Build Configuration: build-config.json
All build related configuration is contained within this JSON config file, manage build related project configuration and grunt tasks for:
- clean
- concat
- cssmin
- uglify
- copy

###DevOps Configuration: continuous-devops-config.json
All development and operations related configuration is contained within this JSON config file, manage all development related configuration and grunt tasks for:
- nodemon
- watch
- jshint
- karma (Karma test environment)

---

Development Environment - True Test Driven Development
--

```bash
# Development Environment Setup
grunt dev

# Continuous testing in parallel with development
# - Meant to be ran in a seperate terminal window along with grunt dev
grunt dev:tdd

# Test Driven Development - Continuous TDD
# - Dev environment with continuous test automation in a single terminal window
grunt TDD

# Test automation - Single run unit tests in all browsers [Chrome, Firefox, Safari, Opera, PhantomJS]
grunt test

```

---

Production Build Preflight
--

```bash
# Production Build
grunt build:production

```

---

Deployment Procedures (assuming you use git)
--

```bash
# Deploy to Remote
git push {{REMOTE}} {{BRANCH}}

```

----
License
----

MIT

Copyright (c) 2014 Allen Sarkisyan

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.