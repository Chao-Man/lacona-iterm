/** @jsx createElement */
import { createElement } from 'elliptical'
import { Command, Directory } from 'lacona-phrases'
import { callSystem } from 'lacona-api'

export const OpenTerminalAt = {
  extends: [Command],

  execute (result) {
    var path = result.path
    var cmd = (
      'if [[ -d "' + path + '" ]]; then ' +
        'open -a iTerm "' + path + '"; ' +
      'elif [[ -f "' + path + '" ]]; then ' +
        'open -a iTerm "$(dirname "' + path + '")"; ' +
      'else ' +
        'osascript -e \'display notification "Failed to run Lacona command"\'; ' +
      'fi '
    )

    console.log('Launching iterm')
    callSystem({command: "/bin/bash", args: ['-c', cmd]}, function(){})
  },

  describe () {
    return (
      <sequence>
        <literal text='Terminal at path ' />
        <Directory id='path' />
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
