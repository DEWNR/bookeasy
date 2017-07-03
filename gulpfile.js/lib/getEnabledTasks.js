var config = require('../config')
var compact = require('lodash.compact')

// Grouped by what can run in parallel
var assetTasks = ['fonts', 'images', 'data', 'svgSprite']
var codeTasks = ['htmlData', 'html', 'css', 'js']

module.exports = function(env) {

  var matchFilter = function(task) {
    if(config.tasks[task]) {
      return task
    }
  }

  function exists(value) {
    return !!value
  }

  return {
    assetTasks: compact(assetTasks.map(matchFilter).filter(exists)),
    codeTasks: compact(codeTasks.map(matchFilter).filter(exists))
  }
}
