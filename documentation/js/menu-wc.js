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
                                <a href="components/AppComponent.html" data-type="entity-link" >AppComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/BinaryRadioInputComponent.html" data-type="entity-link" >BinaryRadioInputComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/CaptchaInputComponent.html" data-type="entity-link" >CaptchaInputComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/CheckboxInputComponent.html" data-type="entity-link" >CheckboxInputComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/DashboardComponent.html" data-type="entity-link" >DashboardComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/DriverInfoFormComponent.html" data-type="entity-link" >DriverInfoFormComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/DriverTruckWalletFormComponent.html" data-type="entity-link" >DriverTruckWalletFormComponent</a>
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
                                <a href="components/MainViewComponent.html" data-type="entity-link" >MainViewComponent</a>
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
                                <a href="components/SearchInputComponent.html" data-type="entity-link" >SearchInputComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/SelectInputComponent.html" data-type="entity-link" >SelectInputComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/SidebarComponent.html" data-type="entity-link" >SidebarComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/SidebarMenuComponent.html" data-type="entity-link" >SidebarMenuComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/SubMenuComponent.html" data-type="entity-link" >SubMenuComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/SupportButtonComponent.html" data-type="entity-link" >SupportButtonComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/TabBarComponent.html" data-type="entity-link" >TabBarComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/TabViewComponent.html" data-type="entity-link" >TabViewComponent</a>
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
                                <a href="components/TreeTableCheckboxComponent.html" data-type="entity-link" >TreeTableCheckboxComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/TruckInfoFormComponent.html" data-type="entity-link" >TruckInfoFormComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/UserInfoFormComponent.html" data-type="entity-link" >UserInfoFormComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/UsersMenuAccessFormComponent.html" data-type="entity-link" >UsersMenuAccessFormComponent</a>
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
                                    <a href="injectables/APICommunicationManagementService.html" data-type="entity-link" >APICommunicationManagementService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ApiProcessesService.html" data-type="entity-link" >ApiProcessesService</a>
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
                                    <a href="injectables/LoadCapacitorManagementService.html" data-type="entity-link" >LoadCapacitorManagementService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LoaderTypesService.html" data-type="entity-link" >LoaderTypesService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LoadingService.html" data-type="entity-link" >LoadingService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ProductTypesService.html" data-type="entity-link" >ProductTypesService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ProvinceAndCityManagementService.html" data-type="entity-link" >ProvinceAndCityManagementService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ToastService.html" data-type="entity-link" >ToastService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TravelTimeManagementService.html" data-type="entity-link" >TravelTimeManagementService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UserAuthService.html" data-type="entity-link" >UserAuthService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UserManagementService.html" data-type="entity-link" >UserManagementService</a>
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
                                <a href="interfaces/CaptchaChallenge.html" data-type="entity-link" >CaptchaChallenge</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/City.html" data-type="entity-link" >City</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ColorScheme.html" data-type="entity-link" >ColorScheme</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ComponentTokens.html" data-type="entity-link" >ComponentTokens</a>
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
                                <a href="interfaces/LoadAnnouncementPlace.html" data-type="entity-link" >LoadAnnouncementPlace</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/LoaderType.html" data-type="entity-link" >LoaderType</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/LoadInfo.html" data-type="entity-link" >LoadInfo</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/LoginFormData.html" data-type="entity-link" >LoginFormData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/MenuItemData.html" data-type="entity-link" >MenuItemData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PageGroup.html" data-type="entity-link" >PageGroup</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PrimitiveTokens.html" data-type="entity-link" >PrimitiveTokens</a>
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
                                <a href="interfaces/SelectedNodes.html" data-type="entity-link" >SelectedNodes</a>
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
                                <a href="interfaces/SemanticTokens.html" data-type="entity-link" >SemanticTokens</a>
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
                                <a href="interfaces/TabItem.html" data-type="entity-link" >TabItem</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TabsState.html" data-type="entity-link" >TabsState</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TabView.html" data-type="entity-link" >TabView</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Tariff.html" data-type="entity-link" >Tariff</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ThemePreset.html" data-type="entity-link" >ThemePreset</a>
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
                                <a href="interfaces/UsernamePassword.html" data-type="entity-link" >UsernamePassword</a>
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