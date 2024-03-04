export class Tarefa {
    id: string = ''
    descricao!: string
    dataCadastro?: string
    dataAtualizacao: string|undefined
    concluido: boolean = false
    ativo: boolean = true
}
