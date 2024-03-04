import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Tarefa } from 'src/model/tarefa';
import { TarefaServiceService } from 'src/services/tarefa-service.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(
    private _tarefaService: TarefaServiceService
  ) { }
  descricaoTarefa: string = ''
  listasTarefaEmAndamento: Tarefa[] = []
  listasTarefaConcluidas: Tarefa[] = []
  TarefaVM: Tarefa = new Tarefa()
  tarefaConcluida :boolean =false
  id: string = ''
  ngOnInit(): void {
    this.buscarTarefas()
  }

  buscarTarefas(){
    this._tarefaService.buscarTarefas().subscribe(
      (response) => {
        this.listasTarefaEmAndamento = response.tarefas.filter((x:any) => x.concluido ==false);
        this.listasTarefaConcluidas = response.tarefas.filter((x:any) => x.concluido ==true);
      },
      (error) => {
        console.log('Erro no carregamento', error);
      }
    )
  }  
 
  cadastrarTarefa(){
    if(this.descricaoTarefa.length > 255){ 
      return alert("Limite de caracteres excedido!, somente 255 caracteres serão aceitos.")
    }
    else if( this.descricaoTarefa ){
      this.TarefaVM.descricao = this.descricaoTarefa 
      this._tarefaService.cadastrarTarefa(this.TarefaVM).subscribe({
        next: () => { 
          this.descricaoTarefa =''
              alert("Tarefa cadastrada com sucesso!")
              this.buscarTarefas();
          },
        error: (error) => { 
            console.error('Erro no componente:', error); 
          }
      });
    }
    else{
      alert("Campo vazio!")
      return
    }
  }

  deletarTarefa(id:string){
    if(confirm("Tem certeza que deseja deletar essa tarefa?")) {
      this._tarefaService.deletarTarefa(id).subscribe({
        next: () => { 
          this.descricaoTarefa =''
              alert("Tarefa deletada com sucesso!")
              this.buscarTarefas();
           },
        error: (error) => { 
            console.error('Erro no componente:', error); 
        }
      });
    }    
  }

  concluirTarefa(id:string){
    if(confirm("Tem certeza que deseja concluir essa tarefa?")) {
      this._tarefaService.concluirTarefa(id).subscribe({
        next: () => { 
          this.descricaoTarefa =''
              alert("Tarefa concluída com sucesso!")
              this.buscarTarefas();
           },
        error: (error) => { 
            console.error('Erro no componente:', error); 
        }
      });
    }    
  }

  editartarefa(id:string){
    if(id){
      this._tarefaService.buscarTarefasPorId(id).subscribe({
        next: (response) => { 
          this.descricaoTarefa =''
            this.descricaoTarefa = response.descricao
            this.id = response.id
            this.TarefaVM =response
           },
        error: (error) => { 
            console.error('Erro no componente:', error); 
        }
      });
    }
    else{ return   alert("Nenhuma tarefa selecionada.")}
  }

  atualizarTarefa(){
    if(this.descricaoTarefa.length > 255){ 
      return   alert("Limite de caracteres excedido!, somente x caracteres serão aceitos.")
    }

    else if( this.id  && this.descricaoTarefa ){
      this.TarefaVM.descricao = this.descricaoTarefa 
      this.TarefaVM.id = this.id 
      this._tarefaService.AtualizarTarefa(this.TarefaVM).subscribe({
        next: (response) => { 
          this.descricaoTarefa =''
          this.TarefaVM = new Tarefa();
          this.id=''
              alert("Tarefa atualizada com sucesso!")
              this.buscarTarefas();
          },
        error: (error) => { 
            console.error('Erro no componente:', error); 
        }
      });
    }
    else{
      alert("campo vazio!")
      return
    }
  }
}
