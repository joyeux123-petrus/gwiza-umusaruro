import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  // A list of all locales that are supported
  locales: ['rw', 'en'],

  // Used when no locale matches
  defaultLocale: 'rw'
});

export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(rw|en)/:path*']
};
