module.exports = {
  branches: [
    'master',
    // {
    //   name: 'staging',
    //   prerelease: 'beta',
    //   channel: 'beta',
    // },
  ],
  plugins: [
    '@semantic-release/commit-analyzer',
    '@semantic-release/release-notes-generator',
    '@semantic-release/github',
    '@semantic-release/npm',
  ]
}
