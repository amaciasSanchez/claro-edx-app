import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as moment from 'moment';
import { Subscription } from '../../customer/modelo/subscription.model';
import { ClaroUpPersonService } from 'src/app/claro-up/services/personservice'
import { SortEvent } from 'primeng/api';
import * as FileSaver from 'file-saver';
import jsPDF from "jspdf";
import "jspdf-autotable";
import { analyzeAndValidateNgModules } from '@angular/compiler';

interface TypeFilter {
    name: string,
    code: string
}

@Component({
    templateUrl: './claro-video-table-device-tracking.component.html',
    selector: 'app-claro-video-table-device-tracking',
    styleUrls: ['./claro-video-table-device-tracking.component.css']
})

export class ClaroVideoTableDeviceTrackingComponent implements OnInit {

    groupTypesFilter: TypeFilter[];
    selectedTypeFilter : TypeFilter = {name:'MES', code: 'month'};

    dateValue: Date = new Date();
    rangeDates: Date[];
    minDateValue : Date;

    // PARAMETROS PARA EL PAGINEO
    first = 0;
    rows = 10;
    last = 0;
    totalRecords : number;

    loading: boolean = true;

    activityValues: number[] = [0, 100];

    exportColumns: any[];

    cols: any[];
    _selectedColumns: any[];

    aProgressSpinner = false;
    isProcess = false;
    showSpinnerIcon : boolean = false;

    @Output() hideModalDialogTracking: EventEmitter<any> = new EventEmitter<any>();
    @Input() displayModalTracking;
    @Input() trackingData : Object[];
    @Input() subscription : Subscription;

    constructor(private service: ClaroUpPersonService) { }

    ngOnInit() {

        console.log(this.subscription);

        this.loading = false;

        this.cols = [
            { field: 'connectionDate', header: 'Fecha Conexión' },
            { field: 'province', header: 'Provincia' },
            { field: 'city', header: 'Ciudad' },
            { field: 'site', header: 'Sitio' },
            { field: 'radioBase', header: 'Radio Base' },
            { field: 'technology', header: 'Tecnología' },
            { field: 'locationId', header: 'Ubicación' }
        ];

        this.groupTypesFilter = [
            {name:'MES', code: 'month'},
            {name:'RANGO', code: 'range'}
        ]

        this._selectedColumns = this.cols;

        this.exportColumns = this.cols.map(col => ({title: col.header, dataKey: col.field}));

        // LIMITAMOS EL RANGO DE FECHA HASTA 6 MESES
        this.minDateValue = new Date();
        this.minDateValue.setMonth(new Date().getMonth() - 6);

        this.last = this.rows;
        this.totalRecords = this.trackingData.length;

    }


    /**
     * METODO QUE MANIPULA EL ORDENAMIENTO
     * @param event 
     */
    customSort(event: SortEvent) {
        event.data.sort((data1, data2) => {
            let value1 = data1[event.field];
            let value2 = data2[event.field];
            let result = null;

            if (value1 == null && value2 != null)
                result = -1;
            else if (value1 != null && value2 == null)
                result = 1;
            else if (value1 == null && value2 == null)
                result = 0;
            else if (typeof value1 === 'string' && typeof value2 === 'string')
                result = value1.localeCompare(value2);
            else
                result = (value1 < value2) ? -1 : (value1 > value2) ? 1 : 0;

            return (event.order * result);
        });
    }

    /* METODOS UTILIZADOS EN EL PAGINEO */
    next() {
        this.first = this.first + this.rows;
    }

    prev() {
        this.first = this.first - this.rows;
    }

    reset() {
        this.first = 0;
    }

    isLastPage(): boolean {
        return this.trackingData ? this.first === (this.trackingData.length - this.rows): true;
    }

    isFirstPage(): boolean {
        return this.trackingData ? this.first === 0 : true;
    }


    /* METODO PARA EL SELECTOR DE COLUMNAS */
    @Input() get selectedColumns(): any[] {
        return this._selectedColumns;
    }

    set selectedColumns(val: any[]) {
        //restore original order
        this._selectedColumns = this.cols.filter(col => val.includes(col));
    }

    actionCloseTrackingTable() {
        console.log('Cerrando popup Tracking...');
        this.displayModalTracking = false;
        this.hideModalDialogTracking.emit({
            closeOverlay: true,
        });
        this.selectedTypeFilter = {name:'MES', code: 'month'};

    }

    exportPdf() {
        const doc = new jsPDF('l', 'mm', [305, 250]);
        doc['autoTable'](this.exportColumns, this.trackingData);
        doc.save('Device-Tracking-Data.pdf');
    }

    exportExcel() {
        import("xlsx").then(xlsx => {
            const worksheet = xlsx.utils.json_to_sheet(this.getTrackingDataByExcel());
            const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
            const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
            this.saveAsExcelFile(excelBuffer, "Device-Tracking-Data");
        });
    }

    saveAsExcelFile(buffer: any, fileName: string): void {
        let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
        let EXCEL_EXTENSION = '.xlsx';
        const data: Blob = new Blob([buffer], {
            type: EXCEL_TYPE
        });
        FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
    }

    /**
     * @author fobregon
     */
    searchTracking() : void {

        this.showSpinnerIcon = true;

        let startDate : string;
        let endDate : string;

        const dateFormat : string = "DD-MM-YYYY";

        if (this.selectedTypeFilter.code==='month'){
            let lastDayOfMonth = new Date(this.dateValue.getFullYear(), this.dateValue.getMonth()+1, 0);

            startDate =   moment(this.dateValue).format(dateFormat);
            endDate = moment(lastDayOfMonth).format(dateFormat);

        }
        else if (this.selectedTypeFilter.code==='range'){
            startDate = moment(this.rangeDates[0]).format(dateFormat);
            endDate = moment(this.rangeDates[this.rangeDates.length -1]).format(dateFormat);
        }

        console.log("Desde: ", startDate);
        console.log("Hasta: ",  endDate)

        this.service.getTrackingByDevice(
            this.subscription.subscriptionInformation.serviceNumber,
            startDate,
            endDate
        ).subscribe(
            data => {
                this.trackingData = data;
                this.showSpinnerIcon = false;
                console.log("presentando modal");

                this.last = this.rows;
                this.totalRecords = this.trackingData.length;
            },
            error => {
                this.showSpinnerIcon = false;
                console.error("Ocurrió un error mientras se consultaba el tracking por dispositivo: ", error);
            }
        );
    }

   /**
    * METODO PARA AJUSTAR EL NOMBRE DE CABECERA 
    * PARA EL REPORTE DE EXCEL
    * @returns 
    */
    getTrackingDataByExcel() : any[] {
        let customTrackingData : any[] = [];
        let data : Object = new Object()
        this.trackingData.forEach(element => {
            //console.log(element)
            this.cols.forEach(header =>{
                data[header['header']] = element[header['field']];
            })
            console.log(data)
            customTrackingData.push(data);
            data = new Object();
        });

        console.log(customTrackingData)
        return customTrackingData;
    }

}
