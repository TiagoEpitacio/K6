import { group } from "k6";
import Login from "../request/Login.js";
import Produtos from "../request/Produtos.js";

export const options = {
    stages: [
        { duration: '10s', target: 1 },
        { duration: '2s', target: 1 },
        { duration: '1s', target: 0 }
    ],

    thresholds: {
        http_req_duration: ['p(99)<1500']
    }
}

export default function(){
    let login = new Login();
    let produtos = new Produtos();

    group('Realizar login', () => {
        login.access();
    })

    group('Listar produtos', ()=>{
        produtos.listar()
    })

    group('Adcionar produto', () =>{
        produtos.adicionar(login.getToken())
    })
}