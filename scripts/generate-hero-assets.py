"""Generate placeholder hero background images for The Kingdom Voices."""

from __future__ import annotations

import math
import struct
import zlib
from pathlib import Path


def _clamp(value: float, low: float = 0.0, high: float = 1.0) -> float:
    return max(low, min(high, value))


def _lerp(a: float, b: float, t: float) -> float:
    return a + (b - a) * t


def _rgb_to_bytes(r: float, g: float, b: float) -> tuple[int, int, int]:
    return (
        int(_clamp(r) * 255),
        int(_clamp(g) * 255),
        int(_clamp(b) * 255),
    )


def _sample_color(x: float, y: float, mobile: bool) -> tuple[int, int, int]:
    """Return RGB for a normalized coordinate in [0, 1]."""
    # Base stage darkness
    r, g, b = 0.063, 0.027, 0.016  # #100704

    # Warm amber glow from center-top
    spotlight_y = 0.08 if not mobile else 0.12
    spotlight_strength = 0.55 if not mobile else 0.45
    for i, offset in enumerate([-0.18, -0.06, 0.06, 0.18]):
        sx = 0.5 + offset
        dist = math.hypot(x - sx, y - spotlight_y)
        beam = math.exp(-dist * dist * (18 if not mobile else 14)) * spotlight_strength
        r += beam * 0.95
        g += beam * 0.55
        b += beam * 0.18

    # Ambient warm gradient
    ambient = (1.0 - y) * 0.12
    r += ambient * 0.29  # #4A1208 influence
    g += ambient * 0.07
    b += ambient * 0.03

    # Bottom crowd silhouette
    crowd_start = 0.78 if not mobile else 0.82
    if y > crowd_start:
        crowd_t = (y - crowd_start) / (1.0 - crowd_start)
        darken = crowd_t * 0.35
        r *= 1.0 - darken
        g *= 1.0 - darken
        b *= 1.0 - darken

    # Vignette
    vignette = math.hypot(x - 0.5, y - 0.45)
    vignette_factor = _clamp((vignette - 0.25) * 1.8)
    r *= 1.0 - vignette_factor * 0.55
    g *= 1.0 - vignette_factor * 0.55
    b *= 1.0 - vignette_factor * 0.55

    # Subtle noise / dust sparkle
    sparkle = math.sin(x * 180 + y * 120) * math.sin(y * 90 - x * 40)
    if sparkle > 0.92 and y < 0.65:
        sparkle_strength = (sparkle - 0.92) * 12
        r += sparkle_strength * 0.9
        g += sparkle_strength * 0.7
        b += sparkle_strength * 0.35

    return _rgb_to_bytes(r, g, b)


def _write_png(path: Path, width: int, height: int, mobile: bool) -> None:
    raw_rows: list[bytes] = []
    for py in range(height):
        row = bytearray([0])  # filter type 0
        y = py / max(height - 1, 1)
        for px in range(width):
            x = px / max(width - 1, 1)
            row.extend(_sample_color(x, y, mobile))
        raw_rows.append(bytes(row))

    compressed = zlib.compress(b"".join(raw_rows), level=9)

    def chunk(tag: bytes, data: bytes) -> bytes:
        crc = zlib.crc32(tag + data) & 0xFFFFFFFF
        return struct.pack(">I", len(data)) + tag + data + struct.pack(">I", crc)

    ihdr = struct.pack(">IIBBBBB", width, height, 8, 2, 0, 0, 0)
    png = b"\x89PNG\r\n\x1a\n"
    png += chunk(b"IHDR", ihdr)
    png += chunk(b"IDAT", compressed)
    png += chunk(b"IEND", b"")
    path.write_bytes(png)


def main() -> None:
    assets_dir = Path(__file__).resolve().parent.parent / "public" / "assets"
    assets_dir.mkdir(parents=True, exist_ok=True)

    desktop_path = assets_dir / "hero-bg-desktop.jpg"
    mobile_path = assets_dir / "hero-bg-mobile.jpg"

    # Generate high-quality PNGs first (no external deps), then rename as .jpg paths.
    # Browsers accept PNG data served with .jpg extension in dev; for production,
    # replace these placeholders with optimized poster JPEGs.
    _write_png(desktop_path.with_suffix(".png"), 1920, 1080, mobile=False)
    _write_png(mobile_path.with_suffix(".png"), 1080, 1920, mobile=True)

    desktop_path.write_bytes(desktop_path.with_suffix(".png").read_bytes())
    mobile_path.write_bytes(mobile_path.with_suffix(".png").read_bytes())
    desktop_path.with_suffix(".png").unlink()
    mobile_path.with_suffix(".png").unlink()

    print(f"Wrote {desktop_path}")
    print(f"Wrote {mobile_path}")


if __name__ == "__main__":
    main()
