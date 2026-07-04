import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocationManagementService {
  isLoading = signal<boolean>(false);
  error = signal<string | null>(null);
  currentLocation = signal<unknown | null>(null);

  permissionStatus = signal<PermissionState | null>(null);

  constructor() {
    this.checkPermissionStatus();
  }

  private async checkPermissionStatus() {
    if (!navigator.permissions) return;

    try {
      const status = await navigator.permissions.query({ name: 'geolocation' });
      this.permissionStatus.set(status.state);

      status.onchange = () => {
        this.permissionStatus.set(status.state);
      };
    } catch (err) {
      console.error(
        'Permissions API not supported for geolocation in this browser.'
      );
    }
  }

  fetchUserLocation() {
    this.isLoading.set(true);
    this.error.set(null);

    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser.');
      this.isLoading.set(false);
      return;
    }

    alert('Geolocation is supported by your browser.');

    // 2. Request the location
    navigator.geolocation.getCurrentPosition(
      (position: GeolocationPosition) => {
        const locationPayload = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
          altitude: position.coords.altitude,
          heading: position.coords.heading,
          speed: position.coords.speed,
          timestamp: position.timestamp,
        };

        this.currentLocation.set(locationPayload);
        this.isLoading.set(false);

        this.sendToApi({
          latitude: locationPayload.latitude,
          longitude: locationPayload.longitude,
          accuracy: locationPayload.accuracy,
        });
      },
      (err: GeolocationPositionError) => {
        this.isLoading.set(false);
        this.handleLocationError(err);
      },
      {
        enableHighAccuracy: true,
        timeout: 30000,
        maximumAge: 0,
      }
    );
  }

  private sendToApi(payload: {
    latitude: unknown;
    longitude: unknown;
    accuracy: unknown;
  }) {
    // Example API call

    alert(
      `The GPS lat:${payload.latitude} long:${payload.longitude} accuracy:${payload.accuracy}`
    );
  }

  private handleLocationError(error: GeolocationPositionError) {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        alert('User denied the request for Geolocation.');
        break;
      case error.POSITION_UNAVAILABLE:
        alert('Location information is unavailable.');
        break;
      case error.TIMEOUT:
        alert('The request to get user location timed out.');
        break;
      default:
        alert('An unknown error occurred.');
        break;
    }
  }
}
