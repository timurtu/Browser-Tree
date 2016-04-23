/**
 * Created by timur on 4/23/16.
 */
// karma.conf.js
module.exports = function (config) {
  config.set({
    frameworks: ['mocha'],

    browsers: ['Electron'],

    files: [
      '*.js'
    ],

    client: {
      mocha: {
        reporter: 'html', // change Karma's debug.html to the mocha web reporter
        ui: 'tdd'
      }
    }

  });
};
