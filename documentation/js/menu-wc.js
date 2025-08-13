'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">bpt-sjhb-panel documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#components-links"' :
                            'data-bs-target="#xs-components-links"' }>
                            <span class="icon ion-md-cog"></span>
                            <span>Components</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="components-links"' : 'id="xs-components-links"' }>
                            <li class="link">
                                <a href="components/AnnouncementGroupFormComponent.html" data-type="entity-link" >AnnouncementGroupFormComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/AnnouncementSubGroupFormComponent.html" data-type="entity-link" >AnnouncementSubGroupFormComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/AppComponent.html" data-type="entity-link" >AppComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/BinaryRadioInputComponent.html" data-type="entity-link" >BinaryRadioInputComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ButtonComponent.html" data-type="entity-link" >ButtonComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/CaptchaInputComponent.html" data-type="entity-link" >CaptchaInputComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/CarouselComponent.html" data-type="entity-link" >CarouselComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/CheckboxInputComponent.html" data-type="entity-link" >CheckboxInputComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/DashboardComponent.html" data-type="entity-link" >DashboardComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/DashboardContentManagerComponent.html" data-type="entity-link" >DashboardContentManagerComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/DatePickerInput.html" data-type="entity-link" >DatePickerInput</a>
                            </li>
                            <li class="link">
                                <a href="components/DriverInfoFormComponent.html" data-type="entity-link" >DriverInfoFormComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/DriverTruckWalletFormComponent.html" data-type="entity-link" >DriverTruckWalletFormComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/EmergencyTurnsFormComponent.html" data-type="entity-link" >EmergencyTurnsFormComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ExitConfirmationDialogComponent.html" data-type="entity-link" >ExitConfirmationDialogComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/FactoriesAndFreightFormComponent.html" data-type="entity-link" >FactoriesAndFreightFormComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/FooterComponent.html" data-type="entity-link" >FooterComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ForgetPasswordFormComponent.html" data-type="entity-link" >ForgetPasswordFormComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ForgetPasswordPageComponent.html" data-type="entity-link" >ForgetPasswordPageComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/FormCardComponent.html" data-type="entity-link" >FormCardComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/FullScreenBackgroundComponent.html" data-type="entity-link" >FullScreenBackgroundComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/HeaderComponent.html" data-type="entity-link" >HeaderComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/HomePageComponent.html" data-type="entity-link" >HomePageComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/IssuedTurnListFormComponent.html" data-type="entity-link" >IssuedTurnListFormComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/LadPlacesFormComponent.html" data-type="entity-link" >LadPlacesFormComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/LoadCapacitorFormComponent.html" data-type="entity-link" >LoadCapacitorFormComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/LoaderTypeFormComponent.html" data-type="entity-link" >LoaderTypeFormComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/LoadingComponent.html" data-type="entity-link" >LoadingComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/LoginFormComponent.html" data-type="entity-link" >LoginFormComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/LoginPageComponent.html" data-type="entity-link" >LoginPageComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/LogoComponent.html" data-type="entity-link" >LogoComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/MainViewComponent.html" data-type="entity-link" >MainViewComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/MapSvgComponent.html" data-type="entity-link" >MapSvgComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/MobileTabBarComponent.html" data-type="entity-link" >MobileTabBarComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/NewPasswordDialogComponent.html" data-type="entity-link" >NewPasswordDialogComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/PasswordInputComponent.html" data-type="entity-link" >PasswordInputComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ProductFormComponent.html" data-type="entity-link" >ProductFormComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ProvinceAndCityFormComponent.html" data-type="entity-link" >ProvinceAndCityFormComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/RealTimeTurnsFormComponent.html" data-type="entity-link" >RealTimeTurnsFormComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/RegisterTurnFormComponent.html" data-type="entity-link" >RegisterTurnFormComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/RelationOfAnnouncementGroupAndSubGroupComponent.html" data-type="entity-link" >RelationOfAnnouncementGroupAndSubGroupComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/RelationOfSequentialTurnToAnnouncementSubGroupsFormComponent.html" data-type="entity-link" >RelationOfSequentialTurnToAnnouncementSubGroupsFormComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/RelationOfSequentialTurnToLoaderTypeFormComponent.html" data-type="entity-link" >RelationOfSequentialTurnToLoaderTypeFormComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ResuscitateTurnsFormComponent.html" data-type="entity-link" >ResuscitateTurnsFormComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/SearchAutoCompleteComponent.html" data-type="entity-link" >SearchAutoCompleteComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/SearchInputComponent.html" data-type="entity-link" >SearchInputComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/SearchProcessesComponent.html" data-type="entity-link" >SearchProcessesComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/SelectInputComponent.html" data-type="entity-link" >SelectInputComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/SequentialTurnsFormComponent.html" data-type="entity-link" >SequentialTurnsFormComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/SidebarComponent.html" data-type="entity-link" >SidebarComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/SidebarPageGroupComponent.html" data-type="entity-link" >SidebarPageGroupComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/SidebarWebProcesses.html" data-type="entity-link" >SidebarWebProcesses</a>
                            </li>
                            <li class="link">
                                <a href="components/SupportButtonComponent.html" data-type="entity-link" >SupportButtonComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/TableComponent.html" data-type="entity-link" >TableComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/TabManagerComponent.html" data-type="entity-link" >TabManagerComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/TariffsFormComponent.html" data-type="entity-link" >TariffsFormComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/TerminalCardComponent.html" data-type="entity-link" >TerminalCardComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/TextAreaInputComponent.html" data-type="entity-link" >TextAreaInputComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/TextInputComponent.html" data-type="entity-link" >TextInputComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ThemeManagementComponent.html" data-type="entity-link" >ThemeManagementComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/TimePickerInput.html" data-type="entity-link" >TimePickerInput</a>
                            </li>
                            <li class="link">
                                <a href="components/ToggleSwitchInputComponent.html" data-type="entity-link" >ToggleSwitchInputComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/TransportCompaniesFormComponent.html" data-type="entity-link" >TransportCompaniesFormComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/TransportCompaniesWalletPaymentFormComponent.html" data-type="entity-link" >TransportCompaniesWalletPaymentFormComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/TravelTimeFormComponent.html" data-type="entity-link" >TravelTimeFormComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/TreeTableCheckboxComponent.html" data-type="entity-link" >TreeTableCheckboxComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/TruckAndDriverInformationFormComponent.html" data-type="entity-link" >TruckAndDriverInformationFormComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/TruckInfoFormComponent.html" data-type="entity-link" >TruckInfoFormComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/TruckWalletPaymentFormComponent.html" data-type="entity-link" >TruckWalletPaymentFormComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/TurnsListFormComponent.html" data-type="entity-link" >TurnsListFormComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/TurnsTruckInfoBaseFormComponent.html" data-type="entity-link" >TurnsTruckInfoBaseFormComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/UserChargingFunctionFormComponent.html" data-type="entity-link" >UserChargingFunctionFormComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/UserInfoFormComponent.html" data-type="entity-link" >UserInfoFormComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/UserProfileComponent.html" data-type="entity-link" >UserProfileComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/UserProfileFormComponent.html" data-type="entity-link" >UserProfileFormComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/UsersMenuAccessFormComponent.html" data-type="entity-link" >UsersMenuAccessFormComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/WalletPaymentFormComponent.html" data-type="entity-link" >WalletPaymentFormComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/WalletPaymentRecordTableComponent.html" data-type="entity-link" >WalletPaymentRecordTableComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/WalletProfileComponent.html" data-type="entity-link" >WalletProfileComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/WalletTransactionsTableComponent.html" data-type="entity-link" >WalletTransactionsTableComponent</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#injectables-links"' :
                                'data-bs-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AnnouncementGroupSubgroupManagementService.html" data-type="entity-link" >AnnouncementGroupSubgroupManagementService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/APICommunicationManagementService.html" data-type="entity-link" >APICommunicationManagementService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ApiProcessesService.html" data-type="entity-link" >ApiProcessesService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/BaseLoading.html" data-type="entity-link" >BaseLoading</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CaptchaService.html" data-type="entity-link" >CaptchaService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CryptographyService.html" data-type="entity-link" >CryptographyService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/Driver_TruckManagementService.html" data-type="entity-link" >Driver_TruckManagementService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/FpcManagementService.html" data-type="entity-link" >FpcManagementService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LADPlaceManagementService.html" data-type="entity-link" >LADPlaceManagementService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LoadAnnouncementPlacesService.html" data-type="entity-link" >LoadAnnouncementPlacesService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LoaderTypesService.html" data-type="entity-link" >LoaderTypesService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LoadingService.html" data-type="entity-link" >LoadingService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LoadManagementService.html" data-type="entity-link" >LoadManagementService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ProductTypesService.html" data-type="entity-link" >ProductTypesService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ProvinceAndCityManagementService.html" data-type="entity-link" >ProvinceAndCityManagementService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ReportsManagementService.html" data-type="entity-link" >ReportsManagementService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SequentialTurnManagementService.html" data-type="entity-link" >SequentialTurnManagementService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TariffsManagementService.html" data-type="entity-link" >TariffsManagementService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ToastService.html" data-type="entity-link" >ToastService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TransportCompaniesManagementService.html" data-type="entity-link" >TransportCompaniesManagementService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TravelTimeManagementService.html" data-type="entity-link" >TravelTimeManagementService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TurnManagementService.html" data-type="entity-link" >TurnManagementService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UserAuthService.html" data-type="entity-link" >UserAuthService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UserManagementService.html" data-type="entity-link" >UserManagementService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/WalletManagementService.html" data-type="entity-link" >WalletManagementService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#interfaces-links"' :
                            'data-bs-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/AnnouncementGroup.html" data-type="entity-link" >AnnouncementGroup</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AnnouncementSubGroup.html" data-type="entity-link" >AnnouncementSubGroup</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AnnouncementSubGroupInRelation.html" data-type="entity-link" >AnnouncementSubGroupInRelation</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/announcementSubGroupInRelation.html" data-type="entity-link" >announcementSubGroupInRelation</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ApiGroupProcess.html" data-type="entity-link" >ApiGroupProcess</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ApiProcess.html" data-type="entity-link" >ApiProcess</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ApiResponse.html" data-type="entity-link" >ApiResponse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/APIUsernamePassword.html" data-type="entity-link" >APIUsernamePassword</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ButtonStyle.html" data-type="entity-link" >ButtonStyle</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CaptchaChallenge.html" data-type="entity-link" >CaptchaChallenge</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CardTurnItem.html" data-type="entity-link" >CardTurnItem</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/City.html" data-type="entity-link" >City</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ContextManagerState.html" data-type="entity-link" >ContextManagerState</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/dataFormat.html" data-type="entity-link" >dataFormat</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DynamicTab.html" data-type="entity-link" >DynamicTab</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ErrorsValidation.html" data-type="entity-link" >ErrorsValidation</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/FPCInfo.html" data-type="entity-link" >FPCInfo</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/HeaderData.html" data-type="entity-link" >HeaderData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/LADPlace.html" data-type="entity-link" >LADPlace</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/LoadAccounting.html" data-type="entity-link" >LoadAccounting</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/LoadAllocationInfo.html" data-type="entity-link" >LoadAllocationInfo</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/LoadAnnouncementPlace.html" data-type="entity-link" >LoadAnnouncementPlace</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/LoadEdit.html" data-type="entity-link" >LoadEdit</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/LoaderType.html" data-type="entity-link" >LoaderType</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/LoaderTypeInRelation.html" data-type="entity-link" >LoaderTypeInRelation</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/LoadForTransportCompanies.html" data-type="entity-link" >LoadForTransportCompanies</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/LoadInfo.html" data-type="entity-link" >LoadInfo</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/LoadInfoForTransportCompanies.html" data-type="entity-link" >LoadInfoForTransportCompanies</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/LoadPermission.html" data-type="entity-link" >LoadPermission</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/LoadRegister.html" data-type="entity-link" >LoadRegister</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/LoadStatus.html" data-type="entity-link" >LoadStatus</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/LoginFormData.html" data-type="entity-link" >LoginFormData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/OnViewActivated.html" data-type="entity-link" >OnViewActivated</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/OnViewDeactivated.html" data-type="entity-link" >OnViewDeactivated</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PageGroup.html" data-type="entity-link" >PageGroup</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PageGroup-1.html" data-type="entity-link" >PageGroup</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PageGroupItem.html" data-type="entity-link" >PageGroupItem</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Process.html" data-type="entity-link" >Process</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Product.html" data-type="entity-link" >Product</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ProductParent.html" data-type="entity-link" >ProductParent</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ProductType.html" data-type="entity-link" >ProductType</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Province.html" data-type="entity-link" >Province</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PTPInfo.html" data-type="entity-link" >PTPInfo</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/RawSoftwareUserForProfile.html" data-type="entity-link" >RawSoftwareUserForProfile</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/RelationOfAnnouncementGroupAndSubGroup.html" data-type="entity-link" >RelationOfAnnouncementGroupAndSubGroup</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/RelationOfSequentialTurnToAnnouncementSubGroup.html" data-type="entity-link" >RelationOfSequentialTurnToAnnouncementSubGroup</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/RelationOfSequentialTurnToLoaderType.html" data-type="entity-link" >RelationOfSequentialTurnToLoaderType</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/RowRelationOfAnnouncement.html" data-type="entity-link" >RowRelationOfAnnouncement</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/RowRelationOfSequential.html" data-type="entity-link" >RowRelationOfSequential</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/RowRelationOfSequentialToLoader.html" data-type="entity-link" >RowRelationOfSequentialToLoader</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SelectionKey.html" data-type="entity-link" >SelectionKey</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SelectionOption.html" data-type="entity-link" >SelectionOption</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SelectionOption-1.html" data-type="entity-link" >SelectionOption</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SequentialTurn.html" data-type="entity-link" >SequentialTurn</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ShortResponse.html" data-type="entity-link" >ShortResponse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SidebarState.html" data-type="entity-link" >SidebarState</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SoftwareUserInfo.html" data-type="entity-link" >SoftwareUserInfo</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SoftwareUserProfile.html" data-type="entity-link" >SoftwareUserProfile</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TabConfig.html" data-type="entity-link" >TabConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TabData.html" data-type="entity-link" >TabData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TabItem.html" data-type="entity-link" >TabItem</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TableColumn.html" data-type="entity-link" >TableColumn</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TabView.html" data-type="entity-link" >TabView</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Tariff.html" data-type="entity-link" >Tariff</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TransportCompany.html" data-type="entity-link" >TransportCompany</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TransportTariffParam.html" data-type="entity-link" >TransportTariffParam</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TravelTime.html" data-type="entity-link" >TravelTime</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TreeTableChangedData.html" data-type="entity-link" >TreeTableChangedData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TruckComposedInfo.html" data-type="entity-link" >TruckComposedInfo</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TruckDriverInfo.html" data-type="entity-link" >TruckDriverInfo</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TruckInfo.html" data-type="entity-link" >TruckInfo</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TruckNativenessInfo.html" data-type="entity-link" >TruckNativenessInfo</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Turn.html" data-type="entity-link" >Turn</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TurnAccounting.html" data-type="entity-link" >TurnAccounting</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TurnForSoftwareUser.html" data-type="entity-link" >TurnForSoftwareUser</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UserInfoForm.html" data-type="entity-link" >UserInfoForm</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UsernamePassword.html" data-type="entity-link" >UsernamePassword</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UserProfile.html" data-type="entity-link" >UserProfile</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UserSession.html" data-type="entity-link" >UserSession</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UserType.html" data-type="entity-link" >UserType</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Wallet.html" data-type="entity-link" >Wallet</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/WalletDefaultAmount.html" data-type="entity-link" >WalletDefaultAmount</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/WalletPaymentHistory.html" data-type="entity-link" >WalletPaymentHistory</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/WalletPaymentRequest.html" data-type="entity-link" >WalletPaymentRequest</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/WalletTransaction.html" data-type="entity-link" >WalletTransaction</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/WalletUserChargingFunction.html" data-type="entity-link" >WalletUserChargingFunction</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/WebProcess.html" data-type="entity-link" >WebProcess</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/typealiases.html" data-type="entity-link">Type aliases</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});