/** @jsx createElement */
import { createElement } from 'elliptical'
import { Command, File } from 'lacona-phrases'
import { callSystem } from 'lacona-api'

export const OpenTerminalAt = {
  extends: [Command],

  execute (result) {
    var fp = result.filepath
    if (fp) {
      var cmd = (
        'if [[ -d "' + fp + '" ]]; then ' +
          'open -a iTerm "' + fp + '"; ' +
        'elif [[ -f "' + fp + '" ]]; then ' +
          'open -a iTerm "$(dirname "' + fp + '")"; ' +
        'else ' +
          'osascript -e \'display notification "Failed to run Lacona command"\'; ' +
        'fi '
      )
    }
    else {
      var cmd = "open -a iTerm"
    }
    console.log('Launching iterm')
    callSystem({command: "/bin/bash", args: ['-c', cmd]}, function(){})
  },

  describe () {
    return (
      <sequence>
        <literal text='Terminal at path ' />
        <File id='filepath' />
      </sequence>
    )
  }
}

export const OpenTerminal = {
  extends: [Command],

  execute (result) {
    var cmd = "open -a iTerm"
    console.log('Launching iterm')
    callSystem({command: "/bin/bash", args: ['-c', cmd]}, function(){})
  },

  describe () {
    return (
      <literal text='Terminal' />
    )
  }
}

export default [OpenTerminal, OpenTerminalAt]
