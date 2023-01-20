import type { OAuthConfig, OAuthUserConfig } from "next-auth/providers"

/** @see https://docs.github.com/en/rest/users/users#get-the-authenticated-user */
export interface DribbbleProfile extends Record<string, any> {
    login: string
    id: number
    avatar_url: string
    created_at: string | null
    followers_count: string
    html_url: string
    type: string
    name: string | null
    location: string | null
    email: string | null
    bio: string | null
}

export default function Dribbble<P extends DribbbleProfile>(
    options: OAuthUserConfig<P>
): OAuthConfig<P> {
    return {
        id: "dribbble",
        name: "Dribbble",
        type: "oauth",
        authorization: {
            url: "https://dribbble.com/oauth/authorize",
            params: { scope: "public" },
        },
        token: "https://dribbble.com/oauth/token",
        userinfo: {
            url: "https://api.dribbble.com/v2/user",
            async request({ client, tokens }: {client: any, tokens: any }) {
                const profile = await client.userinfo(tokens.access_token!)

                return profile
            },
        },
        profile(profile: any) {
            return {
                id: profile.id.toString(),
                name: profile.name ?? profile.login,
                email: profile.email,
                image: profile.avatar_url,
            }
        },
        style: {
            logo: "https://cdn.dribbble.com/assets/dribbble-ball-icon-4e54c54abecf8efe027abe6f8bc7794553b8abef3bdb49cd15797067cf80ca53.svg",
            logoDark:
                "https://cdn.dribbble.com/assets/dribbble-ball-icon-4e54c54abecf8efe027abe6f8bc7794553b8abef3bdb49cd15797067cf80ca53.svg",
            bg: "#ea4c89",
            bgDark: "#ea4c89",
            text: "#fff",
            textDark: "#fff",
        },
        options,
    }
}
