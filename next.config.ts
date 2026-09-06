import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // Keeps `next build` from spawning extra worker child-processes on
    // low-memory hosts (each worker is a full Node.js process with its own
    // V8 heap). Default is `os.cpus().length - 1`, which is fine on a
    // normal dev/CI machine but can push builds past available RAM on a
    // small production VPS (see README/deploy notes).
    cpus: 1,
    // Lets Next further throttle worker/task concurrency based on actual
    // free memory rather than CPU count alone.
    memoryBasedWorkersCount: true,
  },
};

export default nextConfig;
