import command from 'commander';

command.version('0.1')
  .option('-r, --run')
  .parse(process.argv);

if (command.run) {
  console.log('run code goes here');
}
