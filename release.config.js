// release.config.js
module.exports = {
  branches: ['master'], // set this to your default branch
  plugins: [
    '@semantic-release/commit-analyzer',
    '@semantic-release/release-notes-generator',
    '@semantic-release/changelog',
    [
      '@semantic-release/npm',
      {
        // if your project is not published to npm, you can use this to update the version in package.json
        npmPublish: false
      }
    ],
    [
      '@semantic-release/exec',
      {
        prepareCmd: 'echo ${nextRelease.version} > VERSION'
      }
    ],
    '@semantic-release/github'
  ]
}
