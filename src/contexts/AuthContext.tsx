import { createContext, ReactNode, useState } from "react"

import UsuarioLogin from "../models/UsuarioLogin"
import { login } from "../services/Services"

interface AuthContextProps {
    usuario: UsuarioLogin
    handleLogout(): void
    handleLogin(usuario: UsuarioLogin): Promise<void>
    isLoading: boolean
}
/*
    Context Api 
    É uma forma de centralizar/armazenar e gerenciar informações
    e estados em apenas um lugar, depois podemos compartilhar
    com todos os componentes da aplicação 
*/

// Esta informando que o AuthProviderProps vai receber Children do tipo 
//ReactNode
interface AuthProviderProps {
    children: ReactNode
}

//Criamos o contexto e definimos o modelo de dados que serão gravados
export const AuthContext = createContext({} as AuthContextProps)

//AuthProvider vai acessar o contexto e vai manipular o contexto
//Context é o armazem
//AuthProvider é a transportadora dos dados

// Children representa qualquer elemento que pode ser renderizado 
export function AuthProvider({ children }: AuthProviderProps) {

    //Variavel de estado, que sempre sera observada
    // Usuario obrigatoriamente pertence a UsuarioLogin
    // Temos que chamar todos os componentes de UsuarioLogin
    const [usuario, setUsuario] = useState<UsuarioLogin>({
        id: 0,
        nome: "",
        usuario: "",
        senha: "",
        foto: "",
        token: ""
    })
    
    // Processo de fazer o login
    // useState variavel de estado sempre precisa ser inicializada 
    //  
    const [isLoading, setIsLoading] = useState(false)

    /* handleLogin é uma função assincrona e espera uma resposta para não ter um 
     falso positivo
     handleLogin 
      */
    async function handleLogin(userLogin: UsuarioLogin) {
        setIsLoading(true)
        //O end-point '/usuarios/logar' precisa de das informações do usuario login
        // E vai verificar se os dados batem para realizar o login

        try {
            await login(`/usuarios/logar`, userLogin, setUsuario)
            alert("Usuário logado com sucesso")
            setIsLoading(false)

        } catch (error) {
            console.log(error)
            alert("Dados do usuário inconsistentes")
            setIsLoading(false)
        }
    }
    // handleLogout vai deixar as informações do usuario vazias 
    function handleLogout() {
        setUsuario({
            id: 0,
            nome: "",
            usuario: "",
            senha: "",
            foto: "",
            token: ""
        })
    }
    //AuthContext vai prover os valores de {Usuario, handleLogin, hangleLogout, isLoaging}
    return (
        <AuthContext.Provider value={{ usuario, handleLogin, handleLogout, isLoading }}>
            {children}
        </AuthContext.Provider>
    )
}

