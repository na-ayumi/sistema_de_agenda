import express from 'express'
import { CompromissoRepo } from '../repos/CompromissoRepo.js'
import { CompromissoService } from '../services/CompromissoService.js'

const app = express()
const port = 3000
const compromissoRepo = new CompromissoRepo()
const compromissoService = new CompromissoService(compromissoRepo)

app.use(express.json())

app.post('/compromissos', async (req, res) => {
  const { dataInicio, dataFim, descricao } = req.body
  try {
    const compromisso = await compromissoService.adicionarCompromisso(dataInicio, dataFim, descricao);
    res.status(201).json(compromisso)
  } catch (error: any) {
    res.status(400).json({ error: error?.message })
  }
})
app.get('/compromissos', async (req, res) => {
  const compromissos = await compromissoService.listarCompromissosFormatados()
  res.json(compromissos)
})

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`)
})