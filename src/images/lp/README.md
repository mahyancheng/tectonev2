# Meta Ads Landing Page — Setup

## Meta Pixel
Add this line to `.env` (root of repo) to start firing Meta Pixel events from `/lp/security-screen`:

```
VITE_META_PIXEL_ID=your_pixel_id_here
```

The page already fires:
- `PageView` on load
- `Contact` on every WhatsApp / phone CTA click (with `method` + `source` params)
- `Lead` on quick-quote form submit (with `property_type` param)

Restart `npm run dev` after adding the env var.

## Image Slots

Drop the 5 hero/gallery images shared in chat into THIS folder using these exact filenames:

- `hero-living-room.jpg` — woman relaxing by sliding screen door (curtains billowing)
- `gallery-exterior-villa.jpg` — exterior view, dark-frame sliding screens on white villa
- `gallery-garden.jpg` — living room screens looking out to garden + trees
- `gallery-detail.jpg` — close-up detail of the mesh + track mechanism
- `gallery-balcony.jpg` — apartment exterior at dusk with screens + tropical plants

The page (`SecurityScreenLandingPage.tsx`) imports these paths and falls back to existing site images if any are missing — so you can ship the page without these in place, but adding them will sharpen the ad-creative-to-landing-page match.

After adding the files, the dev server will hot-reload automatically.
