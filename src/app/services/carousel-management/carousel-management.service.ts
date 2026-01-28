import { inject, Injectable } from '@angular/core';
import { UserAuthService } from '../user-auth-service/user-auth.service';
import { APICommunicationManagementService } from '../api-communication-management/apicommunication-management.service';
import { ApiResponse } from 'app/data/model/api-Response.model';
import { CarouselInfo } from './model/carousel-info.model';
import { API_ROUTES } from 'app/constants/api';
import {
  mockActiveCarouselInfos,
  mockAllCarouselInfos,
} from './mock/carousel-info.mock';
import { mockCarouselPic } from './mock/carousel-pic.mock';
import { ShortResponse } from 'app/data/model/short-response.model';
import { mockShortResponse } from 'app/data/mock/short-response.mock';
import { mockCarouselForViewPic } from './mock/carousel-pic-forView.mock';
import { CarouselForViewPic } from './model/carousel-pic-forView.model';
import { CarouselPic } from './model/carousel-pic.model';

@Injectable({
  providedIn: 'root',
})
export class CarouselManagementService {
  private userAuth = inject(UserAuthService);
  private apiCommunicator = inject(APICommunicationManagementService);

  public async GetAllCarousels(): Promise<ApiResponse<CarouselInfo[]>> {
    //#region Consts
    const apiUrl = API_ROUTES.CarouselAPI.GetCarousels;

    const bodyValue = {
      SessionId: this.userAuth.getSessionId(),
      AllCarouselsFlag: true,
    };
    //#endregion

    //#region Request + Return
    return await this.apiCommunicator.CommunicateWithAPI_Post<
      typeof bodyValue,
      CarouselInfo[]
    >(apiUrl, bodyValue, mockAllCarouselInfos);
    //#endregion
  }

  public async GetAllActiveCarousels(): Promise<ApiResponse<CarouselInfo[]>> {
    //#region Consts
    const apiUrl = API_ROUTES.CarouselAPI.GetCarousels;

    const bodyValue = {
      SessionId: this.userAuth.getSessionId(),
      AllCarouselsFlag: false,
    };
    //#endregion

    //#region  Request + Return
    return await this.apiCommunicator.CommunicateWithAPI_Post<
      typeof bodyValue,
      CarouselInfo[]
    >(apiUrl, bodyValue, mockActiveCarouselInfos);
    //#endregion
  }

  public async GetCarouselPic(
    carouselId: number
  ): Promise<ApiResponse<CarouselPic>> {
    //#region Consts
    const apiUrl = API_ROUTES.CarouselAPI.GetCarouselPic;

    const bodyValue = {
      SessionId: this.userAuth.getSessionId(),
      CId: carouselId,
    };
    //#endregion

    //#region Request + Return
    return await this.apiCommunicator.CommunicateWithAPI_Post<
      typeof bodyValue,
      CarouselPic
    >(apiUrl, bodyValue, mockCarouselPic);
    //#endregion
  }

  public async RegisterCarousel(
    title: string,
    url: string,
    description: string,
    pic: string
  ): Promise<ApiResponse<ShortResponse>> {
    //#region
    const apiUrl = API_ROUTES.CarouselAPI.RegisterCarousel;
    const carouselInfo: CarouselInfo = {
      CId: 0,
      CTitle: title,
      URL: url,
      Description: description,
      DateTimeMilladi: '',
      ShamsiDate: '',
      Time: '',
      Active: true,
      Picture: pic,
    };
    const bodyValue = {
      SessionId: this.userAuth.getSessionId(),
      RawCarousel: carouselInfo,
    };
    //#endregion

    //#region Request + Return
    return await this.apiCommunicator.CommunicateWithAPI_Post<
      typeof bodyValue,
      ShortResponse
    >(apiUrl, bodyValue, mockShortResponse);
    //#endregion
  }

  public async EditCarousel(
    carouselId: number,
    title: string,
    url: string,
    description: string,
    pic: string
  ): Promise<ApiResponse<ShortResponse>> {
    //#region Consts
    const apiUrl = API_ROUTES.CarouselAPI.EditCarousel;
    const carouselInfo: CarouselInfo = {
      CId: carouselId,
      CTitle: title,
      URL: url,
      Description: description,
      DateTimeMilladi: '',
      ShamsiDate: '',
      Time: '',
      Active: true,
      Picture: pic,
    };
    const bodyValue = {
      SessionId: this.userAuth.getSessionId(),
      RawCarousel: carouselInfo,
    };
    //#endregion

    //#region Request + Return
    return await this.apiCommunicator.CommunicateWithAPI_Post<
      typeof bodyValue,
      ShortResponse
    >(apiUrl, bodyValue, mockShortResponse);
    //#endregion
  }

  public async DeleteCarousel(
    carouselId: number
  ): Promise<ApiResponse<ShortResponse>> {
    //#region Consts
    const apiUrl = API_ROUTES.CarouselAPI.DeleteCarousel;
    const bodyValue = {
      SessionId: this.userAuth.getSessionId(),
      CId: carouselId,
    };
    //#endregion

    //#region Request + Return
    return await this.apiCommunicator.CommunicateWithAPI_Post<
      typeof bodyValue,
      ShortResponse
    >(apiUrl, bodyValue, mockShortResponse);
    //#endregion
  }

  public async ChangeCarouselStatus(
    carouselId: number,
    status: boolean
  ): Promise<ApiResponse<ShortResponse>> {
    //#region Consts
    const apiUrl = API_ROUTES.CarouselAPI.ChangeCarouselStatus;
    const bodyValue = {
      SessionId: this.userAuth.getSessionId(),
      CId: carouselId,
      ActiveStatus: status,
    };
    //#endregion

    //#region Request + Return
    return await this.apiCommunicator.CommunicateWithAPI_Post<
      typeof bodyValue,
      ShortResponse
    >(apiUrl, bodyValue, mockShortResponse);
    //#endregion
  }

  public async GetCarouselsForView(): Promise<
    ApiResponse<CarouselForViewPic[]>
  > {
    //#region Consts
    const apiUrl = API_ROUTES.CarouselAPI.GetCarouselsForView;
    const bodyValue = {
      SessionId: this.userAuth.getSessionId(),
    };
    //#endregion

    //#region Request + Return
    return await this.apiCommunicator.CommunicateWithAPI_Post<
      typeof bodyValue,
      CarouselForViewPic[]
    >(apiUrl, bodyValue, mockCarouselForViewPic);
    //#endregion
  }
}
