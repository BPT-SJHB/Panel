import { inject, Injectable } from '@angular/core';
import { UserAuthService } from '../user-auth-service/user-auth.service';
import { APICommunicationManagementService } from '../api-communication-management/apicommunication-management.service';
import { ApiResponse } from 'app/data/model/api-Response.model';
import { Product, ProductType } from 'app/data/model/product-type.model';
import { API_ROUTES } from 'app/constants/api';
import { mockProductTypes } from 'app/data/mock/product-type.mock';
import { ShortResponse } from 'app/data/model/short-response.model';
import { mockShortResponse } from 'app/data/mock/short-response.mock';

@Injectable({
  providedIn: 'root',
})
export class ProductTypesService {
  private userAuth = inject(UserAuthService);
  private apiCommunicator = inject(APICommunicationManagementService);

  public async GetProductsInfo(
    productTypeTitle: string
  ): Promise<ApiResponse<ProductType[]>> {
    this.userAuth.isLoggedIn();

    //#region Consts
    const apiUrl = API_ROUTES.TransportationAPI.ProductTypes.GetProducts;
    const productTypeInfo: ProductType = {
      ProductTypeId: 0,
      ProductTypeTitle: productTypeTitle,
    };
    const bodyValue = {
      SessionId: this.userAuth.getSessionId(),
      SearchString: productTypeInfo.ProductTypeTitle,
    };
    //#endregion

    //#region Request + Return
    return await this.apiCommunicator.CommunicateWithAPI_Post<
      typeof bodyValue,
      ProductType[]
    >(apiUrl, bodyValue, mockProductTypes);
    //#endregion
  }

  public async ChangeProductTypeStatus(
    productTypeId: number,
    status: boolean
  ): Promise<ApiResponse<ShortResponse>> {
    this.userAuth.isLoggedIn();

    //#region Consts
    const apiUrl =
      API_ROUTES.TransportationAPI.ProductTypes.ChangeProductTypeStatus;
    const productTypeInfo: ProductType = {
      ProductTypeId: productTypeId,
      ProductTypeActive: status,
    };
    const bodyValue = {
      SessionId: this.userAuth.getSessionId(),
      ProductTypeId: productTypeInfo.ProductTypeId,
      ProductTypeActive: productTypeInfo.ProductTypeActive,
    };
    //#endregion

    //#region Request + Return
    return await this.apiCommunicator.CommunicateWithAPI_Post<
      typeof bodyValue,
      ShortResponse
    >(apiUrl, bodyValue, mockShortResponse);
    //#endregion
  }

  public async ChangeProductStatus(
    productId: number,
    status: boolean
  ): Promise<ApiResponse<ShortResponse>> {
    this.userAuth.isLoggedIn();

    //#region Consts
    const apiUrl =
      API_ROUTES.TransportationAPI.ProductTypes.ChangeProductStatus;
    const productInfo: Product = {
      ProductId: productId,
      ProductActive: status,
    };
    const bodyValue = {
      SessionId: this.userAuth.getSessionId(),
      ProductId: productInfo.ProductId,
      ProductActive: productInfo.ProductActive,
    };
    //#endregion

    //#region Request + Return
    return await this.apiCommunicator.CommunicateWithAPI_Post<
      typeof bodyValue,
      ShortResponse
    >(apiUrl, bodyValue, mockShortResponse);
    //#endregion
  }
}
