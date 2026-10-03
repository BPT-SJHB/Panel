import { Injectable } from '@angular/core';

export interface ILocation {
  latitude: number;
  longitude: number;
  accuracy: number;
}

export type LocationErrorCode =
  | 'PERMISSION_DENIED'
  | 'POSITION_UNAVAILABLE'
  | 'TIMEOUT'
  | 'NOT_SUPPORTED';

export type LocationResult =
  | { success: true; location: ILocation }
  | { success: false; error: LocationErrorCode };

@Injectable({
  providedIn: 'root',
})
export class LocationManagementService {
  async checkPermissionStatus(): Promise<PermissionState | 'unsupported'> {
    if (!navigator.permissions?.query) {
      return 'unsupported';
    }

    try {
      const status = await navigator.permissions.query({ name: 'geolocation' });
      return status.state;
    } catch {
      return 'unsupported';
    }
  }

  async fetchUserLocation(): Promise<LocationResult> {
    if (!navigator.geolocation) {
      return { success: false, error: 'NOT_SUPPORTED' };
    }

    return new Promise((resolve) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            success: true,
            location: {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              accuracy: position.coords.accuracy,
            },
          });
        },
        (error) => {
          const errorMap: Record<number, LocationErrorCode> = {
            1: 'PERMISSION_DENIED',
            2: 'POSITION_UNAVAILABLE',
            3: 'TIMEOUT',
          };
          resolve({
            success: false,
            error: errorMap[error.code] ?? 'POSITION_UNAVAILABLE',
          });
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
      );
    });
  }
}
