import { check } from "k6"
import http from "k6/http"




export default class Produtos{
    constructor(){
    }


    listar(){
        let params = {
            headers: {
              'accept': 'application/json',
              'Content-Type': 'application/json',
              'monitor': false,
            }
        }

        const resp = http.get('https://serverest.dev/produtos', params)

        check(resp, {
            'Status é 200': () => resp.status === 200
        });
    }


    adicionar(token){
        let payload = JSON.stringify({     
            nome: 'Carro' + Math.floor(Math.random() * 10000),
            preco: 154000,
            descricao:"Carro para corrida em interlagos",
            quantidade: 10
        })

        let params = {
            headers: {
              'accept': 'application/json',
              'Content-Type': 'application/json',
              'monitor': false,
              'Authorization': token
            }
        }

        const resp = http.post('https://serverest.dev/produtos',payload , params)

        check(resp,{
            'Status é 201': () => resp.status === 201
        });
    }
    
}