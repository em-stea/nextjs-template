import type {NextConfig} from "next";

import {withTailwindMergeConfig} from "@/shared/lib/tw-merge/helpers";

const nextConfig: NextConfig = {
  reactCompiler: true,
  cacheComponents: true,
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
};

export default withTailwindMergeConfig(nextConfig);
