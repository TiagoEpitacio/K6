import http from 'k6/http';
import {check} from 'k6';

export default class Login{

    constructor() {
        this.params = {
          headers: {
            'accept': 'application/json',
            'Content-Type': 'application/json',
            'monitor': false,
          },
        };
        this.token = "";
      }

    access(){
        let payload = JSON.stringify({
            email: 'fulano@qa.com',
            password: 'teste'
          })
        const login = http.post('https://serverest.dev/login', payload,  this.params)
        this.token = login.json('authorization');

        check(login, {
            'Login realizado com sucesso': (r) => r.status === 200
        });
    }

    getToken(){
        return this.token;
    }
}