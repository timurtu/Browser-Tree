/**
 * Created by timur on 4/23/16.
 */
// karma.conf.js
module.exports = (config) => {
  config.set({

    basePath: './',

    frameworks: ['jasmine'],

    browsers: ['Electron'],

    files: [
      '**/*[sS]pec.js'
    ]

  })
}
