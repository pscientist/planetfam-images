# PlanetFam Practice Pack

A practice project for serving images with a manifest + caching headers.

## Structure
- public/manifest.json — list of images with metadata
- public/images/ — placeholder images
- vercel.json — caching headers for Vercel
- api/manifest.js — optional dynamic manifest route with ETag support
- src/manifestClient.ts — React Native helper to fetch + cache manifest

## How to Use
1. Replace placeholder images in public/images/ with your real .webp files.
2. Update manifest.json with new entries and file hashes.
3. Deploy to Vercel. Vercel will serve static files with proper caching and ETag.
4. In your app, use loadManifest() from manifestClient.ts to fetch and cache manifest data.
