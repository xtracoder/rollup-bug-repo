const gulp = require('gulp')
const rollup = require('rollup')
const rollupCommonJS = require("@rollup/plugin-commonjs");

module.exports.build = gulp.series(appJs)

function appJs(callback) {
    let plugins = [
        rollupCommonJS({requireReturnsDefault: "namespace"})
    ]

    return rollup.rollup({
            input: 'main.js',
            plugins: plugins,
            perf: true
        }).then(bundle => {
            console.warn(bundle.getTimings())
            return bundle.write({
                name: "app",
                file: 'out/main.js',
                format: 'iife',
                sourcemap: true
            });
        })
}
