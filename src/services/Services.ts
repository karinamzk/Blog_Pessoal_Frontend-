import axios from "axios";

const api = axios.create({
    baseURL: 'https://blogpessoal-2gl1.onrender.com/'
})

export const login = async (url: string, dados: Object, setDados: Function) => {
    const resposta = await api.post(url, dados)
    setDados(resposta.data)
}

/*
    url= o end point
    dados= dados que seram enviados
    setdados=armazena os dados
*/

export const cadastrarUsuario = async(url: string, dados: Object, setDados: Function) => { 
    const resposta = await api.post(url,dados)
    setDados(resposta.data)
  }