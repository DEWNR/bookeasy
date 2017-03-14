var config       = require('../config')

var gulp         = require('gulp')
var jeditor      = require('gulp-json-editor')
var request      = require('request')
var source       = require('vinyl-source-stream')
var streamify    = require('gulp-streamify');

var operatorDataTask = function(cb) {

    return request({
            url: 'https://sjp.impartmedia.com/V1.1/be/getOperatorsInformation?q=188',
            headers: {
                'User-Agent': 'request'
            }
        })
        .pipe(source('operatorData.json'))
        .pipe(streamify(jeditor(function (json) {
            return json['Operators'].map(function (operators) {
                return {
                    ResidentialAddress: operators.ResidentialAddress,
                    TradingName: operators.TradingName,
                    Location: operators.Location
                };
            });
        })))
        .pipe(gulp.dest('./src/data'));

}

gulp.task('operatorData', operatorDataTask)

module.exports = operatorDataTask
