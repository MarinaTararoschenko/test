import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-dialog-loading',
    templateUrl: './dialog-loading.component.html',
    styleUrls: ['./dialog-loading.component.scss']
})
export class DialogLoadingComponent implements OnInit {

    public couponsData = [
        {
            title: '0% de comisión',
            subtitle: 'Por 6 meses',
            desc: 'Recupera el 100% de la compra del terminal al recibir pagos con tarjeta con comisión 0%.',
            code: 'CEROCOMISION'
        }, {
            title: '$50.000',
            subtitle: 'de descuento',
            desc: 'Compra la máquina TUU por </br> <b>$129.900 antes $179.900.</b>',
            code: 'TUU50'
        }, {
            title: 'Prueba gratis',
            subtitle: 'Por 30 días',
            desc: 'Prueba la máquina TUU por 30 días sin costos ni compromisos, con envío gratis a todos Chile.',
            code: 'TUUPRUEBA'
        }
    ];


    constructor() { }

    ngOnInit(): void {
    }
}
