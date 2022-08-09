module.exports = {
  images: {
    domains: ['static.ghost.org'],
  },
  swcMinify: true,
  async redirects() {
    return [
      {
        source: '/',
        destination: '/quest',
        permanent: false,
      },
    ];
  },
};
