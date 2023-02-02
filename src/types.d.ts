interface ValidProfile {
    id: string,
    displayName: string,
    name: {
        familyName: string, givenName: string
    },
    photos: [
        {
            value: string
        }
    ],
    provider: string,
    _raw: string,
    _json: {
        sub: string,
        name: string,
        given_name: string,
        family_name: string,
        picture: string,
        locale: string
    }
}