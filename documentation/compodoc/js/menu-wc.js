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
                                    <span class="icon ion-ios-paper"></span>
                                        README
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
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/TemplatePlaygroundModule.html" data-type="entity-link" >TemplatePlaygroundModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-TemplatePlaygroundModule-a48e698b66bad8be9ff3b78b5db8e15ee6bb54bd2575fdb1bb61a34e76437cc54b2e161854c3d6c97b4c751d05ff3a43b70b87ceffd46d3c5bf53f6f161e3044"' : 'data-bs-target="#xs-components-links-module-TemplatePlaygroundModule-a48e698b66bad8be9ff3b78b5db8e15ee6bb54bd2575fdb1bb61a34e76437cc54b2e161854c3d6c97b4c751d05ff3a43b70b87ceffd46d3c5bf53f6f161e3044"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-TemplatePlaygroundModule-a48e698b66bad8be9ff3b78b5db8e15ee6bb54bd2575fdb1bb61a34e76437cc54b2e161854c3d6c97b4c751d05ff3a43b70b87ceffd46d3c5bf53f6f161e3044"' :
                                            'id="xs-components-links-module-TemplatePlaygroundModule-a48e698b66bad8be9ff3b78b5db8e15ee6bb54bd2575fdb1bb61a34e76437cc54b2e161854c3d6c97b4c751d05ff3a43b70b87ceffd46d3c5bf53f6f161e3044"' }>
                                            <li class="link">
                                                <a href="components/TemplatePlaygroundComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TemplatePlaygroundComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-TemplatePlaygroundModule-a48e698b66bad8be9ff3b78b5db8e15ee6bb54bd2575fdb1bb61a34e76437cc54b2e161854c3d6c97b4c751d05ff3a43b70b87ceffd46d3c5bf53f6f161e3044"' : 'data-bs-target="#xs-injectables-links-module-TemplatePlaygroundModule-a48e698b66bad8be9ff3b78b5db8e15ee6bb54bd2575fdb1bb61a34e76437cc54b2e161854c3d6c97b4c751d05ff3a43b70b87ceffd46d3c5bf53f6f161e3044"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-TemplatePlaygroundModule-a48e698b66bad8be9ff3b78b5db8e15ee6bb54bd2575fdb1bb61a34e76437cc54b2e161854c3d6c97b4c751d05ff3a43b70b87ceffd46d3c5bf53f6f161e3044"' :
                                        'id="xs-injectables-links-module-TemplatePlaygroundModule-a48e698b66bad8be9ff3b78b5db8e15ee6bb54bd2575fdb1bb61a34e76437cc54b2e161854c3d6c97b4c751d05ff3a43b70b87ceffd46d3c5bf53f6f161e3044"' }>
                                        <li class="link">
                                            <a href="injectables/HbsRenderService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HbsRenderService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/TemplateEditorService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TemplateEditorService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/ZipExportService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ZipExportService</a>
                                        </li>
                                    </ul>
                                </li>
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
                                <a href="components/AdminLoadPermissionsFormComponent.html" data-type="entity-link" >AdminLoadPermissionsFormComponent</a>
                            </li>
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
                                <a href="components/BaseLoading.html" data-type="entity-link" >BaseLoading</a>
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
                                <a href="components/CarouselFormComponent.html" data-type="entity-link" >CarouselFormComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ChatBoxInputComponent.html" data-type="entity-link" >ChatBoxInputComponent</a>
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
                                <a href="components/DeviceManagementFormComponent.html" data-type="entity-link" >DeviceManagementFormComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/DriverInfoFormComponent.html" data-type="entity-link" >DriverInfoFormComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/DriverLoadAllocationFormComponent.html" data-type="entity-link" >DriverLoadAllocationFormComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/DriverLoadPermissionsFormComponent.html" data-type="entity-link" >DriverLoadPermissionsFormComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/DriverTruckWalletFormComponent.html" data-type="entity-link" >DriverTruckWalletFormComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/EmergencyTurnsFormComponent.html" data-type="entity-link" >EmergencyTurnsFormComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/EquipmentDeviceConfigFormComponent.html" data-type="entity-link" >EquipmentDeviceConfigFormComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ExitConfirmationDialogComponent.html" data-type="entity-link" >ExitConfirmationDialogComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/FactoriesAndFreightFormComponent.html" data-type="entity-link" >FactoriesAndFreightFormComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/FilesUploadInputComponent.html" data-type="entity-link" >FilesUploadInputComponent</a>
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
                                <a href="components/FrameHeaderComponent.html" data-type="entity-link" >FrameHeaderComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/FullScreenBackgroundComponent.html" data-type="entity-link" >FullScreenBackgroundComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/GeneralConfigurationFormComponent.html" data-type="entity-link" >GeneralConfigurationFormComponent</a>
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
                                <a href="components/LoadAccountingFormComponent.html" data-type="entity-link" >LoadAccountingFormComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/LoadAllocationConditionFormComponent.html" data-type="entity-link" >LoadAllocationConditionFormComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/LoadAllocationFormComponent.html" data-type="entity-link" >LoadAllocationFormComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/LoadAllocationPriorityComponent.html" data-type="entity-link" >LoadAllocationPriorityComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/LoadAnnouncementConfigFormComponent.html" data-type="entity-link" >LoadAnnouncementConfigFormComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/LoadCapacitorFormComponent.html" data-type="entity-link" >LoadCapacitorFormComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/LoaderTypeAnnouncementRelationFormComponent.html" data-type="entity-link" >LoaderTypeAnnouncementRelationFormComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/LoaderTypeFormComponent.html" data-type="entity-link" >LoaderTypeFormComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/LoadingComponent.html" data-type="entity-link" >LoadingComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/LoadPermissionsFormComponent.html" data-type="entity-link" >LoadPermissionsFormComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/LoadsAnnouncementFormComponent.html" data-type="entity-link" >LoadsAnnouncementFormComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/LoadsListFormComponent.html" data-type="entity-link" >LoadsListFormComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/LoadViewConditionFormComponent.html" data-type="entity-link" >LoadViewConditionFormComponent</a>
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
                                <a href="components/MapComponent.html" data-type="entity-link" >MapComponent</a>
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
                                <a href="components/OptInputComponent.html" data-type="entity-link" >OptInputComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ParkingTrafficRecordsFormComponent.html" data-type="entity-link" >ParkingTrafficRecordsFormComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/PasswordInputComponent.html" data-type="entity-link" >PasswordInputComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/PersonalizePasswordDialogComponent.html" data-type="entity-link" >PersonalizePasswordDialogComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ProductFormComponent.html" data-type="entity-link" >ProductFormComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ProvinceAndCityFormComponent.html" data-type="entity-link" >ProvinceAndCityFormComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ProvinceAnnouncementRelationFormComponent.html" data-type="entity-link" >ProvinceAnnouncementRelationFormComponent</a>
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
                                <a href="components/SearchAutoCompleteFactoryComponent.html" data-type="entity-link" >SearchAutoCompleteFactoryComponent</a>
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
                                <a href="components/SequentialTurnCostFormComponent.html" data-type="entity-link" >SequentialTurnCostFormComponent</a>
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
                                <a href="components/TicketChatMessageFormComponent.html" data-type="entity-link" >TicketChatMessageFormComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/TicketCreateFormComponent.html" data-type="entity-link" >TicketCreateFormComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/TicketCreatePageComponent.html" data-type="entity-link" >TicketCreatePageComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/TicketFilesUploadComponent.html" data-type="entity-link" >TicketFilesUploadComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/TicketGuardCaptchaFormComponent.html" data-type="entity-link" >TicketGuardCaptchaFormComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/TicketListsFormComponent.html" data-type="entity-link" >TicketListsFormComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/TicketTrackerPageComponent.html" data-type="entity-link" >TicketTrackerPageComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/TicketTrackFormComponent.html" data-type="entity-link" >TicketTrackFormComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/TimePickerInput.html" data-type="entity-link" >TimePickerInput</a>
                            </li>
                            <li class="link">
                                <a href="components/ToggleSwitchInputComponent.html" data-type="entity-link" >ToggleSwitchInputComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/TPTParametersAnnouncementRelationFormComponent.html" data-type="entity-link" >TPTParametersAnnouncementRelationFormComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/TPTParametersFormComponent.html" data-type="entity-link" >TPTParametersFormComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/TrafficAndParkingTariffFormComponent.html" data-type="entity-link" >TrafficAndParkingTariffFormComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/TrafficCardTypeFormComponent.html" data-type="entity-link" >TrafficCardTypeFormComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/TrafficEntriesFormComponent.html" data-type="entity-link" >TrafficEntriesFormComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/TrafficInitialRegistrationFormComponent.html" data-type="entity-link" >TrafficInitialRegistrationFormComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/TransportCompaniesFormComponent.html" data-type="entity-link" >TransportCompaniesFormComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/TransportCompaniesWalletPaymentFormComponent.html" data-type="entity-link" >TransportCompaniesWalletPaymentFormComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/TransportLoadPermissionsFormComponent.html" data-type="entity-link" >TransportLoadPermissionsFormComponent</a>
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
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#classes-links"' :
                            'data-bs-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/AppTitles.html" data-type="entity-link" >AppTitles</a>
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
                                    <a href="injectables/AppConfirmService.html" data-type="entity-link" >AppConfirmService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AutoCompleteConfigFactoryService.html" data-type="entity-link" >AutoCompleteConfigFactoryService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CaptchaService.html" data-type="entity-link" >CaptchaService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CarouselManagementService.html" data-type="entity-link" >CarouselManagementService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ConfigManagementService.html" data-type="entity-link" >ConfigManagementService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CryptographyService.html" data-type="entity-link" >CryptographyService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DevAuthService.html" data-type="entity-link" >DevAuthService</a>
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
                                    <a href="injectables/TicketServiceManagementService.html" data-type="entity-link" >TicketServiceManagementService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ToastService.html" data-type="entity-link" >ToastService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TPTParamsManagementService.html" data-type="entity-link" >TPTParamsManagementService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TrafficManagementService.html" data-type="entity-link" >TrafficManagementService</a>
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
                                <a href="interfaces/AnnouncementSubGroupInRelationOfAnnouncementGroup.html" data-type="entity-link" >AnnouncementSubGroupInRelationOfAnnouncementGroup</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/announcementSubGroupInRelationOfSequentialTurn.html" data-type="entity-link" >announcementSubGroupInRelationOfSequentialTurn</a>
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
                                <a href="interfaces/AutoCompleteTypeMap.html" data-type="entity-link" >AutoCompleteTypeMap</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/BaseAutoCompleteFilter.html" data-type="entity-link" >BaseAutoCompleteFilter</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/BaseConfig.html" data-type="entity-link" >BaseConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ButtonColor.html" data-type="entity-link" >ButtonColor</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ButtonShadow.html" data-type="entity-link" >ButtonShadow</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ButtonSize.html" data-type="entity-link" >ButtonSize</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ButtonStyle.html" data-type="entity-link" >ButtonStyle</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Captcha.html" data-type="entity-link" >Captcha</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CardTurnItem.html" data-type="entity-link" >CardTurnItem</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CarouselForViewPic.html" data-type="entity-link" >CarouselForViewPic</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CarouselInfo.html" data-type="entity-link" >CarouselInfo</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CarouselPic.html" data-type="entity-link" >CarouselPic</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ChatGroupedByDate.html" data-type="entity-link" >ChatGroupedByDate</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ChatMessage.html" data-type="entity-link" >ChatMessage</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/City.html" data-type="entity-link" >City</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CompoDocConfig.html" data-type="entity-link" >CompoDocConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ContextManagerState.html" data-type="entity-link" >ContextManagerState</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CountItem.html" data-type="entity-link" >CountItem</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CreateChatMessageRequest.html" data-type="entity-link" >CreateChatMessageRequest</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/dataFormat.html" data-type="entity-link" >dataFormat</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Department.html" data-type="entity-link" >Department</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DeviceConfig.html" data-type="entity-link" >DeviceConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DeviceInfo.html" data-type="entity-link" >DeviceInfo</a>
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
                                <a href="interfaces/GeneralConfig.html" data-type="entity-link" >GeneralConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/HeaderData.html" data-type="entity-link" >HeaderData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ImageAddon.html" data-type="entity-link" >ImageAddon</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/LADPlace.html" data-type="entity-link" >LADPlace</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/LoadAccounting.html" data-type="entity-link" >LoadAccounting</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/LoadAllocatedToNextTurn.html" data-type="entity-link" >LoadAllocatedToNextTurn</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/LoadAllocationConditionInfo.html" data-type="entity-link" >LoadAllocationConditionInfo</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/LoadAllocationInfo.html" data-type="entity-link" >LoadAllocationInfo</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/LoadAllocationPriority.html" data-type="entity-link" >LoadAllocationPriority</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/LoadAnnouncementConfig.html" data-type="entity-link" >LoadAnnouncementConfig</a>
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
                                <a href="interfaces/LoaderTypeToAnnouncementSubGroupRelation.html" data-type="entity-link" >LoaderTypeToAnnouncementSubGroupRelation</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/LoadFilter.html" data-type="entity-link" >LoadFilter</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/LoadForTransportCompanies_Factories_Admins_Drivers.html" data-type="entity-link" >LoadForTransportCompanies_Factories_Admins_Drivers</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/LoadInfo.html" data-type="entity-link" >LoadInfo</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/LoadInfoForTransportCompanies_Factories_Admins_Drivers.html" data-type="entity-link" >LoadInfoForTransportCompanies_Factories_Admins_Drivers</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/LoadPermission.html" data-type="entity-link" >LoadPermission</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/LoadPermissionCancelForm.html" data-type="entity-link" >LoadPermissionCancelForm</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/LoadPermissionForCompany.html" data-type="entity-link" >LoadPermissionForCompany</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/LoadPermissionForDriver.html" data-type="entity-link" >LoadPermissionForDriver</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/LoadRegister.html" data-type="entity-link" >LoadRegister</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/LoadStatus.html" data-type="entity-link" >LoadStatus</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/LoadTransportCompaniesTable.html" data-type="entity-link" >LoadTransportCompaniesTable</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/LoadViewConditionInfo.html" data-type="entity-link" >LoadViewConditionInfo</a>
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
                                <a href="interfaces/PagingResponse.html" data-type="entity-link" >PagingResponse</a>
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
                                <a href="interfaces/RawSoftwareUserForProfile.html" data-type="entity-link" >RawSoftwareUserForProfile</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/RawTrafficCost.html" data-type="entity-link" >RawTrafficCost</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/RelationOfAnnouncementGroupAndSubGroup.html" data-type="entity-link" >RelationOfAnnouncementGroupAndSubGroup</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/RelationOfAnnouncementSubGroupAndProvince.html" data-type="entity-link" >RelationOfAnnouncementSubGroupAndProvince</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/RelationOfSequentialTurnToAnnouncementSubGroup.html" data-type="entity-link" >RelationOfSequentialTurnToAnnouncementSubGroup</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/RelationOfSequentialTurnToLoaderType.html" data-type="entity-link" >RelationOfSequentialTurnToLoaderType</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/RequesterInfo.html" data-type="entity-link" >RequesterInfo</a>
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
                                <a href="interfaces/SearchLoadPermissionsForm.html" data-type="entity-link" >SearchLoadPermissionsForm</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SearchLoadsForm.html" data-type="entity-link" >SearchLoadsForm</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SelectedImage.html" data-type="entity-link" >SelectedImage</a>
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
                                <a href="interfaces/SelectOption.html" data-type="entity-link" >SelectOption</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SelectOption-1.html" data-type="entity-link" >SelectOption</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SelectOption-2.html" data-type="entity-link" >SelectOption</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SequentialTurn.html" data-type="entity-link" >SequentialTurn</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Session.html" data-type="entity-link" >Session</a>
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
                                <a href="interfaces/TablePage.html" data-type="entity-link" >TablePage</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TabView.html" data-type="entity-link" >TabView</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Tariff.html" data-type="entity-link" >Tariff</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Template.html" data-type="entity-link" >Template</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Ticket.html" data-type="entity-link" >Ticket</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TicketCaptcha.html" data-type="entity-link" >TicketCaptcha</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TicketCreateRequest.html" data-type="entity-link" >TicketCreateRequest</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TicketQueryParams.html" data-type="entity-link" >TicketQueryParams</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TicketStatus.html" data-type="entity-link" >TicketStatus</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TicketType.html" data-type="entity-link" >TicketType</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TicketUser.html" data-type="entity-link" >TicketUser</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TicketUser-1.html" data-type="entity-link" >TicketUser</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TPTParamRelationToAnnouncementGroupAndSubGroup.html" data-type="entity-link" >TPTParamRelationToAnnouncementGroupAndSubGroup</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TrafficCardTempType.html" data-type="entity-link" >TrafficCardTempType</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TrafficCardType.html" data-type="entity-link" >TrafficCardType</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TrafficCardTypeCost.html" data-type="entity-link" >TrafficCardTypeCost</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TrafficInfo.html" data-type="entity-link" >TrafficInfo</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TrafficReportInfo.html" data-type="entity-link" >TrafficReportInfo</a>
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
                                <a href="interfaces/TurnCost.html" data-type="entity-link" >TurnCost</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TurnForSoftwareUser.html" data-type="entity-link" >TurnForSoftwareUser</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TurnStatus.html" data-type="entity-link" >TurnStatus</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TurnStatus-1.html" data-type="entity-link" >TurnStatus</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UploadFile.html" data-type="entity-link" >UploadFile</a>
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
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
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