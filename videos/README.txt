Hero background video
=====================

Add your looping hero files here and reference them from src/content/homeBlocks/hero.md, for example:

  videoWebm: /videos/hero.webm
  videoMp4: /videos/hero.mp4
  videoPoster: /images/hero-poster.jpg   (optional; first frame or still)

Tips:
- Keep files small (heavy compression, short loop, 720p–1080p max).
- No audio track, or a silent track — the <video> is muted for autoplay policies.
- Prefer WebM (VP9) + MP4 (H.264) for coverage.
- Browsers block autoplay with sound; muted + playsInline is required.

