export interface GoogleSignIn {
    email:          string;
    familyName:     string;
    givenName:      string;
    id:             string;
    imageUrl:       string;
    name:           string;
    authentication: Authentication;
    serverAuthCode: string;
}

export interface Authentication {
    accessToken:  string;
    idToken:      string;
    refreshToken: string;
}

export interface TokenInfo {
    azp:            string;
    aud:            string;
    sub:            string;
    scope:          string;
    exp:            string;
    expires_in:     string;
    email:          string;
    email_verified: string;
    access_type:    string;
}
