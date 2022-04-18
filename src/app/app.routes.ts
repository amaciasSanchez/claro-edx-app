import { ClaroIpTvSummaryComponent } from './claro-video/claro-ip-tv-summary/claro-ip-tv-summary.component';
import { ClaroIpTvInstalDateComponent } from './claro-video/claro-ip-tv-instal-date/claro-ip-tv-instal-date.component';
import { ClaroIpTvAdrressComponent } from './claro-video/claro-ip-tv-adrress/claro-ip-tv-adrress.component';
import { ClaroIpTvDeviceComponent } from './claro-video/claro-ip-tv-device/claro-ip-tv-device.component';
import { ClaroIpTvMinOfferComponent } from './claro-video/claro-ip-tv-min-offer/claro-ip-tv-min-offer.component';
import { ClaroIpTvRegistroComponent } from './claro-video/claro-ip-tv-registro/claro-ip-tv-registro.component';
import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { HomeComponent } from './claro-video/claroup/view/home.component';
import { BestofferComponent } from './claro-video/claroup/view/bestoffer.component';
import { RegisterComponent } from './claro-video/claroup/view/register.component';
import { AppMainComponent } from './app.main.component';
import { AppNotfoundComponent } from './claro-video/pages/app.notfound.component';
import { AppErrorComponent } from './claro-video/pages/app.error.component';
import { AppAccessdeniedComponent } from './claro-video/pages/app.accessdenied.component';
import { AppLoginComponent } from './claro-video/pages/app.login.component';

import { ChatbotViewComponent } from './claro-video/chatbot-view/chatbot-view.component';
import { MenubotComponent } from './claro-video/chatbot-view/menubot/menubot.component';
import { ClaroIdComponent } from './claro-video/claro-id/claro-id.component';

import { AuthGuardService as AuthGuard } from './claro-video/claroup/service/auth-guard.service';
import { ClaroVideoMinOfferComponent } from './claro-video/claro-video-min-offer/claro-video-min-offer.component';
import { ClaroVideoAllOfferComponent } from './claro-video/claro-video-all-offer/claro-video-all-offer.component';
import { ClaroVideoBestPayComponent } from './claro-video/claro-video-best-pay/claro-video-best-pay.component';

import { ClaroVideoDevicesComponent } from './claro-video/claro-video-devices/claro-video-devices.component';
import { FlujoActualClaroVideoComponent } from './claro-video/flujo-actual-claro-video/flujo-actual-claro-video.component';
import { ServiciosContratadosComponent } from './claro-video/servicios-contratados/servicios-contratados.component';
import { ClaroVideoPayComponent } from './claro-video/claro-video-pay/claro-video-pay.component';
import { ClaroVideoStandaloneComponent } from './claro-video/claro-video-standalone/claro-video-standalone.component';
import { AllProcessComponent } from './claro-video/all-process/all-process.component';
import { ClaroVideoInactivacionComponent } from './claro-video/claro-video-inactivacion/claro-video-inactivacion.component';
import { ClaroVideoEditarClaroIdComponent } from './claro-video/claro-video-editar-claro-id/claro-video-editar-claro-id.component';
import { ClaroVideoConsumosComponent } from './claro-video/claro-video-consumos/claro-video-consumos.component';
import { ClaroVideoOrdenesComponent } from './claro-video/claro-video-ordenes/claro-video-ordenes.component';
import { ClaroVideoMetodoPagoComponent } from './claro-video/claro-video-metodo-pago/claro-video-metodo-pago.component';
import { ClaroVideoGestionClaroidComponent } from './claro-video/claro-video-gestion-claroid/claro-video-gestion-claroid.component';
import { ClaroVideoActivacionBonusComponent } from './claro-video/claro-video-activacion-bonus/claro-video-activacion-bonus.component';
import { ClaroVideoFlujoInactivacionComponent } from './claro-video/claro-video-flujo-inactivacion/claro-video-flujo-inactivacion.component';
import { BundleProcessComponent } from './claro-video/bundle-process/bundle-process.component';
import { ClaroVideoProductoServiciosComponent } from './claro-video/claro-video-producto-servicios/claro-video-producto-servicios.component';
import { Home2ecsComponent } from './optimus/pages/home2ecs/home2ecs.component';
import { RedirectMenuComponent } from './optimus/pages/redirect-menu/redirect-menu.component';
import { CheckInComponent } from './optimus/pages/check-in/check-in.component';
import { PrincipalComponent } from './optimus/pages/principal/principal.component';
import { ViewFilesComponent } from './optimus/pages/view-files/view-files.component';
import { EntidadesComponent } from './optimus/pages/entidades/entidades.component';
import { TarjetasComponent } from './optimus/pages/tarjetas/tarjetas.component';
import { ResumenComponent } from './optimus/pages/resumen/resumen.component';
import { ResumenTarjetasComponent } from './optimus/pages/resumen-tarjetas/resumen-tarjetas.component';
import { OptimusConfig001Component } from './optimus/pages/optimus-config001/optimus-config001.component';
import { OptimusConfig002Component } from './optimus/pages/optimus-config002/optimus-config002.component';
import { B2eRegisterComponent } from './b2e/pages/b2e-register/b2e-register.component';
import { B2eQrcodeComponent } from './b2e/pages/b2e-qrcode/b2e-qrcode.component';
import { B2eSuccessComponent } from './b2e/pages/b2e-success/b2e-success.component';
import { UpdatePasswordComponent } from './security/update-password/update-password.component';
import { PinManagementComponent } from './security/pin-management/pin-management.component';
import { P1CliValoresPendientesComponent } from './deuda-corriente/p1-cli-valores-pendientes/p1-cli-valores-pendientes.component';
import { P2CliMovimientosComponent } from './deuda-corriente/p2-cli-movimientos/p2-cli-movimientos.component';
import { P5CliAcuerdosComponent } from './deuda-corriente/p5-cli-acuerdos/p5-cli-acuerdos.component';
import { P3CliPagosRealizadosComponent } from './deuda-corriente/p3-cli-pagos-realizados/p3-cli-pagos-realizados.component';
import { P4CliAcuerdosPagoComponent } from './deuda-corriente/p4-cli-acuerdos-pago/p4-cli-acuerdos-pago.component';
import { P6CliEstadoCuentaComponent } from './deuda-corriente/p6-cli-estado-cuenta/p6-cli-estado-cuenta.component';
import { ClaroIpTvAllOfferComponent } from './claro-video/claro-ip-tv-all-offer/claro-ip-tv-all-offer.component';
import { ClaroIpTvBestPayComponent } from './claro-video/claro-ip-tv-best-pay/claro-ip-tv-best-pay.component';
import { OttSinCajaComponent } from './ott/ott-sin-caja/ott-sin-caja.component';
import { OttDatosPersonalesComponent } from './ott/ott-datos-personales/ott-datos-personales.component';
import { OttOffersComponent } from './ott/ott-offers/ott-offers.component';
import { OttConfirmacionComponent } from './ott/ott-confirmacion/ott-confirmacion.component';

export const routes: Routes = [
    {
        path: '', component: AppMainComponent,
        children: [
            { path: '', component: HomeComponent, canActivate: [AuthGuard] },
            { path: 'iptvregister', component: ClaroIpTvRegistroComponent, canActivate: [AuthGuard] }, // dreyes
            { path: 'iptvminoffer', component: ClaroIpTvMinOfferComponent, canActivate: [AuthGuard] }, // dreyes
            { path: 'iptvalloffer', component: ClaroIpTvAllOfferComponent, canActivate: [AuthGuard] }, // dreyes
            { path: 'iptvbestpay', component: ClaroIpTvBestPayComponent, canActivate: [AuthGuard] }, // dreyes
            { path: 'iptvdevice', component: ClaroIpTvDeviceComponent, canActivate: [AuthGuard] }, // dreyes
            { path: 'iptvadrress', component: ClaroIpTvAdrressComponent, canActivate: [AuthGuard] }, // dreyes
            { path: 'iptvinsdate', component: ClaroIpTvInstalDateComponent, canActivate: [AuthGuard] }, // dreyes
            { path: 'iptvsummary', component: ClaroIpTvSummaryComponent, canActivate: [AuthGuard] }, // dreyes
            { path: 'bestoffer', component: BestofferComponent, canActivate: [AuthGuard] },
            { path: 'bestoffer/:pageView', component: BestofferComponent, canActivate: [AuthGuard] },
            { path: 'register', component: RegisterComponent, canActivate: [AuthGuard] },
            { path: 'menubot', component: MenubotComponent, canActivate: [AuthGuard] },
            { path: 'chatbot-view', component: ChatbotViewComponent, canActivate: [AuthGuard] },
            { path: 'min-offer', component: ClaroVideoMinOfferComponent, canActivate: [AuthGuard] },
            { path: 'all-offer', component: ClaroVideoAllOfferComponent, canActivate: [AuthGuard] },
            { path: 'best-pay/:id', component: ClaroVideoBestPayComponent, canActivate: [AuthGuard] },
            { path: 'claro-pay/:option', component: ClaroVideoPayComponent, canActivate: [AuthGuard] },
            { path: 'claro-id', component: ClaroIdComponent, canActivate: [AuthGuard] },
            { path: 'claro-bpm', component: AllProcessComponent, canActivate: [AuthGuard] }, //BundleProcessComponent
            { path: 'process-bundle', component: BundleProcessComponent, canActivate: [AuthGuard] },
            { path: 'claro-video-bpm', component: ClaroVideoStandaloneComponent, canActivate: [AuthGuard] },
            { path: 'flujo', component: FlujoActualClaroVideoComponent, canActivate: [AuthGuard] },
            { path: 'servicios/:subscription', component: ServiciosContratadosComponent, canActivate: [AuthGuard] },
            { path: 'dispositivos', component: ClaroVideoDevicesComponent, canActivate: [AuthGuard] },
            { path: 'claro-productos', component: ClaroVideoProductoServiciosComponent, canActivate: [AuthGuard] },
            { path: 'claro-inactivacion', component: ClaroVideoInactivacionComponent, canActivate: [AuthGuard] },
            { path: 'claro-editar', component: ClaroVideoEditarClaroIdComponent, canActivate: [AuthGuard] },
            { path: 'claro-consumo', component: ClaroVideoConsumosComponent, canActivate: [AuthGuard] },
            { path: 'claro-ordenes', component: ClaroVideoOrdenesComponent, canActivate: [AuthGuard] },
            { path: 'claro-metodo-pago', component: ClaroVideoMetodoPagoComponent, canActivate: [AuthGuard] },
            { path: 'claro-bonus', component: ClaroVideoActivacionBonusComponent, canActivate: [AuthGuard] },
            { path: 'claro-id-gestion', component: ClaroVideoGestionClaroidComponent, canActivate: [AuthGuard] },
            { path: 'flujo-inactivacion', component: ClaroVideoFlujoInactivacionComponent, canActivate: [AuthGuard] },
            //  { path: "", component: AppLoginComponent },
            // { path: "home", component: HomeComponent }, Desde Aqui OPTIMUS
            { path: "home2ecs", component: Home2ecsComponent, data: [], canActivate: [AuthGuard] },
            { path: "redirect-menu", component: RedirectMenuComponent, canActivate: [AuthGuard] },
            { path: "check-in", component: CheckInComponent, canActivate: [AuthGuard] },
            { path: "principal/:id", component: PrincipalComponent, canActivate: [AuthGuard] },
            { path: "view-files/:id", component: ViewFilesComponent, canActivate: [AuthGuard] },
            { path: "entidades", component: EntidadesComponent, canActivate: [AuthGuard] },
            { path: "tarjetas", component:TarjetasComponent, canActivate: [AuthGuard] },
            { path: "resumen/:id", component: ResumenComponent, canActivate: [AuthGuard] },
            { path: "resumen-tarjetas/:id", component: ResumenTarjetasComponent, canActivate: [AuthGuard] },
            { path: "optimus-config001", component: OptimusConfig001Component, canActivate: [AuthGuard] },
            { path: "optimus-config002", component: OptimusConfig002Component, canActivate: [AuthGuard] },
            // { path: "error", component: AppErrorComponent },
            //{ path: "**", pathMatch: "full", redirectTo: "error" },
            //b2e
            { path: "b2e-register", component: B2eRegisterComponent },
            { path: "b2e-qrcode", component: B2eQrcodeComponent },
            { path: "b2e-success", component: B2eSuccessComponent },
            { path: "setup-pin", component: PinManagementComponent, canActivate: [AuthGuard] },
            { path: "ott-metodo-pago", component: OttSinCajaComponent, canActivate: [AuthGuard] },
            { path: "ott-datos-personales", component: OttDatosPersonalesComponent, canActivate: [AuthGuard] },
            { path: "ofertasOtt", component: OttOffersComponent, canActivate: [AuthGuard] },
            { path: "ott-confirm", component: OttConfirmacionComponent, canActivate: [AuthGuard] }
        ],

    },
    { path: 'error', component: AppErrorComponent },
    { path: 'accessdenied', component: AppAccessdeniedComponent },
    { path: '404', component: AppNotfoundComponent },
    { path: 'login', component: AppLoginComponent },
    { path: "update-password", component: UpdatePasswordComponent, canActivate: [AuthGuard] },
    { path: "deudaClienteValorPendiente", component: P1CliValoresPendientesComponent },
    { path: "deudaClienteMovimientos/:subscription", component: P2CliMovimientosComponent },
    { path: "deudaClienteAcuerdos/:id", component: P5CliAcuerdosComponent },
    { path: "deudaClientePagos/:detail", component: P3CliPagosRealizadosComponent },
    { path: "deudaClienteAcuerdosDetail/:detail", component: P4CliAcuerdosPagoComponent },
    { path: "deudaEstadoCuenta/:subscription", component: P6CliEstadoCuentaComponent },
    { path: '**', redirectTo: '/404' },

];

export const AppRoutes: ModuleWithProviders = RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' });
