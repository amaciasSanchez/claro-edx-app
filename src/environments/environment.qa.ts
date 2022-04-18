// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=qa` then `environment.qa.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.

export const environment = {
    production: true,
    topicIdClaroVideo: 26,
    topicIdClaroUP:22,
    topicIdClaroIpTv: 32,
    topicIdClaroOTT: 28,
    claroOtt: {
        url: '',
        token: '',
        local: '',
        offers: 'https://edx.conecel.com:4001/ocp-silver/incubadora-ott-web-bff/enterprise/eai/clarodxp/v1.0/offers',
        profiles: 'https://edx.conecel.com:4001/ocp-silver/incubadora-ott-web-bff/enterprise/eai/clarodxp/v1.0/profiles',
        validateEmail: 'https://edx.conecel.com:4001/ocp-silver/incubadora-ott-web-bff/enterprise/eai/clarodxp/v1.0/profiles/claroId'
    },
    claroIpTv: {
        url: 'http://edx-clarovideo-webbff.okd-apps.conecel.com/enterprise/eai/clarodxp/v1.0',
        local: 'http://192.168.100.43:8212/enterprise/eai/clarodxp/v1.0',
        token: '',
        serviceBffUrl: 'http://edx-clarovideo-webbff.okd-apps.conecel.com/chatbot/v1/chat/',
        busClienteBffUrl: 'https://edx.conecel.com:4001/ocp-silver/incubadora-edx-iptv-webbff/enterprise/iptv/v1.0/getCivilRegisterInfo',
        bestOfferBffUrl: 'https://edx.conecel.com:4001/ocp-silver/incubadora-edx-iptv-webbff/enterprise/iptv/v1.0/getBestOffer',
        enterClaroIDDataUrl: 'https://edx.conecel.com:4001/ocp-silver/incubadora-edx-iptv-webbff/enterprise/iptv/v1.0/enterClaroIDData',
        instantiateBusinessProcessBffUrl: 'https://edx.conecel.com:4001/ocp-silver/incubadora-edx-iptv-webbff/enterprise/iptv/v1.0/instantiateBusinessProcess',
        confirmBestOfferUrl: 'https://edx.conecel.com:4001/ocp-silver/incubadora-edx-iptv-webbff/enterprise/iptv/v1.0/confirmBestOffer',
        getCustomOffersUrl: 'https://edx.conecel.com:4001/ocp-silver/incubadora-edx-iptv-webbff/enterprise/iptv/v1.0/getCustomOffers',
        confirmCustomOfferUrl: 'https://edx.conecel.com:4001/ocp-silver/incubadora-edx-iptv-webbff/enterprise/iptv/v1.0/confirmCustomOffer',
        getPaymentMethodsUrl: 'https://edx.conecel.com:4001/ocp-silver/incubadora-edx-iptv-webbff/enterprise/iptv/v1.0/getPaymentMethods',
        confirmPaymentMethodUrl: 'https://edx.conecel.com:4001/ocp-silver/incubadora-edx-iptv-webbff/enterprise/iptv/v1.0/confirmPaymentMethod',
        getDevicesToInstallUrl: 'https://edx.conecel.com:4001/ocp-silver/incubadora-edx-iptv-webbff/enterprise/iptv/v1.0/getDevicesToInstall',
        confirmDevicesToInstallUrl: 'https://edx.conecel.com:4001/ocp-silver/incubadora-edx-iptv-webbff/enterprise/iptv/v1.0/confirmDevicesToInstall',
        getInstallationAddressUrl: 'https://edx.conecel.com:4001/ocp-silver/incubadora-edx-iptv-webbff/enterprise/iptv/v1.0/getInstallationAddresses',
        confirmInstallationAdressesUrl: 'https://edx.conecel.com:4001/ocp-silver/incubadora-edx-iptv-webbff/enterprise/iptv/v1.0/confirmInstallationAddress',
        getAvailableDatesUrl: 'https://edx.conecel.com:4001/ocp-silver/incubadora-edx-iptv-webbff/enterprise/iptv/v1.0/getAvailableDates',
        confirmAvailableDatesUrl: 'https://edx.conecel.com:4001/ocp-silver/incubadora-edx-iptv-webbff/enterprise/iptv/v1.0/confirmAvailableDate',
        getVariablesByProcessInstanceIdUrl: 'https://edx.conecel.com:4001/ocp-silver/incubadora-edx-iptv-webbff/enterprise/iptv/v1.0/getVariablesByProcessInstanceId',
        getProcessInstanceByCorrelationKeyUrl: 'https://edx.conecel.com:4001/ocp-silver/incubadora-edx-iptv-webbff/enterprise/iptv/v1.0/getProcessInstanceByCorrelationKey',
        confirmProductOrder: 'https://edx.conecel.com:4001/ocp-silver/incubadora-edx-iptv-webbff/enterprise/iptv/v1.0/confirmProductOrder',
        correlationKeySeparator: '_',
        bpmName: 'bpm-iptv-sale'
    },
    claroVideo: {
        url: 'https://edx.conecel.com:4001/ocp-silver/incubadora-edx-clarovideo-webbff/enterprise/eai/clarodxp/v1.0',
        local: 'http://192.168.100.43:8212/enterprise/eai/clarodxp/v1.0',
        token: '',
        serviceURL: 'https://edx.conecel.com:4001/ocp-silver/incubadora-edx-chatbot-webbff/chatbot/v1/chat/'
    },
    optimus: {
        urlapi: 'https://edx.conecel.com:4001/ocp-silver/incubadora-edx-payments-webbff/edx-digitalpayment/api/',
        urlapiLogin: 'https://edx.conecel.com:4001/ocp-silver/incubadora-edx-payments-webbff/edx-digitalpayment/api/'
    },
    claroUp: {
        url: "https://edx.conecel.com:4001/ocp-silver/incubadora-edx-claroup-webbff/enterprise/eai/clarodxp/v1.0",
        local: "http://10.38.10.13:8210/enterprise/eai/clarodxp/v1.0",
        token: '',
        serviceURL: 'https://claroedx.conecel.com/ocp-silver/edx-chatbot-webbff/chatbot/v1/chat/',
        claroSignatureUrl: 'https://signature.claro.com.ec/SignatureAPI_ONE/transaccion/print/postventa/',
    },
    billing: {
        url: 'https://edx.conecel.com:4001/ocp-silver/incubadora-edx-billing-webbff/enterprise/eai/clarodxp/v1.0',
        local: 'http://192.168.100.43:8212/enterprise/eai/clarodxp/v1.0',
        token: '',
        serviceURL: 'http://edx-clarovideo-webbff.okd-apps.conecel.com/chatbot/v1/chat/'
    },
	b2e: {
        b2eURL: "https://edx.conecel.com:4001/ocp-silver/incubadora-edx-register-webbff/enterprise/eai/claroedx/v1.0",
        url: "http://192.168.37.146:8210/enterprise/eai/clarodxp/v1.0",
        local: "http://192.168.100.43:8210/enterprise/eai/clarodxp/v1.0",
        token: '',
        serviceURL: 'https://edx.conecel.com:4001/ocp-silver/incubadora-edx-chatbot-webbff/chatbot/v1/chat/',

    },
    IDP: {
        issuer: 'https://edx.conecel.com/ocp-auth-silver/auth/realms/DigitalExperience',
        clientId: 'edx-app',
        responseType: 'code',
        secret: 'b60293aa-e8ea-4b9f-b25c-3e91d3aa94d1',
        requireHttps: true,
        tokenEndpoint: 'https://edx.conecel.com/ocp-auth-silver/auth/realms/DigitalExperience/protocol/openid-connect/token',
        userinfoEndpoint: 'https://edx.conecel.com/ocp-auth-silver/auth/realms/DigitalExperience/protocol/openid-connect/userinfo',
        realm: 'DigitalExperience',
        url:''
      
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