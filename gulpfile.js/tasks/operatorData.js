// this task is only run manually if you wanted to update C:\WORK\bookeasy\src\data\operatorData.json with the latest data from BookEasy's API

var config       = require('../config')

var gulp         = require('gulp')
var jeditor      = require('gulp-json-editor')
var request      = require('request')
var source       = require('vinyl-source-stream')
var streamify    = require('gulp-streamify');

var operatorDataTask = function(cb) {

    return request({
            url: 'https://sjp.impartmedia.com/be/getOperatorsInformation?q=188',
            headers: {
                'User-Agent': 'request'
            }
        })
        .pipe(source('operatorData.json'))
        .pipe(streamify(jeditor(function (json) {
            return json; //return the raw json to keep it consistent with live data
        })))
        .pipe(gulp.dest('./src/data'));

}

gulp.task('operatorData', operatorDataTask)

module.exports = operatorDataTask
