"""Generate simple PNG icons for HabitPulz PWA using only stdlib."""
import os, struct, zlib

def make_png(size, bg=(15,15,26), fg=(124,106,247)):
    """Create a solid-color PNG with a lightning bolt shape."""
    w = h = size
    raw = []
    cx, cy = w // 2, h // 2
    r = int(w * 0.35)

    for y in range(h):
        row = []
        for x in range(w):
            # Circle background
            dx, dy = x - cx, y - cy
            if dx*dx + dy*dy <= r*r:
                # Simple bolt shape inside circle
                nx = (x - cx) / r
                ny = (y - cy) / r
                # Bolt: top-right to bottom-left zigzag
                in_bolt = (
                    (-0.15 < nx < 0.45 and -0.7 < ny < 0.05) or
                    (-0.45 < nx < 0.15 and -0.05 < ny < 0.7)
                )
                if in_bolt:
                    row += [255, 204, 21]   # yellow bolt
                else:
                    row += list(fg)          # purple circle
            else:
                row += list(bg)              # dark bg
        raw.append(bytes([0] + row))

    def chunk(name, data):
        c = struct.pack('>I', len(data)) + name + data
        return c + struct.pack('>I', zlib.crc32(name + data) & 0xffffffff)

    ihdr = struct.pack('>IIBBBBB', w, h, 8, 2, 0, 0, 0)
    idat = zlib.compress(b''.join(raw))
    return (b'\x89PNG\r\n\x1a\n' +
            chunk(b'IHDR', ihdr) +
            chunk(b'IDAT', idat) +
            chunk(b'IEND', b''))

os.makedirs('icons', exist_ok=True)
for size in [192, 512]:
    with open(f'icons/icon-{size}.png', 'wb') as f:
        f.write(make_png(size))
    print(f'icons/icon-{size}.png created')
print('Done!')
