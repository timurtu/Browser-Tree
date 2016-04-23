/**
 * Created by timur on 4/23/16.
 */
// karma.conf.js
module.exports = (config) => {
  config.set({
    frameworks: ['jasmine'],

    browsers: ['Electron'],

    files: [
      '**/*.js'
    ],

    client: {
      captureConsole: true,
      clearContext: true
    }

  })
}
