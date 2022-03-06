import axios, {AxiosError, AxiosPromise} from "axios";
import {Pallier, Product, World} from "./world";

export class Services {
    server = "https://isiscapitalist.kk.kurasawa.fr/"
    api = this.server + "adventureisis/generic";
    user = "";
    constructor(user: string) {
        this.user = user
    }
    private static handleError(error: AxiosError): AxiosPromise<any> {
        console.error('An error occurred', error.toJSON);
        return Promise.reject(error.message || error);
    }
    private static setHeaders(user : string) {
        return {
            "X-User": user
        }
    }
    getWorld(): AxiosPromise<World> {
        return axios({
            method: 'get',
            url: this.api + '/world',
            headers: Services.setHeaders(this.user)
        }).catch(Services.handleError)
    }
    deleteWord(): AxiosPromise<World> {
        return axios({
            method: 'delete',
            url: this.api + '/word',
            headers: Services.setHeaders(this.user),
        }).catch(Services.handleError)
    }
    putProduct(product : Product): AxiosPromise<World> {
        return axios({
            method: 'put',
            url: this.api + '/product',
            data : product,
            headers: Services.setHeaders(this.user),
        }).catch(Services.handleError)
    }
    putManager(manager : Pallier): AxiosPromise<World> {
        return axios({
            method: 'put',
            url: this.api + '/manager',
            data : manager,
            headers: Services.setHeaders(this.user),
        }).catch(Services.handleError)
    }
    putUpgrade(upgrade : Pallier): AxiosPromise<World> {
        return axios({
            method: 'put',
            url: this.api + '/upgrade',
            data : upgrade,
            headers: Services.setHeaders(this.user),
        }).catch(Services.handleError)
    }
    putAngelUpgrade(upgradeA : Pallier): AxiosPromise<World> {
        return axios({
            method: 'put',
            url: this.api + '/angelupgrade',
            data : upgradeA,
            headers: Services.setHeaders(this.user),
        }).catch(Services.handleError)
    }
}