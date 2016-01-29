module.exports = checkAUTHORSCertificate

var child = require('child_process')

function checkAUTHORSCertificate(directory, callback) {
  listGitAuthors(directory, function(error, gitAuthors) {
    if (error) {
      callback(error) }
    else {
      callback(null, gitAuthors) } }) }

function listGitAuthors(gitDirectory, callback) {
  var error = false

  var git = child.spawn(
    'git', [ 'log',  '--format="%aN"' ],
    { cwd: gitDirectory })

  var outputBuffers = [ ]
  git.stdout
    .on('data', function(buffer) {
      outputBuffers.push(buffer) })

  var errorBuffers = [ ]
  git.stderr
    .on('data', function(buffer) {
      errorBuffers.push(buffer) })

  git
    .on('error', function(gitError) {
      error = gitError
      callback(error) })
    .on('close', function(exitCode) {
      if (exitCode !== 0) {
        callback(
          new Error(
            'Failed with exit code ' + exitCode + '\n' +
            Buffer.concat(errorBuffers).toString() )) }
      else if (error) {
        callback(error) }
      else {
        var output = Buffer.concat(outputBuffers).toString()
        var gitAuthors = output
          .split('\n')
          .reduce(
            function(unique, element) {
              return (
                ( ( unique.indexOf(element) < 0 ) &&
                  ( element.length > 0 ) ) ?
                    unique.concat(element) :
                    unique ) },
            [ ])
        callback(null, gitAuthors) } }) }
