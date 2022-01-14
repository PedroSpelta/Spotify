# Speltify ( Spelta + Spotify )

This project is currently under development. It's a spotify clone made using their Web API to control the app and get most of the information while the Web playback SDK plays and connects to the platform.

The user can listen to their own playlists, search for musics and artists, listing to liked musics, top favorites musics and acess history of played ones.

It uses Next.js with tailwind for front-end,
Context and recoil for state management,
Next-auth for authentications with jwt,
Cheerio for scrapping lyrics,
Some other packages for utilities.

## Preview

Preview the example live on [Vercel](https://spotify.spelta.dev/):

## Instalation and Setup Instructions

Clone down this repository. You will need node and npm installed globally on your machine.

Installation:

```
npm install
```

Go to [Spotify Developer](https://developer.spotify.com/dashboard/applications), create a app and get both client ID and Secret.

![image](https://user-images.githubusercontent.com/80366307/149500805-368e06e7-ae37-41c1-a1db-dc17f5987136.png)

Create a .env.local on the projetct:

```
touch .env.local
```

Then put the data from your spotify app, an auth url, and a jwt secret of yours:

![image](https://user-images.githubusercontent.com/80366307/149500685-8bd97d5c-5aaa-4a8d-b4a9-9ae3b404c9a3.png)



To Start Server:

```
npm run dev
```

To Visit App:

(http://localhost:3000/)
