import { Component, Input, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { MenuItem } from 'primeng/primeng';
import { AppMainComponent } from './app.main.component';
import {
    NgbModalConfig,
    NgbModal,
    NgbActiveModal
} from "@ng-bootstrap/ng-bootstrap";
@Component({
    selector: 'app-menu',
    template: `
        <ul app-submenu [item]="model" root="true" class="clarodx-menu clarodx-main-menu clearfix"
            [reset]="reset" visible="true" parentActive="true"></ul>
    `
})
export class AppMenuComponent implements OnInit {

    @Input() reset: boolean;

    model: any[];

    constructor(public app: AppMainComponent) { }

    ngOnInit() {
        this.model = [
            { label: 'Inicio', icon: 'home', routerLink: ['/'] }
            //     ,
            //     {label: 'La Mejor Oferta para Tu Cliente', icon: 'check_circle_outline', routerLink: ['/bestoffer']
            //  }
        ];
    }

    changeTheme(theme) {
        const themeLink: HTMLLinkElement = document.getElementById('theme-css') as HTMLLinkElement;
        const layoutLink: HTMLLinkElement = document.getElementById('layout-css') as HTMLLinkElement;

        themeLink.href = 'assets/theme/theme-' + theme + '.css';
        layoutLink.href = 'assets/layout/css/layout-' + theme + '.css';
    }
}

@Component({
    /* tslint:disable:component-selector */
    selector: '[app-submenu]',
    /* tslint:enable:component-selector */
    template: `
        <ng-template ngFor let-child let-i="index" [ngForOf]="(root ? item : item.items)">
            <li [ngClass]="{'active-menuitem': isActive(i)}" [class]="child.badgeStyleClass" *ngIf="child.visible === false ? false : true">
                <a [href]="child.url||'#'" (click)="itemClick($event,child,i)" (mouseenter)="onMouseEnter(i)"
                   class="ripplelink" *ngIf="!child.routerLink"
                    [attr.tabindex]="!visible ? '-1' : null" [attr.target]="child.target">
                    <i *ngIf="child.icon" class="material-icons">{{child.icon}}</i>
                    <span>{{child.label}}</span>
                    <span class="menuitem-badge" *ngIf="child.badge">{{child.badge}}</span>
                    <i class="material-icons submenu-icon" *ngIf="child.items">keyboard_arrow_down</i>
                </a>

                <a (click)="itemClick($event,child,i)" (mouseenter)="onMouseEnter(i)" class="ripplelink" *ngIf="child.routerLink"
                    [routerLink]="child.routerLink" routerLinkActive="active-menuitem-routerlink"
                   [routerLinkActiveOptions]="{exact: true}" [attr.tabindex]="!visible ? '-1' : null" [attr.target]="child.target">
                    <i *ngIf="child.icon" class="material-icons">{{child.icon}}</i>
                    <span>{{child.label}}</span>
                    <span class="menuitem-badge" *ngIf="child.badge">{{child.badge}}</span>
                    <i class="material-icons submenu-icon" *ngIf="child.items">keyboard_arrow_down</i>
                </a>
                <div class="layout-menu-tooltip">
                    <div class="layout-menu-tooltip-arrow"></div>
                    <div class="layout-menu-tooltip-text">{{child.label}}</div>
                </div>
                <ul app-submenu [item]="child" *ngIf="child.items" [visible]="isActive(i)" [reset]="reset" [parentActive]="isActive(i)"
                    [@children]="(app.isSlim()||app.isHorizontal())&&root ? isActive(i) ?
                    'visible' : 'hidden' : isActive(i) ? 'visibleAnimated' : 'hiddenAnimated'"></ul>
            </li>

            <div class="layout-breadcrumb-options noFloat" *ngIf="loginActive">
                <a  title="Cerrar sesi??n" href="javascript:void(0);" (click)="open(content)"  ><i class="material-icons">power_settings_new</i><span>Cerrar sesi??n</span></a>
            </div>
        </ng-template>
        <ng-template #content let-modal>
            <div class="modal-body">
                <div>
                    ??Est?? seguro que desea cerrar sesi??n?
                </div>
            </div>
            <div class="modal-footer" style="justify-content: center;">
                <button _ngcontent-rqh-c167="" type="button" pbutton="" label="Info" (click)="closeModal()"
                class="ui-button-info ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only"
                style="margin-right: .25em;min-width: 8em;max-width: 8em;font-size: 1em;height: 2.143em;font-family: &quot;Roboto&quot;, &quot;Helvetica Neue&quot;, sans-serif;border: 1px solid;border-radius: 3px;padding: 6px 15px;font-size: 15px;display: inline-flex;margin-top: 20px;margin-bottom: 5px;width: initial;text-align: center;max-width: initial;min-width: initial;color: #1f98af;text-decoration: none;background-color: #ffff;box-shadow: none;">

                    <span
                    class="ui-button-text ui-clickable" style="padding: 0;line-height: 1.143em;">Cancelar</span><span
                    class="ink ripple-animate"
                    style="height: 112px; width: 112px; top: -20.6px; left: 615px; pointer-events: none;"></span></button>

                <a class="ui-button" style='background-color: #428d98!important;margin-right: .25em;min-width: 8em;height: 2.143em;font-family: "Roboto", "Helvetica Neue", sans-serif;margin-top: 15px;line-height: 31px;'
                    href="javascript:void(0)" (click)="app.logout($event);modal.close()">
                    <span style="color: #fff;">Cerrar sesi??n</span>
                    <span class="loader ng-hide" ng-show="loading"></span>
                </a>
            </div>
        </ng-template>
    `,
    animations: [
        trigger('children', [
            state('hiddenAnimated', style({
                height: '0px'
            })),
            state('visibleAnimated', style({
                height: '*'
            })),
            state('visible', style({
                height: '*',
                'z-index': 100
            })),
            state('hidden', style({
                height: '0px',
                'z-index': '*'
            })),
            transition('visibleAnimated => hiddenAnimated', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)')),
            transition('hiddenAnimated => visibleAnimated', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)'))
        ])
    ]
})
export class AppSubMenuComponent {

    @Input() item: MenuItem;

    @Input() root: boolean;

    @Input() visible: boolean;

    _reset: boolean;

    _parentActive: boolean;

    activeIndex: number;
    loginActive: boolean;
    constructor(public app: AppMainComponent, config: NgbModalConfig, private modalService: NgbModal, public activeModal: NgbActiveModal) {
        this.loginActive = JSON.parse(localStorage.getItem("token"));
        config.backdrop = "static";
        config.keyboard = true;
        config.centered = true;
        config.container = "body";
    }
    open(content) {
        this.modalService.open(content);
    }
    closeModal() {
        this.modalService.dismissAll();
    }

    itemClick(event: Event, item: MenuItem, index: number) {
        if (this.root) {
            this.app.menuHoverActive = !this.app.menuHoverActive;
        }

        // avoid processing disabled items
        if (item.disabled) {
            event.preventDefault();
            return true;
        }

        // activate current item and deactivate active sibling if any
        this.activeIndex = (this.activeIndex === index && this.root) ? null : index;

        // execute command
        if (item.command) {
            item.command({ originalEvent: event, item });
        }

        // prevent hash change
        if (item.items || (!item.url && !item.routerLink)) {
            setTimeout(() => {
                this.app.layoutMenuScrollerViewChild.moveBar();
            }, 450);
            event.preventDefault();
        }

        // hide menu
        if (!item.items) {
            if (this.app.isHorizontal() || this.app.isSlim()) {
                this.app.resetMenu = true;
            } else {
                this.app.resetMenu = false;
            }

            this.app.overlayMenuActive = false;
            this.app.staticMenuMobileActive = false;
            this.app.menuHoverActive = !this.app.menuHoverActive;
        }
    }

    onMouseEnter(index: number) {
        if (this.root && this.app.menuHoverActive && (this.app.isHorizontal() || this.app.isSlim())
            && !this.app.isMobile() && !this.app.isTablet()) {
            this.activeIndex = index;
        }
    }

    isActive(index: number): boolean {
        return this.activeIndex === index;
    }

    @Input() get reset(): boolean {
        return this._reset;
    }

    set reset(val: boolean) {
        this._reset = val;

        if (this._reset && (this.app.isHorizontal() || this.app.isSlim())) {
            this.activeIndex = null;
        }
    }

    @Input() get parentActive(): boolean {
        return this._parentActive;
    }

    set parentActive(val: boolean) {
        this._parentActive = val;

        if (!this._parentActive) {
            this.activeIndex = null;
        }
    }
}
