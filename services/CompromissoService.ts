import { Compromisso } from '../entities/Compromisso.js'
import { CompromissoFormatado } from '../interface/CompromissoFormatado.js';
import { CompromissoRepo } from '../repos/CompromissoRepo.js'

export class CompromissoService {
  constructor(private compromissoRepo: CompromissoRepo) { }

  async adicionarCompromisso(
      start_datetime: Date,
      end_datetime: Date,
      description: string
    ): Promise < Compromisso > {
      const verificarCompromissos = await this.compromissoRepo.verificarDatasDuplicadas(start_datetime, end_datetime);

      if (verificarCompromissos) {
        throw new Error("Há um compromisso nessa data e hora, por favor, escolha outra data.")
      }
      return this.compromissoRepo.adicionarCompromisso(start_datetime, end_datetime, description)
    }

  async listarCompromissosFormatados(): Promise < CompromissoFormatado[] > {
      return this.compromissoRepo.listarCompromissosFormatados();
    }

  }