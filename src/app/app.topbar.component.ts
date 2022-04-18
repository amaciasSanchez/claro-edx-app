import {Component} from '@angular/core';
import {AppMainComponent} from './app.main.component';

@Component({
    selector: 'app-topbar',
    template: `
        <div class="topbar clearfix">
            <div class="topbar-left">
                <div class="logo" [routerLink]="['/']"></div>
            </div>

            <div class="topbar-right">
                <ul class="topbar-items animated fadeInDown" [ngClass]="{'topbar-items-visible': app.topbarMenuActive}">
                    <li #profile class="profile-item" *ngIf="app.profileMode==='top'||app.isHorizontal()"
                        [ngClass]="{'active-top-menu':app.activeTopbarItem === profile}" style="margin-right: 20px;">


                        <!--button type="submit" (click)="app.logout()" style="font-size: 13px; height: 35px"
                                class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-icon-left">
                            <span aria-hidden="true" class="ui-button-icon-left ui-clickable ui-icon-exit-to-app"></span>
                            <span class="ui-button-text ui-clickable">Cerrar Sesión</span>
                        </button-->

                        <a href="#" (click)="app.onTopbarSubItemClick($event);app.logout($event)"
                           style="color:#ffffff; margin-top:10px">
                            <i class="material-icons"
                               style="top: 25px;position: fixed;left: ;">power_settings_new</i>
                            <span style="padding-left: 25px;">Cerrar Sesion</span>
                        </a>

                        
                        <!--a href="#" (click)="app.onTopbarItemClick($event,profile)">
                            <i class="ui-icon-input icon-perfil"></i>
                            <span class="topbar-item-name">Jane Williams</span>
                        </a-->

                        <!--ul class="clarodx-menu animated fadeInDown"-->
                        <!--li role="menuitem">
                            <a href="#" (click)="app.onTopbarSubItemClick($event)">
                                <i class="material-icons">person</i>
                                <span>Profile</span>
                            </a>
                        </li>
                        <li role="menuitem">
                            <a href="#" (click)="app.onTopbarSubItemClick($event)">
                                <i class="material-icons">security</i>
                                <span>Privacy</span>
                            </a>
                        </li>
                        <li-- role="menuitem">
                            <a href="#" (click)="app.onTopbarSubItemClick($event)">
                                <i class="material-icons">settings_applications</i>
                                <span>Settings</span>
                            </a>
                        </li-->
                        <!--li role="menuitem">
                            <a href="#" (click)="app.onTopbarSubItemClick($event);app.logout($event)">
                                <i class="material-icons">power_settings_new</i>
                                <span>Cerrar Sesion</span>
                            </a>
                        </li>
                    </ul>
                </li-->
                        <!--li #settings [ngClass]="{'active-top-menu':app.activeTopbarItem === settings}">
                            <a href="#" (click)="app.onTopbarItemClick($event,settings)">
                                <i class="topbar-icon material-icons">settings</i>
                                <span class="topbar-item-name">Settings</span>
                            </a>
                            <ul class="clarodx-menu animated fadeInDown">
                                <li role="menuitem">
                                    <a href="#" (click)="app.onTopbarSubItemClick($event)">
                                        <i class="material-icons">palette</i>
                                        <span>Change Theme</span>
                                    </a>
                                </li>
                                <li role="menuitem">
                                    <a href="#" (click)="app.onTopbarSubItemClick($event)">
                                        <i class="material-icons">favorite_border</i>
                                        <span>Favorites</span>
                                    </a>
                                </li>
                                <li role="menuitem">
                                    <a href="#" (click)="app.onTopbarSubItemClick($event)">
                                        <i class="material-icons">lock</i>
                                        <span>Lock Screen</span>
                                    </a>
                                </li>
                                <li role="menuitem">
                                    <a href="#" (click)="app.onTopbarSubItemClick($event)">
                                        <i class="material-icons">wallpaper</i>
                                        <span>Wallpaper</span>
                                    </a>
                                </li>
                            </ul>
                        </li-->
                        <!--li #messages [ngClass]="{'active-top-menu':app.activeTopbarItem === messages}">
                            <a href="#" (click)="app.onTopbarItemClick($event,messages)">
                                <i class="topbar-icon material-icons animated swing">message</i>
                                <span class="topbar-badge animated rubberBand">5</span>
                                <span class="topbar-item-name">Messages</span>
                            </a>
                            <ul class="clarodx-menu animated fadeInDown">
                                <li role="menuitem">
                                    <a href="#" class="topbar-message" (click)="app.onTopbarSubItemClick($event)">
                                        <img src="assets/layout/images/avatar1.png" width="35"/>
                                        <span>Give me a call</span>
                                    </a>
                                </li>
                                <li role="menuitem">
                                    <a href="#" class="topbar-message" (click)="app.onTopbarSubItemClick($event)">
                                        <img src="assets/layout/images/avatar2.png" width="35"/>
                                        <span>Sales reports attached</span>
                                    </a>
                                </li>
                                <li role="menuitem">
                                    <a href="#" class="topbar-message" (click)="app.onTopbarSubItemClick($event)">
                                        <img src="assets/layout/images/avatar3.png" width="35"/>
                                        <span>About your invoice</span>
                                    </a>
                                </li>
                                <li role="menuitem">
                                    <a href="#" class="topbar-message" (click)="app.onTopbarSubItemClick($event)">
                                        <img src="assets/layout/images/avatar2.png" width="35"/>
                                        <span>Meeting today at 10pm</span>
                                    </a>
                                </li>
                                <li role="menuitem">
                                    <a href="#" class="topbar-message" (click)="app.onTopbarSubItemClick($event)">
                                        <img src="assets/layout/images/avatar4.png" width="35"/>
                                        <span>Out of office</span>
                                    </a>
                                </li>
                            </ul>
                        </li-->
                        <!--li #notifications [ngClass]="{'active-top-menu':app.activeTopbarItem === notifications}">
                            <a href="#" (click)="app.onTopbarItemClick($event,notifications)">
                                <i class="topbar-icon material-icons">timer</i>
                                <span class="topbar-badge animated rubberBand">4</span>
                                <span class="topbar-item-name">Notifications</span>
                            </a>
                            <ul class="clarodx-menu animated fadeInDown">
                                <li role="menuitem">
                                    <a href="#" (click)="app.onTopbarSubItemClick($event)">
                                        <i class="material-icons">bug_report</i>
                                        <span>Pending tasks</span>
                                    </a>
                                </li>
                                <li role="menuitem">
                                    <a href="#" (click)="app.onTopbarSubItemClick($event)">
                                        <i class="material-icons">event</i>
                                        <span>Meeting today at 3pm</span>
                                    </a>
                                </li>
                                <li role="menuitem">
                                    <a href="#" (click)="app.onTopbarSubItemClick($event)">
                                        <i class="material-icons">file_download</i>
                                        <span>Download documents</span>
                                    </a>
                                </li>
                                <li role="menuitem">
                                    <a href="#" (click)="app.onTopbarSubItemClick($event)">
                                        <i class="material-icons">flight</i>
                                        <span>Book flight</span>
                                    </a>
                                </li>
                            </ul>
                        </li-->
                        <!--li #search class="search-item" [ngClass]="{'active-top-menu':app.activeTopbarItem === search}"
                            (click)="app.onTopbarItemClick($event,search)">
                            <span class="md-inputfield">
                                <input type="text" pInputText>
                                <label>Buscar</label>
                                <i class="topbar-icon material-icons">search</i>
                            </span>
                        </li-->
                </ul>
            </div>
        </div>
    `
})
export class AppTopbarComponent {

    constructor(public app: AppMainComponent) {
    }

}

