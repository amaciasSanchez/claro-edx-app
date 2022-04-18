
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.

export const environment = {
    production: false,
    topicIdClaroVideo: 26,
    topicIdClaroUP:22,
    topicIdClaroIpTv: 32,
    topicIdClaroOTT: 33,
    claroOtt: {
        url: '',
        token: '',
        local: '',
        //http://ott-web-bff.openshift-apps.dev.conecel.com
        offers: 'http://ott-web-bff.openshift-apps.dev.conecel.com/enterprise/eai/clarodxp/v1.0/offers',
        profiles: 'http://ott-web-bff.openshift-apps.dev.conecel.com/enterprise/eai/clarodxp/v1.0/profiles',
        validateEmail: 'http://ott-web-bff.openshift-apps.dev.conecel.com/enterprise/eai/clarodxp/v1.0/profiles/claroId'
    },
    claroIpTv: {
        url: 'http://edx-clarovideo-webbff.okd-apps.conecel.com/enterprise/eai/clarodxp/v1.0',
        //url: 'http://localhost:8210/enterprise/eai/clarodxp/v1.0',//localhost
        local: 'http://192.168.100.43:8212/enterprise/eai/clarodxp/v1.0',
        token: '',
        serviceBffUrl: 'http://edx-clarovideo-webbff.okd-apps.conecel.com/chatbot/v1/chat/',
        busClienteBffUrl: 'https://edx.conecel.com/ocp-silver/edx-iptv-webbff/enterprise/iptv/v1.0/getCivilRegisterInfo',
        bestOfferBffUrl: 'https://edx.conecel.com/ocp-silver/edx-iptv-webbff/enterprise/iptv/v1.0/getBestOffer',
        enterClaroIDDataUrl: 'https://edx.conecel.com/ocp-silver/edx-iptv-webbff/enterprise/iptv/v1.0/enterClaroIDData',
        instantiateBusinessProcessBffUrl: 'https://edx.conecel.com/ocp-silver/edx-iptv-webbff/enterprise/iptv/v1.0/instantiateBusinessProcess',
        confirmBestOfferUrl: 'https://edx.conecel.com/ocp-silver/edx-iptv-webbff/enterprise/iptv/v1.0/confirmBestOffer',
        getCustomOffersUrl: 'https://edx.conecel.com/ocp-silver/edx-iptv-webbff/enterprise/iptv/v1.0/getCustomOffers',
        confirmCustomOfferUrl: 'https://edx.conecel.com/ocp-silver/edx-iptv-webbff/enterprise/iptv/v1.0/confirmCustomOffer',
        getPaymentMethodsUrl: 'https://edx.conecel.com/ocp-silver/edx-iptv-webbff/enterprise/iptv/v1.0/getPaymentMethods',
        confirmPaymentMethodUrl: 'https://edx.conecel.com/ocp-silver/edx-iptv-webbff/enterprise/iptv/v1.0/confirmPaymentMethod',
        getDevicesToInstallUrl: 'https://edx.conecel.com/ocp-silver/edx-iptv-webbff/enterprise/iptv/v1.0/getDevicesToInstall',
        confirmDevicesToInstallUrl: 'https://edx.conecel.com/ocp-silver/edx-iptv-webbff/enterprise/iptv/v1.0/confirmDevicesToInstall',
        getInstallationAddressUrl: 'https://edx.conecel.com/ocp-silver/edx-iptv-webbff/enterprise/iptv/v1.0/getInstallationAddresses',
        confirmInstallationAdressesUrl: 'https://edx.conecel.com/ocp-silver/edx-iptv-webbff/enterprise/iptv/v1.0/confirmInstallationAddress',
        getAvailableDatesUrl: 'https://edx.conecel.com/ocp-silver/edx-iptv-webbff/enterprise/iptv/v1.0/getAvailableDates',
        confirmAvailableDatesUrl: 'https://edx.conecel.com/ocp-silver/edx-iptv-webbff/enterprise/iptv/v1.0/confirmAvailableDate',
        getVariablesByProcessInstanceIdUrl: 'https://edx.conecel.com/ocp-silver/edx-iptv-webbff/enterprise/iptv/v1.0/getVariablesByProcessInstanceId',
        getProcessInstanceByCorrelationKeyUrl: 'https://edx.conecel.com/ocp-silver/edx-iptv-webbff/enterprise/iptv/v1.0/getProcessInstanceByCorrelationKey',
        confirmProductOrder: 'https://edx.conecel.com/ocp-silver/edx-iptv-webbff/enterprise/iptv/v1.0/confirmProductOrder',
        correlationKeySeparator: '_',
        bpmName: 'bpm-iptv-sale'
    },
    claroVideo: {
        //url: 'https://edx.conecel.com/ocp-silver/edx-clarovideo-webbff/enterprise/eai/clarodxp/v1.0',//prod?
        url: 'http://edx-clarovideo-webbff.openshift-apps.dev.conecel.com/enterprise/eai/clarodxp/v1.0',// dev
        //url: 'http://localhost:8210/enterprise/eai/clarodxp/v1.0',//localhost
        local: 'http://192.168.100.43:8212/enterprise/eai/clarodxp/v1.0',
        token: '',
        serviceURL: 'https://edx.conecel.com/ocp-silver/edx-chatbot-webbff/chatbot/v1/chat/'
    },
    optimus: {
        //urlapi: 'http://edx-payments-webbff.openshift-apps.dev.conecel.com/edx-digitalpayment/api/',
        urlapi: 'http://localhost:8210/edx-digitalpayment/api/',
        urlapiLogin: 'http://edx-payments-webbff.openshift-apps.dev.conecel.com/edx-digitalpayment/api/'
    }, 
    claroUp: {
        //url: "https://edx.conecel.com/ocp-silver/edx-claroup-webbff/enterprise/eai/clarodxp/v1.0",
        url: 'http://edx-claroup-webbff.openshift-apps.dev.conecel.com/enterprise/eai/clarodxp/v1.0',
        //url: 'http://localhost:8210/enterprise/eai/clarodxp/v1.0',
        local: "http://10.38.10.13:8211/enterprise/eai/clarodxp/v1.0",
        token: '',
        serviceURL: 'https://claroedx.conecel.com/ocp-silver/edx-chatbot-webbff/chatbot/v1/chat/',
        claroSignatureUrl: 'https://signature.claro.com.ec/SignatureAPI_ONE/transaccion/print/postventa/',
    },
    billing: {
        url: 'https://edx.conecel.com/ocp-silver/edx-billing-webbff/enterprise/eai/clarodxp/v1.0',
      //  url: 'http://localhost:8410/enterprise/eai/clarodxp/v1.0',
        local: 'http://192.168.100.43:8212/enterprise/eai/clarodxp/v1.0',
        token: '',
        serviceURL: 'http://edx-clarovideo-webbff.okd-apps.conecel.com/chatbot/v1/chat/'
    },
	b2e: {
        b2eURL: "https://edx.conecel.com/ocp-silver/edx-register-webbff/enterprise/eai/claroedx/v1.0",
        url: "http://192.168.37.146:8210/enterprise/eai/clarodxp/v1.0",
        local: "http://192.168.100.43:8210/enterprise/eai/clarodxp/v1.0",
        token: '',
        serviceURL: 'https://edx.conecel.com/ocp-silver/edx-chatbot-webbff/chatbot/v1/chat/',

    },
    IDP: {
        /* issuer: 'https://edx.conecel.com/ocp-auth-silver/auth/realms/DigitalExperience',
        clientId: 'edx-app',
        responseType: 'code',
        secret: 'b60293aa-e8ea-4b9f-b25c-3e91d3aa94d1',
        requireHttps: true,
        tokenEndpoint: 'https://edx.conecel.com/ocp-auth-silver/auth/realms/DigitalExperience/protocol/openid-connect/token',
        userinfoEndpoint: 'https://edx.conecel.com/ocp-auth-silver/auth/realms/DigitalExperience/protocol/openid-connect/userinfo',
        realm: 'DigitalExperience',
        url:'' */
        issuer: 'http://192.168.37.151:8181/auth/realms/EDX',
        clientId: 'edx-app',
        responseType: 'code',
        secret: '93238e23-b081-4e56-aee4-cb76f3f26e3d',
        requireHttps: false,
        realm: 'EDX',
        url: 'http://192.168.37.151:8181/auth',
        tokenEndpoint: 'http://192.168.37.151:8181/auth/realms/EDX/protocol/openid-connect/token',
        userinfoEndpoint: 'http://192.168.37.151:8181/auth/realms/EDX/protocol/openid-connect/userinfo',
 
      
    },
    IAMS: {
        url: 'http://10.31.32.13:8612/iams/v1',
        roles: "/user/info/Roles",
        clientID: 'iams-app',
        clientSecret: 'c6b973db-a472-4861-8b0c-ff534e4248da'
    },
    MESSAGES: {
        BUSQUEDA_CLIENTE: 101
    },
    login: false,
    timeOutActivation: 7000,
    perminRole: 'AbleToUnsuscribePERMIN',
    perminProductId: 'PERMIN'
};
