import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

// detalle: "Empieza a disfrutar de todos los beneficios de ser miembro Claro video &#10; Por sólo $6,39 Servicio Mensual (Incluido impuestos) &#10; 1 Mes Gratis Exclusivo Clientes Claro &#10; Paga con cargo a tu Factura Claro Fijo o Factura Claro Móvil CONECEL S.A. Si eres cliente móvil prepago <br> el costo del servicio será descontado de tu saldo.",
      
export class ClaroVideoOfferService {
  private offers:Offer[] = [
    {
      id:3,
      nombre:"HBO",
      img: "assets/images/claroVideo/hbo.jpg",          
      detalle: "Empieza a disfrutar de todos los beneficios de ser miembro Claro video  <br> Por sólo $6,39 Servicio Mensual (Incluido impuestos) <br> 1 Mes Gratis Exclusivo Clientes Claro  <br> Paga con cargo a tu Factura Claro Fijo o Factura Claro Móvil CONECEL S.A. <br> Si eres cliente móvil prepago <br> el costo del servicio será descontado de tu saldo.",
      detalle2: "Empieza a disfrutar de todos los beneficios de ser miembro Claro video  <br> Por sólo $6,39 Servicio Mensual (Incluido impuestos) <br> 1 Mes Gratis Exclusivo Clientes Claro  <br> Paga con cargo a tu Factura Claro Fijo o Factura Claro Móvil CONECEL S.A. <br> Si eres cliente móvil prepago <br> el costo del servicio será descontado de tu saldo.",
      valor: 6 
    }  ,
    {
      id:1,
      nombre:"CLARO VIDEO",
      img: "assets/images/claroVideo/claroVideoBlack.png",      
      detalle: "Empieza a disfrutar de todos los beneficios de ser miembro Claro video  <br> Por sólo $6,39 Servicio Mensual (Incluido impuestos) <br> 1 Mes Gratis Exclusivo Clientes Claro  <br> Paga con cargo a tu Factura Claro Fijo o Factura Claro Móvil CONECEL S.A. <br> Si eres cliente móvil prepago <br> el costo del servicio será descontado de tu saldo.",
      detalle2: "Empieza a disfrutar de todos los beneficios de ser miembro Claro video  <br> Por sólo $6,39 Servicio Mensual (Incluido impuestos) <br> 1 Mes Gratis Exclusivo Clientes Claro  <br> Paga con cargo a tu Factura Claro Fijo o Factura Claro Móvil CONECEL S.A. <br> Si eres cliente móvil prepago <br> el costo del servicio será descontado de tu saldo.",
      valor: 6 
    }
  ]; 
   private allOffers:Offer[] = [
    {
      id:1,
      nombre:"CLARO VIDEO",
      img: "assets/images/claroVideo/claroVideoBlack.png",      
      detalle: "Empieza a disfrutar de todos los beneficios de ser miembro Claro video  <br> Por sólo $6,39 Servicio Mensual (Incluido impuestos) <br> 1 Mes Gratis Exclusivo Clientes Claro  <br> Paga con cargo a tu Factura Claro Fijo o Factura Claro Móvil CONECEL S.A. <br> Si eres cliente móvil prepago <br> el costo del servicio será descontado de tu saldo.",
      detalle2: "Empieza a disfrutar de todos los beneficios de ser miembro Claro video \n Por sólo $6,39 Servicio Mensual (Incluido impuestos) \n 1 Mes Gratis Exclusivo Clientes Claro  <br> Paga con cargo a tu Factura Claro Fijo o Factura Claro Móvil CONECEL S.A. <br> Si eres cliente móvil prepago <br> el costo del servicio será descontado de tu saldo.",
      valor: 6 
    } ,
    {
      
      id:2,
      nombre:"NOGGIN",
      img: "assets/images/claroVideo/noggin.png",      
      detalle: "Empieza a disfrutar de todos los beneficios de ser miembro Claro video  <br> Por sólo $6,39 Servicio Mensual (Incluido impuestos) <br> 1 Mes Gratis Exclusivo Clientes Claro  <br> Paga con cargo a tu Factura Claro Fijo o Factura Claro Móvil CONECEL S.A. <br> Si eres cliente móvil prepago <br> el costo del servicio será descontado de tu saldo.",
      detalle2: "Empieza a disfrutar de todos los beneficios de ser miembro Claro video  <br> Por sólo $6,39 Servicio Mensual (Incluido impuestos) <br> 1 Mes Gratis Exclusivo Clientes Claro  <br> Paga con cargo a tu Factura Claro Fijo o Factura Claro Móvil CONECEL S.A. <br> Si eres cliente móvil prepago <br> el costo del servicio será descontado de tu saldo.",
      valor: 7 
    } , 
    {
      id:3,
      nombre:"HBO",
      img: "assets/images/claroVideo/hbo.jpg",          
      detalle: "Empieza a disfrutar de todos los beneficios de ser miembro Claro video  <br> Por sólo $6,39 Servicio Mensual (Incluido impuestos) <br> 1 Mes Gratis Exclusivo Clientes Claro  <br> Paga con cargo a tu Factura Claro Fijo o Factura Claro Móvil CONECEL S.A. <br> Si eres cliente móvil prepago <br> el costo del servicio será descontado de tu saldo.",
      detalle2: "Empieza a disfrutar de todos los beneficios de ser miembro Claro video  <br> Por sólo $6,39 Servicio Mensual (Incluido impuestos) <br> 1 Mes Gratis Exclusivo Clientes Claro  <br> Paga con cargo a tu Factura Claro Fijo o Factura Claro Móvil CONECEL S.A. <br> Si eres cliente móvil prepago <br> el costo del servicio será descontado de tu saldo.",

      valor: 8.99
    } ,
    {
      id:4,
      nombre:"FOX",
      img: "assets/images/claroVideo/fox.jpg",      
      detalle: "Empieza a disfrutar de todos los beneficios de ser miembro Claro video  <br> Por sólo $6,39 Servicio Mensual (Incluido impuestos) <br> 1 Mes Gratis Exclusivo Clientes Claro  <br> Paga con cargo a tu Factura Claro Fijo o Factura Claro Móvil CONECEL S.A. <br> Si eres cliente móvil prepago <br> el costo del servicio será descontado de tu saldo.",
      detalle2: "Empieza a disfrutar de todos los beneficios de ser miembro Claro video  <br> Por sólo $6,39 Servicio Mensual (Incluido impuestos) <br> 1 Mes Gratis Exclusivo Clientes Claro  <br> Paga con cargo a tu Factura Claro Fijo o Factura Claro Móvil CONECEL S.A. <br> Si eres cliente móvil prepago <br> el costo del servicio será descontado de tu saldo.",
      valor: 6 
    }
  ];
  constructor() { }


  getOffers():Offer[]{
    return this.offers;
  }
  
  getAllOffers():Offer[]{
    return this.allOffers;
  }

  getOffer(idx):Offer{

    for( let i = 0; i < this.allOffers.length; i ++ ){

      let offer = this.allOffers[i];

      if( offer.id == idx  ){
        return offer;
      }

    }
  }
  
}

export interface Offer{
  nombre: string;
  img: string;
  id: number;
  detalle: string;
  valor: number;
  detalle2:string;
  idx?: number;
};



