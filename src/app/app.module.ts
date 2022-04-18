import { LOCALE_ID, NgModule, APP_INITIALIZER } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HashLocationStrategy, LocationStrategy, registerLocaleData } from '@angular/common';
import { AppRoutes } from './app.routes';

import { DialogflowService } from './claro-video/chatbot/services';
import { MessageFormComponent, MessageItemComponent, MessageListComponent } from './claro-video/chatbot/components';

import { AccordionModule } from 'primeng/accordion';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CardModule } from 'primeng/card';
import { CarouselModule } from 'primeng/carousel';
import { ChartModule } from 'primeng/chart';
import { CheckboxModule } from 'primeng/checkbox';
import { ChipsModule } from 'primeng/chips';
import { CodeHighlighterModule } from 'primeng/codehighlighter';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ColorPickerModule } from 'primeng/colorpicker';
import { ContextMenuModule } from 'primeng/contextmenu';
import { DataViewModule } from 'primeng/dataview';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { EditorModule } from 'primeng/editor';
import { FieldsetModule } from 'primeng/fieldset';
import { FileUploadModule } from 'primeng/fileupload';
import { FullCalendarModule } from 'primeng/fullcalendar';
import { GalleriaModule } from 'primeng/galleria';
// import { GrowlModule } from 'primeng/growl';
import { InplaceModule } from 'primeng/inplace';
import { InputMaskModule } from 'primeng/inputmask';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { LightboxModule } from 'primeng/lightbox';
import { ListboxModule } from 'primeng/listbox';
import { MegaMenuModule } from 'primeng/megamenu';
import { MenuModule } from 'primeng/menu';
import { MenubarModule } from 'primeng/menubar';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { MultiSelectModule } from 'primeng/multiselect';
import { OrderListModule } from 'primeng/orderlist';
import { OrganizationChartModule } from 'primeng/organizationchart';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { PaginatorModule } from 'primeng/paginator';
import { PanelModule } from 'primeng/panel';
import { PanelMenuModule } from 'primeng/panelmenu';
import { PasswordModule } from 'primeng/password';
import { PickListModule } from 'primeng/picklist';
import { ProgressBarModule } from 'primeng/progressbar';
import { RadioButtonModule } from 'primeng/radiobutton';
import { RatingModule } from 'primeng/rating';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { SelectButtonModule } from 'primeng/selectbutton';
import { SlideMenuModule } from 'primeng/slidemenu';
import { SliderModule } from 'primeng/slider';
import { SpinnerModule } from 'primeng/spinner';
import { SplitButtonModule } from 'primeng/splitbutton';
import { StepsModule } from 'primeng/steps';
import { TabMenuModule } from 'primeng/tabmenu';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';
import { TerminalModule } from 'primeng/terminal';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { ToastModule } from 'primeng/toast';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { ToolbarModule } from 'primeng/toolbar';
import { TooltipModule } from 'primeng/tooltip';
import { TreeModule } from 'primeng/tree';
import { TreeTableModule } from 'primeng/treetable';
import { VirtualScrollerModule } from 'primeng/virtualscroller';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { BlockUIModule } from 'primeng/blockui';

import { AppComponent } from './app.component';
import { AppMainComponent } from './app.main.component';
import { AppNotfoundComponent } from './claro-video/pages/app.notfound.component';
import { AppErrorComponent } from './claro-video/pages/app.error.component';
import { AppAccessdeniedComponent } from './claro-video/pages/app.accessdenied.component';
import { AppLoginComponent } from './claro-video/pages/app.login.component';
import { AppMenuComponent, AppSubMenuComponent } from './app.menu.component';
import { AppTopbarComponent } from './app.topbar.component';
import { AppFooterComponent } from './app.footer.component';
import { AppBreadcrumbComponent } from './app.breadcrumb.component';
import { AppRightpanelComponent } from './app.rightpanel.component';
import { AppInlineProfileComponent } from './app.profile.component';
import { HomeComponent } from './claro-video/claroup/view/home.component';
import { BestofferComponent } from './claro-video/claroup/view/bestoffer.component';
import { RegisterComponent } from './claro-video/claroup/view/register.component';


import { BreadcrumbService } from './breadcrumb.service';
import { AuthGuardService } from './claro-video/claroup/service/auth-guard.service';
import { AuthService } from './claro-video/claroup/service/auth.service';


import { NgxUsefulSwiperModule } from 'ngx-useful-swiper';
import { OfferDetailComponent } from './claro-video/offer-detail/offer-detail.component';
import { NgbdModalContent, PersonalizarOfertaComponent } from './claro-video/personalizar-oferta/personalizar-oferta.component';
import { VistaTresSesentaComponent } from './claro-video/vista-tres-sesenta/vista-tres-sesenta.component';
import { ProductosServiciosComponent } from './claro-video/productos-servicios/productos-servicios.component';
import { BestofferViewComponent } from './claro-video/bestoffer-view/bestoffer-view.component';
import { ContentViewTresSesentaComponent } from './claro-video/content-view-tres-sesenta/content-view-tres-sesenta.component';
import { ErrorMessageComponent } from './claro-video/error-message/error-message.component';
import { P1CliValoresPendientesComponent } from './deuda-corriente/p1-cli-valores-pendientes/p1-cli-valores-pendientes.component';
import { P2CliMovimientosComponent } from './deuda-corriente/p2-cli-movimientos/p2-cli-movimientos.component';
import { P3CliPagosRealizadosComponent } from './deuda-corriente/p3-cli-pagos-realizados/p3-cli-pagos-realizados.component';
import { P4CliAcuerdosPagoComponent } from './deuda-corriente/p4-cli-acuerdos-pago/p4-cli-acuerdos-pago.component';
import { P5CliAcuerdosComponent } from './deuda-corriente/p5-cli-acuerdos/p5-cli-acuerdos.component';
import { P6CliEstadoCuentaComponent } from './deuda-corriente/p6-cli-estado-cuenta/p6-cli-estado-cuenta.component';
import { ChatbotViewComponent } from './claro-video/chatbot-view/chatbot-view.component';
import localePy from '@angular/common/locales/es-EC';
import { NgbActiveModal, NgbModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { MenubotComponent } from './claro-video/chatbot-view/menubot/menubot.component';
import { ClaroIdComponent } from './claro-video/claro-id/claro-id.component';
import { SliderAppComponent } from './claro-video/slider-app/slider-app.component';
import { ClaroVideoMinOfferComponent } from './claro-video/claro-video-min-offer/claro-video-min-offer.component';
import { ClaroVideoAllOfferComponent } from './claro-video/claro-video-all-offer/claro-video-all-offer.component';
import { ClaroVideoBestPayComponent } from './claro-video/claro-video-best-pay/claro-video-best-pay.component';


import { ItemsProcessBpmComponent } from './claro-video/items-process-bpm/items-process-bpm.component';
import { PopoverMsgComponent } from './claro-video/popover-msg/popover-msg.component';
import { LetPopoverMsgComponent } from './claro-video/let-popover-msg/let-popover-msg.component';
import { ClaroVideoDevicesComponent } from './claro-video/claro-video-devices/claro-video-devices.component';
import { ClaroVideoAlertDeviceComponent } from './claro-video/claro-video-alert-device/claro-video-alert-device.component';
import { HeaderProcessComponent } from './claro-video/header-process/header-process.component';
import { FlujoActualClaroVideoComponent } from './claro-video/flujo-actual-claro-video/flujo-actual-claro-video.component';
import { ServiciosContratadosComponent } from './claro-video/servicios-contratados/servicios-contratados.component';
import { ListaServiciosComponent } from './claro-video/lista-servicios/lista-servicios.component';
import { GridServiciosComponent } from './claro-video/grid-servicios/grid-servicios.component';
import { PersonalInformationProcessComponent } from './claro-video/personal-information-process/personal-information-process.component';
import { PersonalInformationProcessComponentLite } from './claro-video/personal-information-process-lite/personal-information-process-lite.component';
import { ClaroVideoPayComponent } from './claro-video/claro-video-pay/claro-video-pay.component';
import { BtnVolverVistaComponent } from './claro-video/btn-volver-vista/btn-volver-vista.component';
import { ClaroVideoStandaloneComponent } from './claro-video/claro-video-standalone/claro-video-standalone.component';
import { BtnVolverBusquedaClienteComponent } from './claro-video/btn-volver-busqueda-cliente/btn-volver-busqueda-cliente.component';
import { MensajeServicioComponent } from './claro-video/mensaje-servicio/mensaje-servicio.component';
import { MensajeBusquedaClienteComponent } from './claro-video/mensaje-busqueda-cliente/mensaje-busqueda-cliente.component';
import { MensajeInfoServicioComponent } from './claro-video/mensaje-info-servicio/mensaje-info-servicio.component';
import { BtnVerFlujoComponent } from './claro-video/btn-ver-flujo/btn-ver-flujo.component';
import { ClaroVideoModalProcesoComponent } from './claro-video/claro-video-modal-proceso/claro-video-modal-proceso.component';
import { ItemProcessStandaloneComponent } from './claro-video/item-process-standalone/item-process-standalone.component';
import { ModalInfoBundleComponent } from './claro-video/modal-info-bundle/modal-info-bundle.component';
import { AllProcessComponent } from './claro-video/all-process/all-process.component';
import { ModalResultBundleComponent } from './claro-video/modal-result-bundle/modal-result-bundle.component';
import { ClaroVideoInactivacionComponent } from './claro-video/claro-video-inactivacion/claro-video-inactivacion.component';
import { ClaroVideoEditarClaroIdComponent } from './claro-video/claro-video-editar-claro-id/claro-video-editar-claro-id.component';
import { ClaroVideoConsumosComponent } from './claro-video/claro-video-consumos/claro-video-consumos.component';
import { ClaroVideoOrdenesComponent } from './claro-video/claro-video-ordenes/claro-video-ordenes.component';
import { ClaroVideoMetodoPagoComponent } from './claro-video/claro-video-metodo-pago/claro-video-metodo-pago.component';
import { ClaroVideoGestionClaroidComponent } from './claro-video/claro-video-gestion-claroid/claro-video-gestion-claroid.component';
import { ClaroVideoModalClaroIdComponent } from './claro-video/claro-video-modal-claro-id/claro-video-modal-claro-id.component';
import { ClaroVideoActivacionBonusComponent } from './claro-video/claro-video-activacion-bonus/claro-video-activacion-bonus.component';
import { ClaroVideoFlujoInactivacionComponent } from './claro-video/claro-video-flujo-inactivacion/claro-video-flujo-inactivacion.component';
import { BuscarClienteComponent } from './claro-video/buscar-cliente/buscar-cliente.component';
import { ActivarOfertaComponent } from './claro-video/activar-oferta/activar-oferta.component';
import { ClaroVideoOfferComponent } from './claro-video/claro-video-offer/claro-video-offer.component';
import { BundleProcessComponent } from './claro-video/bundle-process/bundle-process.component';
import { ClaroVideoAlertComponent } from './claro-video/claro-video-alert/claro-video-alert.component';
import { ClaroVideoOfferService } from './claro-video/claro-video-offer/claro-video-offer.service';
import { ClaroVideoProductoServiciosComponent } from './claro-video/claro-video-producto-servicios/claro-video-producto-servicios.component';
import { ClaroVideoModalValidacionesComponent } from './claro-video/claro-video-modal-validaciones/claro-video-modal-validaciones.component';
import { PrincipalComponent } from './optimus/pages/principal/principal.component';
import { FileviewerComponent } from './optimus/components/fileviewer/fileviewer.component';
import { NavbarComponent } from './optimus/components/navbar/navbar.component';
import { ViewFilesComponent } from './optimus/pages/view-files/view-files.component';
import { OptimusConfig001Component } from './optimus/pages/optimus-config001/optimus-config001.component';
import { OptimusConfig002Component } from './optimus/pages/optimus-config002/optimus-config002.component';
import { BackToBottomComponent } from './optimus/components/back-to-bottom/back-to-bottom.component';
import { FinancebarComponent } from './optimus/components/financebar/financebar.component';
import { Home2ecsComponent } from './optimus/pages/home2ecs/home2ecs.component';
import { CheckInComponent } from './optimus/pages/check-in/check-in.component';
import { EntidadesComponent } from './optimus/pages/entidades/entidades.component';
import { TarjetasComponent } from './optimus/pages/tarjetas/tarjetas.component';
import { ResumenComponent } from './optimus/pages/resumen/resumen.component';
import { ResumenTarjetasComponent } from './optimus/pages/resumen-tarjetas/resumen-tarjetas.component';
import { RedirectMenuComponent } from './optimus/pages/redirect-menu/redirect-menu.component';
import { ClaroUpPersonService } from './claro-up/services/personservice';
import { B2emenuComponent } from './b2e/pages/b2emenu/b2emenu.component';
import { B2eRegisterComponent } from './b2e/pages/b2e-register/b2e-register.component';
import { B2eQrcodeComponent } from './b2e/pages/b2e-qrcode/b2e-qrcode.component';
import { B2eSuccessComponent } from './b2e/pages/b2e-success/b2e-success.component';
import { KeyboardShortcutsModule } from 'ng-keyboard-shortcuts';

import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { environment } from 'src/environments/environment';
import { AuthInterceptor } from './security/auth.interceptor';
import { ModalMessageComponent } from './modal-message/modal-message.component';
import { initializer } from './security/initi-auth';
import { KeycloakService } from 'keycloak-angular';
import { OAuthModule } from 'angular-oauth2-oidc';
import { UpdatePasswordComponent } from './security/update-password/update-password.component';
import { PinManagementComponent } from './security/pin-management/pin-management.component';
import { NgSpinKitModule } from 'ng-spin-kit';
import { IconInterpreterPipe } from './pipes/icon-interpreter/icon-interpreter.pipe';
import { ClaroIpTvRegistroComponent } from './claro-video/claro-ip-tv-registro/claro-ip-tv-registro.component';
import { ClaroIpTvMinOfferComponent } from './claro-video/claro-ip-tv-min-offer/claro-ip-tv-min-offer.component';
import { ClaroIpTvAllOfferComponent } from './claro-video/claro-ip-tv-all-offer/claro-ip-tv-all-offer.component';
import { ClaroIpTvOfferComponent } from './claro-video/claro-ip-tv-offer/claro-ip-tv-offer.component';
import { ClaroIpTvBestPayComponent } from './claro-video/claro-ip-tv-best-pay/claro-ip-tv-best-pay.component';
import { ClaroIpTvDeviceComponent } from './claro-video/claro-ip-tv-device/claro-ip-tv-device.component';
import { ClaroIpTvAdrressComponent } from './claro-video/claro-ip-tv-adrress/claro-ip-tv-adrress.component';
import { ClaroIpTvInstalDateComponent } from './claro-video/claro-ip-tv-instal-date/claro-ip-tv-instal-date.component';
import { ClaroIpTvSummaryComponent } from './claro-video/claro-ip-tv-summary/claro-ip-tv-summary.component';
import { IptvService } from './b2e/claroup/service/iptv.service';
import { ClaroIpTvModalComponent } from './claro-video/claro-ip-tv-modal/claro-ip-tv-modal.component';
import { ClaroIpTvAlertComponent } from './claro-video/claro-ip-tv-alert/claro-ip-tv-alert.component';
import { ClaroIpTvAlertSuccessfulComponent } from './claro-video/claro-ip-tv-alert-successful/claro-ip-tv-alert-successful.component';
import { ClaroIpTvPopUpComponent } from './claro-video/claro-ip-tv-pop-up/claro-ip-tv-pop-up.component';
import { OttSinCajaComponent } from './ott/ott-sin-caja/ott-sin-caja.component';
import { OttDatosPersonalesComponent } from './ott/ott-datos-personales/ott-datos-personales.component';
import { OttOffersComponent } from './ott/ott-offers/ott-offers.component';
import { OttConfirmacionComponent } from './ott/ott-confirmacion/ott-confirmacion.component';
import { AppClaroOttAlertSuccess } from './ott/app-claro-ott-alert-success/app-claro-ott-alert-success.component';
import { LabelMaskPipe } from './pipes/label-mask/label-mask.pipe';
import { ClaroVideoTableDeviceTrackingComponent } from "./claro-video/claro-video-table-device-tracking/claro-video-table-device-tranking.component"

registerLocaleData(localePy, 'es');

@NgModule({
    imports: [
        BrowserModule,
        KeyboardShortcutsModule.forRoot(),
        FormsModule,
        AppRoutes,
        HttpClientModule,
        BrowserAnimationsModule,
        AccordionModule,
        AutoCompleteModule,
        BreadcrumbModule,
        ButtonModule,
        CalendarModule,
        CardModule,
        CarouselModule,
        ChartModule,
        CheckboxModule,
        ChipsModule,
        CodeHighlighterModule,
        ConfirmDialogModule,
        ColorPickerModule,
        ContextMenuModule,
        DataViewModule,
        DialogModule,
        DropdownModule,
        EditorModule,
        FieldsetModule,
        FileUploadModule,
        FullCalendarModule,
        GalleriaModule,
        // GrowlModule,
        InplaceModule,
        InputMaskModule,
        InputSwitchModule,
        InputTextModule,
        InputTextareaModule,
        LightboxModule,
        ListboxModule,
        MegaMenuModule,
        MenuModule,
        MenubarModule,
        MessageModule,
        MessagesModule,
        MultiSelectModule,
        OrderListModule,
        OrganizationChartModule,
        OverlayPanelModule,
        PaginatorModule,
        PanelModule,
        PanelMenuModule,
        PasswordModule,
        PickListModule,
        ProgressBarModule,
        RadioButtonModule,
        RatingModule,
        ScrollPanelModule,
        SelectButtonModule,
        SlideMenuModule,
        SliderModule,
        SpinnerModule,
        SplitButtonModule,
        StepsModule,
        TableModule,
        TabMenuModule,
        TabViewModule,
        TerminalModule,
        TieredMenuModule,
        ToastModule,
        ToggleButtonModule,
        ToolbarModule,
        TooltipModule,
        TreeModule,
        TreeTableModule,
        VirtualScrollerModule,
        NgxUsefulSwiperModule,
        ProgressSpinnerModule,
        AngularFontAwesomeModule,
        BlockUIModule,
        NgbModule,
        NgSpinKitModule,
        NgbTooltipModule,
        OAuthModule.forRoot({
            resourceServer: {
                allowedUrls: [
                    environment.claroVideo.url,
                    environment.claroUp.url,
                    environment.billing.url
                ], sendAccessToken: false
            }
        }),
        ReactiveFormsModule,
        NgbModule
    ],
    declarations: [
        ClaroVideoTableDeviceTrackingComponent,

        AppComponent,
        AppMainComponent,
        AppMenuComponent,
        AppSubMenuComponent,
        AppTopbarComponent,
        AppFooterComponent,
        AppBreadcrumbComponent,
        AppRightpanelComponent,
        AppInlineProfileComponent,
        HomeComponent,
        BestofferComponent,
        RegisterComponent,
        AppNotfoundComponent,
        AppErrorComponent,
        AppAccessdeniedComponent,
        AppLoginComponent,
        OfferDetailComponent,
        PersonalizarOfertaComponent,
        BuscarClienteComponent,
        VistaTresSesentaComponent,
        ProductosServiciosComponent,
        BestofferViewComponent,
        ActivarOfertaComponent,
        ContentViewTresSesentaComponent,
        ErrorMessageComponent,
        P1CliValoresPendientesComponent,
        P2CliMovimientosComponent,
        P3CliPagosRealizadosComponent,
        P4CliAcuerdosPagoComponent,
        P5CliAcuerdosComponent,
        P6CliEstadoCuentaComponent,
        NgbdModalContent,
        ChatbotViewComponent,
        MessageListComponent,
        MessageFormComponent,
        MessageItemComponent,
        MenubotComponent,
        ClaroIdComponent,
        SliderAppComponent,
        ClaroVideoMinOfferComponent,
        ClaroVideoAllOfferComponent,
        ClaroVideoOfferComponent,
        ClaroVideoBestPayComponent,
        BundleProcessComponent,
        ItemsProcessBpmComponent,
        PopoverMsgComponent,
        LetPopoverMsgComponent,
        ClaroVideoAlertComponent,
        ClaroVideoDevicesComponent,
        ClaroVideoAlertDeviceComponent,
        HeaderProcessComponent,
        FlujoActualClaroVideoComponent,
        ServiciosContratadosComponent,
        ListaServiciosComponent,
        GridServiciosComponent,
        PersonalInformationProcessComponent,
        PersonalInformationProcessComponentLite,
        ClaroVideoPayComponent,
        BtnVolverVistaComponent,
        ClaroVideoStandaloneComponent,
        BtnVerFlujoComponent,
        ClaroVideoProductoServiciosComponent,
        ClaroVideoModalProcesoComponent,
        BtnVolverBusquedaClienteComponent,
        MensajeServicioComponent,
        MensajeBusquedaClienteComponent,
        MensajeInfoServicioComponent,
        ClaroVideoModalValidacionesComponent,
        ItemProcessStandaloneComponent,
        ModalInfoBundleComponent,
        AllProcessComponent,
        ModalResultBundleComponent,
        ClaroVideoInactivacionComponent,
        ClaroVideoEditarClaroIdComponent,
        ClaroVideoConsumosComponent,
        ClaroVideoOrdenesComponent,
        ClaroVideoMetodoPagoComponent,
        ClaroVideoGestionClaroidComponent,
        ClaroVideoModalClaroIdComponent,
        ClaroVideoActivacionBonusComponent,
        ClaroVideoFlujoInactivacionComponent,
        PrincipalComponent,
        FileviewerComponent,
        NavbarComponent,
        ViewFilesComponent,
        OptimusConfig001Component,
        OptimusConfig002Component,
        HomeComponent,
        BackToBottomComponent,
        Home2ecsComponent,
        FinancebarComponent,
        RedirectMenuComponent,
        EntidadesComponent,
        TarjetasComponent,
        ResumenComponent,
        ResumenTarjetasComponent,
        CheckInComponent,
        AppLoginComponent,
        AppErrorComponent,
        IconInterpreterPipe,
        B2emenuComponent,
        B2eRegisterComponent,
        B2eQrcodeComponent,
        B2eSuccessComponent,
        ModalMessageComponent,
        UpdatePasswordComponent,
        PinManagementComponent,
        ClaroIpTvRegistroComponent,
        ClaroIpTvMinOfferComponent,
        ClaroIpTvAllOfferComponent,
        ClaroIpTvOfferComponent,
        ClaroIpTvBestPayComponent,
        ClaroIpTvDeviceComponent,
        ClaroIpTvAdrressComponent,
        ClaroIpTvInstalDateComponent,
        ClaroIpTvSummaryComponent,
        ClaroIpTvModalComponent,
        ClaroIpTvAlertComponent,
        ClaroIpTvAlertSuccessfulComponent,
        ClaroIpTvPopUpComponent,
        OttSinCajaComponent,
        OttDatosPersonalesComponent,
        OttOffersComponent,
        OttConfirmacionComponent,
        AppClaroOttAlertSuccess,
        LabelMaskPipe
    ],
    providers: [
        { provide: LocationStrategy, useClass: HashLocationStrategy },
        { provide: LOCALE_ID, useValue: 'es-EC' },
        NgbActiveModal,
        ClaroVideoOfferService, ClaroUpPersonService,
        BreadcrumbService, AuthGuardService, AuthService, DialogflowService,
        IptvService, 
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
        /*{
            provide: APP_INITIALIZER,
            useFactory: initializer,
            deps: [KeycloakService],
            multi: true
        },
        KeycloakService*/
    ],
    bootstrap: [AppComponent],
    entryComponents: [ContentViewTresSesentaComponent, NgbdModalContent, AppSubMenuComponent]
})
export class AppModule { }
