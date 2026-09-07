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
