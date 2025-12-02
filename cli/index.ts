import { Command } from 'commander'
import { CompromissoRepo } from '../repos/CompromissoRepo.js'
import { CompromissoService } from '../services/CompromissoService.js'
const program = new Command()
const compromissoRepo = new CompromissoRepo()
const compromissoService = new CompromissoService(compromissoRepo)

program
  .name('Lista de Compromissos-cli')
  .description('CLI para controle de compromissos')
  .version('1.0.0');

program
  .command('adicionar <start_date> <start_time> <end_time> <descricao>')
  .description('Adiciona um novo compromisso à lista')
  .action(async (
    start_date: string,
    start_time: string,
    end_time: string,
    descricao: string
  ) => {

    const replaceDate = start_date.replace(/-/g, '/');
    const [dayStr, monthStr, yearStr] = replaceDate.split('/');

    const [startHourStr, StartMinuteStr] = start_time.split(':');
    const [endHourStr, endMinuteStr] = end_time.split(':');

    const datePart = `${yearStr}/${monthStr}/${dayStr}`;
    
    const startDateTimeString = `${datePart} ${startHourStr}:${StartMinuteStr}`;
    const endDateTimeString = `${datePart} ${endHourStr}:${endMinuteStr}`;

    const startDate = new Date(startDateTimeString);
    const endDate = new Date(endDateTimeString);

    const compromisso = await compromissoService.adicionarCompromisso(
      startDate,
      endDate,
      descricao
    );
    console.log('Compromisso adicionado:', compromisso)
  });

program
  .command('listar')
  .description('Lista todos os compromissos da lista')
  .action(async () => {
    const compromissos = await compromissoService.listarCompromissosFormatados()

    console.log('--- Lista de Compromissos ---');
    if (compromissos.length === 0){
        console.log('Nenhum compromisso encontrado.');
    } else {
        compromissos.forEach((c) => {
            console.log(`Descrição: ${c.descricao}\nData início: ${c.dataInicio}\nHora início: ${c.horaInicio}\nHora fim: ${c.horaFinal}\n`)
        })
    }
  });

program.parse(process.argv);