const path = require("path");
const {
    create
} = require("enhanced-resolve");
const isBuiltin = require("is-core-module");

const resolverDefaults = {
    extensions: [".ts", ".tsx", ".d.ts", ".js"],
};

let resolver;

function createResolver(configs) {
    return create.sync({
        ...resolverDefaults,
        ...configs,
    })
}

function cleanRequest(request) {
    const finalBang = request.lastIndexOf("!");
    if (finalBang >= 0) {
        request = request.slice(finalBang + 1);
    }
    const finalQuestionMark = request.lastIndexOf("?");
    if (finalQuestionMark >= 0) {
        request = request.slice(0, finalQuestionMark);
    }
    return request;
}

module.exports.interfaceVersion = 2;
module.exports.resolve = function resolve(request, sourceFile, config) {
    resolver = resolver || createResolver(config);

    // Other resolvers incorrectly check for core modules before resolving. We are maintaining
    // this functionality for ease of transition.
    if (config.legacyCoreModuleResolution && isBuiltin(request)) {
        return {
            found: true,
            path: null
        };
    }

    try {
        request = cleanRequest(request);
        const resolved = resolver({}, path.dirname(sourceFile), request);
        return {
            found: true,
            path: resolved
        };
    } catch (e) {
        if (isBuiltin(request)) {
            return {
                found: true,
                path: null
            };
        }
        return {
            found: false
        };
    }
};