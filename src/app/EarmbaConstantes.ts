export class EarmbaConstantes{
    
        static readonly BASE_URL : string ="http://192.168.0.8:8090/slim/public/api/paciente";
    
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
                gerarGrafico:'relatorio/gerarGrafico',
                receberWeekNumber:'relatorio/receberWeekNumber'
            },
            teste:{
               pesquisarPessoal:'teste/pesquisarPessoal',
               pesquisarMiniMental:'teste/pesquisarMiniMental',
               responderMiniMental:'teste/inserirRespostaMiniMental',
               insertNotaDiaria:'teste/insertNotaDiaria',
               responderPessoal:'teste/inserirRespostaPessoal'
            },
            pergunta:{
                inserir:'pergunta/inserirPergunta',
                pesquisar:'pergunta/pesquisarPergunta'
            }
        }
    }