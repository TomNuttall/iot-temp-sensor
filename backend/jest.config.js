// jest.config.js
module.exports = {
  preset: 'jest-dynalite',
  moduleFileExtensions: ['js'],
  moduleDirectories: ['node_modules', 'src'],
  transform: {
    '^.+\\.(js)$': 'babel-jest',
  },
}
