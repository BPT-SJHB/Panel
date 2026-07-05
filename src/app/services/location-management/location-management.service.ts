import { Injectable } from '@angular/core';

export interface ILocation {
  latitude: number;
  longitude: number;
  accuracy: number;
}

@Injectable({
  providedIn: 'root',
})
export class LocationManagementService {
  async checkPermissionStatus() {
    let permissionStatus: unknown;

    if (!navigator.permissions) {
      return 'Permissions API not supported by your browser.';
    }

    try {
      const status = await navigator.permissions.query({ name: 'geolocation' });
      permissionStatus = status.state;

      status.onchange = () => {
        permissionStatus = status.state;
      };

      return permissionStatus;
    } catch (err) {
      return (
        'Permissions API not supported for geolocation in this browser.' + err
      );
    }
  }

  async fetchUserLocation(): Promise<ILocation | null> {
    if (!navigator.geolocation) {
      return null;
    }

    return new Promise((resolve) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const locationPayload: ILocation = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            accuracy: position.coords.accuracy,
          };
          resolve(locationPayload);
        },
        (_) => {
          resolve(null);
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
      );
    });
  }
}
