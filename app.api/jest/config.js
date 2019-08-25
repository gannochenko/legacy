module.exports = {
    verbose: true,
    rootDir: '../src',
    setupFiles: ['<rootDir>/../jest/setup.js'],
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
    },
};
