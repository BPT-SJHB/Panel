export interface SignUpWithPasswordDTO {
  username: string;
  password: string;
  departmentId: number;
}

export interface LoginWithPasswordDTO {
  username: string;
  password: string;
}

export interface LoginWithNoAuthDTO {
  username: string;
  departmentId: number;
}

export interface GenerateSingleUseTokenDTO {
  username: string;
}

export interface SingleUseTokenResponseDTO {
  token: string;
}

export interface CheckedToken {
  permissions?: string[];
  phoneNumber?: string;
  phoneVerified: boolean;
  roleIds?: number[];
  tokenType: string;
  userId?: number;
  username?: string;
  valid: boolean;
}
