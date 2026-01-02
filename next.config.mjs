import createMDX from '@next/mdx';

const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
});

const nextConfig = {
  output: 'export',
  images: { unoptimized: false },
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'mdx'],
};

export default withMDX(nextConfig);
