
- Rollup Version: **2.39.0+ with plugin @rollup/plugin-commonjs**
- Node Version: **14**

Steps to reproduce:
```
npm install && npm run build
```


I'm not sure if this is a problem in `rollup` or in rollup plugin `commonjs`.
I just upgraded my build scripts from `rollup 2.38.5` to latest one and now project fails to build.
The problem is - compiler complains with `Error: Unexpected token` on at least words `require` and `global` when used as class property names like following:

```
class TestClass {
    global;
}

module.exports = new TestClass();
```

Project is built with gulp and build script looks like following:
```
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
```

Reproducibility
* Reproducible with any version of rollup of 2.39.0 and above
* Is NOT reproducible if with rollup of 2.38.5 and below (the one I used previously)
* Is NOT with any recent version of rollup when `rollupCommonJS` plugin is excluded

So as far as I may suspect - there is some conflict between `rollup` and `rollupCommonJS` plugin. Not sure where root cause is.
I hope this information is enough to fix this issue.


