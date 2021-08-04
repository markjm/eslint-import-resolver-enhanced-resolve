# eslint-import-resolver-enhanced-resolve

This plugin creates a super simple wrapper around `enhanced-resolve` to work with `eslint-plugin-import`. This package is very similar to the [webpack resolver](https://github.com/import-js/eslint-plugin-import/tree/master/resolvers/webpack) provided by the `eslint-plugin-import` maintainers, but skips a lot of the reading of config files and the like.

## Usage

To use this resolver, install it with your preferred package manager, and set up your configuration like below. All [`enhanced-resolve` options](https://github.com/webpack/enhanced-resolve) are supported.

```
{
    settings: {
        "import/resolver": {
            "enhanced-resolve" {
                extensions: ...
                modules: ...
            }
        }
    }
}
```

### Core Modules

There is one additional setting `legacyCoreModuleResolution` which decides if core modules (`fs`, `util`, etc) should be checked _before_ (true) or _after_ (false) resolution. This will change the resolution of npm packages of the same name as core modules.