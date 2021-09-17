import Cabecalho from '../../components/cabecalho'
import Menu from '../../components/menu'
import React, { useRef } from "react";
import { Container, Conteudo } from './styled'
import { ToastContainer, toast, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Api from '../../service/api';
import { useState, useEffect } from 'react';
import axios from 'axios';
import LoadingBar from 'react-top-loading-bar';

const api = new Api();


export default function Index() {

    const [alunos, setAlunos] = useState([]);
    const [nome, setNome] = useState('');
    const [chamada, setChamada] = useState('');
    const [turma, setTurma] = useState('');
    const [curso, setCurso] = useState('');
    const [idAlterando, setIdAlterando] = useState(0);
    const loading = useRef();

    async function listar(){
        let r = await api.listar();
        setAlunos(r);
        loading.current.complete();
    } 

    async function inserir(){
        loading.current.continuousStart();
        if(idAlterando == 0) {
            let r = await api.inserir(nome, chamada, curso, turma)
            

            if (r.erro) toast.dark(r.erro)
            else toast.dark('Aluno Inserido Parçaaa') ;
            

        } else {
            let r = await api.alterar(idAlterando, nome, chamada, curso, turma)
            
            if (r.erro) toast.dark(r.erro)
            else toast.error    ('Aluno Alterado');
          
        }


        
        limparCampos();
        listar();   
        loading.current.complete();
    }


    function limparCampos() {
            setNome('');
            setChamada('');
            setCurso('');
            setTurma('');
            setIdAlterando(0);

    }

    async function remover(id){
        let r = await api.remover(id)
        toast.dark('Aluno Removido Zé');   
        listar(); 
        loading.current.complete();
    }

    async function editar(item){
        setNome(item.nm_aluno);
        setChamada(item.nr_chamada);
        setCurso(item.nm_curso);
        setTurma(item.nm_turma);
        setIdAlterando(item.id_matricula);
         

    }


    // função é chamada uma vez quando a tela abre
    useEffect(() => {
        listar();
        loading.current.complete();
    }, []) 
    



    return (
        <Container>
            <ToastContainer draggable={false} transition={Zoom} autoClose={3000} />
            <LoadingBar color="blue" ref={loading} />
            <Menu/>
            <Conteudo>
            

                <Cabecalho/>
            

        
        <div class="body-right-box">
        <div class="new-student-box">
            <div class="text-new-student">
                <div class="bar-new-student"></div>
                <div class="text-new-student">  {idAlterando == 0 ? "Novo Aluno" : "Alterando Aluno" + idAlterando}   </div>
            </div>
            <div class="input-new-student"> 
                <div class="input-left">
                   <div class="agp-input"> 
                   
                    <div class="name-student"> Nome: </div>  
                    <div class="input"> <input type="text" value={nome} onChange={e => setNome(e.target.value)} /> </div>  
                </div> 
                <div class="agp-input">
                    <div class="number-student"> Chamada: </div>  
                    <div class="input"> <input type="text" value={chamada} onChange={e => setChamada(e.target.value)}/> </div> 

                   </div>
                </div>
                <div class="input-right">
                 <div class="agp-input">
                    <div class="corse-student"> Curso: </div>  
                    <div class="input"> <input type="text" value={curso} onChange={e => setCurso(e.target.value)}/> </div>  
                    </div>
                 <div class="agp-input">
                    <div class="class-student"> Turma: </div>  
                    <div class="input"> <input type="text" value={turma} onChange={e => setTurma(e.target.value)}/> </div> 
                    </div>
                </div>
                <div class="button-create"> <button onClick={inserir} > {idAlterando == 0 ? "Cadastrar" : "Alterar"} </button> </div>
            </div>
        </div>

        <div class="student-registered-box">
            <div class="row-bar"> 
                <div class= "bar-new-student"> </div>
                <div class="text-registered-student"> Alunos Matriculados </div>
            </div>
        
            <table class ="table-user">
                <thead>
                    <tr>
                        <th > ID </th>
                        <th> Nome </th>
                        <th> Chamada </th>
                        <th> Turma </th>
                        <th> Curso </th>
                        <th class="a"> </th>
                        <th class="a"> </th>
                    </tr>
                </thead>
        
                <tbody>

                    {alunos.map((item, i )=>
                        
                    <tr className=  { i % 2 == 0 ? "linha-alternada" : "" } >
                        <td> {item.id_matricula} </td>
                        <td title={item.nm_aluno}>
                        <td> {item.nm_aluno !=null && item.nm_aluno.length >= 25 
                              ? item.nm_aluno.substr(0, 25) + '...' 
                              : item.nm_aluno} </td>
                        </td>
                        <td title={item.nr_chamada}>
                        <td> {item.nr_chamada} </td>
                        </td>
                        <td title={item.nm_turma}>
                        <td> {item.nm_turma} </td>
                        </td>
                        <td title={item.nm_curso}>
                        <td > {item.nm_curso} </td>
                        </td>
                        <td className="coluna-acao"> <button onClick={() => editar(item)   }> <img src="./assets/images/edit.svg" alt="" height="30px"/> </button> </td>
                        <td className= "coluna-acao">   <button onClick={() => remover(item.id_matricula)   }> <img src="./assets/images/lixeira.svg" alt="" height="35px"/> </button> </td>
                    </tr>
                    )}
                    
                </tbody> 

            </table>
      
        </div>
    </div>
    </Conteudo>
</Container>
    )
}