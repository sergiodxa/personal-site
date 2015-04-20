(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var igatajs = function (templateID, dataSet, opening, closing) {
  try {
    // check if the templateID is a valid string
    if (typeof templateID !== 'string') {
      return new Error('The template id must be a string.');
    }
    // check if dataSet is defined and is a valid object
    if (dataSet && typeof dataSet !== 'object') {
      return new Error('The dataset must be an object.');
    }
    // check if the opening symbol is defined and is a string
    if (opening && typeof opening !== 'string') {
      return new Error('The opening symbol must be a string.');
    }
    // check if the closing symbol is defined and is a string
    if (closing && typeof closing !== 'string') {
      return new Error('The closing symbol must be a string.');
    }

    // if the opening or closing symbol isn't defined there are equal to {{ and }}
    var opening = opening || '{{';
    var closing = closing || '}}';

    // function to put the dataSet inside the template
    function parseString(string, dataSet, opening, closing) {
      try {
        var open = opening.replace(/[-[\]()*\s]/g, "\\$&").replace(/\$/g, '\\$')
        var close = closing.replace(/[-[\]()*\s]/g, "\\$&").replace(/\$/g, '\\$')
        var r = new RegExp(open + '(.+?)' + close, 'g')
        var matches = string.match(r) || [];

        matches.forEach(function(match) {
          var key = match.substring(opening.length, match.length - closing.length).trim();//chop {{ and }}
          var value = typeof dataSet[key] == 'undefined' ? '' : dataSet[key];
          string = string.replace(match, value);
        });

        return string;
      } catch (err) {
        return err;
      }
    }

    // add # if the templateID does not have it
    if (templateID.indexOf('#') === -1) {
      templateID = '#' + templateID;
    }

    // get the template
    var template = document.querySelector(templateID);
    var clone;

    // if the user pass a dataSet, replace it in the clone
    if (dataSet) {
      // get the innerHTML as string
      clone    = template.innerHTML.trim()
      clone = parseString(clone, dataSet, opening, closing);
      // create de dom parser
      var parser = new DOMParser();

      // parse clone to DOM Element
      clone = parser.parseFromString(clone, 'text/html').all[2]

      // get the correct element
      clone = clone.children[0]
    } else {
      clone = document.importNode(template.content, true)
    }

    // return the clone
    return clone;
  } catch (err) {
    return err;
  }
}

module.exports = igatajs;
},{}],2:[function(require,module,exports){
'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

var _getRepositories = require('./repositories.js');

var _getRepositories2 = _interopRequireWildcard(_getRepositories);

window.onload = function () {
  _getRepositories2['default']();
};

},{"./repositories.js":3}],3:[function(require,module,exports){
'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _template = require('igatajs');

var _template2 = _interopRequireWildcard(_template);

var $repos = document.querySelector('#repositorios');

function getRepositories() {
  if (!sessionStorage.repos) {
    var request = new XMLHttpRequest();

    request.open('GET', 'https://api.github.com/users/sergiodxa/repos', true);

    request.onload = function () {
      if (this.status >= 200 && this.status < 400) {
        sessionStorage.setItem('repos', this.response);

        var data = JSON.parse(this.response);

        showRepositories(data);
      } else {
        $repos.style.display = 'none';
      }
    };

    request.onerror = function onError() {
      $repos.style.display = 'none';
    };

    request.send();
  } else {
    var data = JSON.parse(sessionStorage.getItem('repos'));
    showRepositories(data);
  }
}

function showRepositories(repos) {
  repos.forEach(function (repo) {
    var tplt = _template2['default']('#tplt-repo', {
      title: repo.name,
      description: repo.description,
      link: repo.html_url
    });

    $repos.appendChild(tplt);
  });
}

exports['default'] = getRepositories;
module.exports = exports['default'];

},{"igatajs":1}]},{},[2])
//# sourceMappingURL=../maps/main.js.map