var config = require('../config')
var compact = require('lodash/array/compact')

// Grouped by what can run in parallel
var assetTasks = ['fonts', 'images', 'svgSprite']
var codeTasks = ['html', 'css', 'js']

module.exports = function(env) {

  var matchFilter = function(task) {
    if(config.tasks[task]) {
      return task
    }
  }

  return {
    assetTasks: compact(assetTasks.map(matchFilter)),
    codeTasks: compact(codeTasks.map(matchFilter))
  }
}
