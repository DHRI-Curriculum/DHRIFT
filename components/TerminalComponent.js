import ReactTerminal from 'react-terminal-component';
import {
  EmulatorState, OutputFactory, CommandMapping,
  EnvironmentVariables, FileSystem, History,
  Outputs, defaultCommandMapping
} from 'javascript-terminal';

export default function TerminalComponent() {
    const customState = EmulatorState.create({
        'fs': FileSystem.create({
          '/home': { },
          '/home/README': {content: 'This is a text file'},
          '/home/nested/directory': {},
          '/home/nested/directory/file': {content: 'End of nested directory!'}
        })
      });

      return(
          <ReactTerminal
          theme={{
            background: '#141313',
            promptSymbolColor: '#6effe6',
            commandColor: '#fcfcfc',
            outputColor: '#fcfcfc',
            errorOutputColor: '#ff89bd',
            fontSize: '1.1rem',
            spacing: '1%',
            fontFamily: 'monospace',
            width: '100%',
            minHeight: '5vh',
            padding: '10px',
          }}
        emulatorState={customState}/>
      )
}