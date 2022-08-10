module.exports = {
  images: {
    domains: ['static.ghost.org'],
  },
  swcMinify: false,
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
