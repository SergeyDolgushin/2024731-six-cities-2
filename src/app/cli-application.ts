import { CliCommandInterface } from '../cli-command/cli-command.interface.js';
import chalk from 'chalk';


type ParsedCommand = {
  [key: string]: string[]
}

export default class CLIApplication {
  private commands: {[propertyName: string]: CliCommandInterface} = {};
  private defaultCommand = '--help';

  public registerCommands(commandList: CliCommandInterface[]): void {
    commandList.reduce((acc, Command) => {
      const cliCommand = Command;
      acc[cliCommand.name] = cliCommand;
      return acc;
    }, this.commands);
  }

  private parseCommand(cliArguments: string[]): ParsedCommand {
    const parsedCommand: ParsedCommand = {};
    let command = '';

    return cliArguments.reduce((acc, item) => {
      if (item.startsWith('--')) {
        acc[item] = [];
        command = item;
      } else if (command && item) {
        acc[command].push(item);
      }

      return acc;
    }, parsedCommand);
  }

  public getCommand(commandName: string): CliCommandInterface {
    if (!this.commands[commandName]) {
      console.log(chalk.red.bold('Error:') + chalk(` команды "${commandName}" не существует`));
      return this.commands[this.defaultCommand];
    }
    return this.commands[commandName];
  }

  public processCommand(argv: string[]): void {
    const parsedCommand = this.parseCommand(argv);
    const [commandName] = Object.keys(parsedCommand);
    const command = this.getCommand(commandName);
    const commandArguments = parsedCommand[commandName] ?? [];
    command.execute(...commandArguments);
  }

}

