export class EarmbaConstantes{
    
        static readonly BASE_URL : string ="http://localhost:0808/public/api/paciente";
    
        static readonly Auth={
            login:'login',
            rotinas : { 
                inserir :'rotinas/inserir' ,
                pesquisar:'rotinas/pesquisar',
                atualizar:'rotinas/atualizar',
                deletar:'rotinas/deletar'
            },
            remedio : { 
                inserir :'remedio/inserir' ,
                pesquisar:'remedio/pesquisar',
                atualizar:'remedio/atualizar',
                deletar:'remedio/deletar'
            },
            relatorio:{
                gerarGrafico:'relatorio/gerarGrafico'
            }
        }
    }