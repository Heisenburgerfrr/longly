// Browser-compatible Buffer polyfill fallback
const SafeBuffer = (function () {
  if (typeof Buffer !== "undefined") {
    return Buffer;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function decorate(buf: Uint8Array): any {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const obj = buf as any;

    obj.toString = function (encoding?: string): string {
      if (encoding === "hex") {
        return Array.from(buf)
          .map((b) => b.toString(16).padStart(2, "0"))
          .join("");
      }
      return new TextDecoder().decode(buf);
    };

    obj.equals = function (other: Uint8Array): boolean {
      if (buf.length !== other.length) return false;
      for (let i = 0; i < buf.length; i++) {
        if (buf[i] !== other[i]) return false;
      }
      return true;
    };

    obj.writeUInt32BE = function (value: number, offset: number) {
      buf[offset] = (value >>> 24) & 0xff;
      buf[offset + 1] = (value >>> 16) & 0xff;
      buf[offset + 2] = (value >>> 8) & 0xff;
      buf[offset + 3] = value & 0xff;
      return offset + 4;
    };

    obj.readUInt32BE = function (offset: number): number {
      return (
        ((buf[offset] << 24) |
          (buf[offset + 1] << 16) |
          (buf[offset + 2] << 8) |
          buf[offset + 3]) >>>
        0
      );
    };

    return obj;
  }

  return {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    from(arg: any, encoding?: string) {
      let buf: Uint8Array;
      if (typeof arg === "string") {
        if (encoding === "hex") {
          const len = arg.length / 2;
          buf = new Uint8Array(len);
          for (let i = 0; i < len; i++) {
            buf[i] = parseInt(arg.substring(i * 2, i * 2 + 2), 16);
          }
        } else {
          buf = new TextEncoder().encode(arg);
        }
      } else if (arg instanceof Uint8Array) {
        buf = new Uint8Array(arg);
      } else if (Array.isArray(arg)) {
        buf = new Uint8Array(arg);
      } else {
        buf = new Uint8Array(arg);
      }
      return decorate(buf);
    },

    alloc(size: number) {
      return decorate(new Uint8Array(size));
    },

    concat(list: Uint8Array[]) {
      let totalLength = 0;
      for (const item of list) {
        totalLength += item.length;
      }
      const result = new Uint8Array(totalLength);
      let offset = 0;
      for (const item of list) {
        result.set(item, offset);
        offset += item.length;
      }
      return decorate(result);
    },
  };
})();

// CRC32 table cache
let crcTable: Int32Array | null = null;

function makeTable() {
  const table = new Int32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) {
      if ((c & 1) !== 0) {
        c = 0xedb88320 ^ (c >>> 1);
      } else {
        c = c >>> 1;
      }
    }
    table[n] = c;
  }
  return table;
}

/**
 * Computes standard CRC32 checksum (IEEE 802.3).
 * Accepts Node Buffer or client-side Uint8Array, returns a 4-byte Buffer.
 */
export function crc32(buffer: Buffer | Uint8Array): Buffer {
  if (!crcTable) {
    crcTable = makeTable();
  }

  let crc = 0xffffffff;
  for (let i = 0; i < buffer.length; i++) {
    crc = (crc >>> 8) ^ crcTable[(crc ^ buffer[i]) & 0xff];
  }
  crc = crc ^ 0xffffffff;

  // Allocate 4-byte buffer and write in Big-Endian format
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const output = (SafeBuffer as any).alloc(4);
  output.writeUInt32BE(crc >>> 0, 0);
  return output as Buffer;
}

export { SafeBuffer as Buffer };
