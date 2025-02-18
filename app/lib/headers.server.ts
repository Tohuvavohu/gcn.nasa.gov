/*!
 * Copyright © 2022 United States Government as represented by the Administrator
 * of the National Aeronautics and Space Administration. No copyright is claimed
 * in the United States under Title 17, U.S. Code. All Other Rights Reserved.
 *
 * SPDX-License-Identifier: NASA-1.3
 */

/**
 * HTTP headers for static, long-lived data.
 */
export const publicStaticCacheControlHeaders = {
  'Cache-Control': 'public, max-age=315360000',
}

/**
 * Get HTTP headers for declaring the canonical URL to search engines.
 *
 * This adds HTTP headers that are equivalent to the HTML
 * <link rel="canonical"> tag.
 *
 * @see https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls#rel-canonical-header-method
 */
export function getCanonicalUrlHeaders(url: string | URL) {
  return {
    Link: `<${url}>; rel="canonical"`,
  }
}

/**
 * Get HTTP Basic auth request headers for a username and password.
 *
 * @see https://datatracker.ietf.org/doc/html/rfc7617
 */
export function getBasicAuthHeaders(username: string, password: string) {
  if (username.includes(':'))
    throw new Error('Usernames for basic auth must not contain colons')
  const userpass = Buffer.from(`${username}:${password}`).toString('base64')
  return { Authorization: `Basic ${userpass}` }
}
