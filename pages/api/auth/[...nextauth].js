import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google"
export default NextAuth({
    providers:[
        GoogleProvider[{
            clientId:'186741013778-bh3ph6mmpj4si62e0ejktopeqdqq0tfl.apps.googleusercontent.com',
            clientSecret:'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'
        }]
    ]
})