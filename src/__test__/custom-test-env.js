const Environment = require('jest-environment-jsdom');

/**
 * Custom environment to set TextEncoder for tests.
 */
module.exports = class CustomTestEnvironment extends Environment {
    async setup() {
        await super.setup();
        const { TextEncoder } = require('util');
        this.global.TextEncoder = TextEncoder;
    }
}