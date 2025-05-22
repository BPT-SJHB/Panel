export interface ICryptographyService {
  SHA256(message: string): Promise<string>
}