import { CliCommandInterface } from './cli-command.interface.js';
import chalk from 'chalk';

export default class HelpCommand implements CliCommandInterface {
  public readonly name = '--help';

  public async execute(): Promise<void> {
    const log = console.log;
    log(chalk.underline('Пограмма для подготовки данных для REST API сервера.'));
    log('Пример:');
    log(chalk.green('main.js') + chalk.green.bold(' --<command>') + chalk.green(' [--arguments]'));
    log(`
        Команды:
            --version:                   # выводит номер версии
            --help:                      # печатает этот текст
            --import <path>:             # импортирует данные из TSV
            --generator <n> <path> <url> # генерирует произвольное количество тестовых данных
        `);
  }
}

