import { prisma } from '../lib/prisma.js'
import { Compromisso } from '../entities/Compromisso.js'
import { CompromissoFormatado } from '../interface/CompromissoFormatado.js'

export class CompromissoRepo {
  forEach(arg0: (c: any) => void) {
    throw new Error('Method not implemented.')
  }
  async adicionarCompromisso(startDate: Date, endDate: Date, description: string): Promise<Compromisso> {
    const compromisso = await prisma.compromisso.create({
      data: { start_datetime: startDate, end_datetime: endDate, description },
    })
    return new Compromisso(
      compromisso.id,
      compromisso.start_datetime,
      compromisso.end_datetime,
      compromisso.description
    )
  }

  async verificarDatasDuplicadas(startDate: Date, endDate: Date): Promise<boolean> {
 
    const compromissos = await prisma.compromisso.findMany();

    for (const compromisso of compromissos) {   
      const inicioExistente = compromisso.start_datetime;
      const fimExistente = compromisso.end_datetime;

      if (startDate < fimExistente && endDate > inicioExistente) {
        return true;
      }
    }

    return false;
  }


  async listarCompromissosFormatados(): Promise<CompromissoFormatado[]> {
    const compromissos = await prisma.compromisso.findMany();

    return compromissos.map(
      (compromisso) => {

        const opcoesData = { day: '2-digit', month: '2-digit', year: 'numeric' } as const;
        const opcoesHora = { hour: '2-digit', minute: '2-digit', hour12: false } as const;

        const locale = 'pt-BR';

        return {
          id: compromisso.id,

          dataInicio: compromisso.start_datetime.toLocaleDateString(locale, opcoesData),
          horaInicio: compromisso.start_datetime.toLocaleTimeString(locale, opcoesHora),

          dataFinal: compromisso.end_datetime.toLocaleDateString(locale, opcoesData),
          horaFinal: compromisso.end_datetime.toLocaleTimeString(locale, opcoesHora),

          descricao: compromisso.description,
        }


      }

      // new Compromisso(
      //   compromisso.id,
      //   compromisso.start_datetime,
      //   compromisso.end_datetime,
      //   compromisso.description
      // )
    )
  }
}