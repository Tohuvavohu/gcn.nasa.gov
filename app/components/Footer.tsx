/*!
 * Copyright © 2022 United States Government as represented by the Administrator
 * of the National Aeronautics and Space Administration. No copyright is claimed
 * in the United States under Title 17, U.S. Code. All Other Rights Reserved.
 *
 * SPDX-License-Identifier: NASA-1.3
 */
import { Link } from '@remix-run/react'
import type { RemixLinkProps } from '@remix-run/react/dist/components'
import {
  Grid,
  GridContainer,
  Icon,
  Identifier,
  IdentifierGov,
  IdentifierIdentity,
  IdentifierLink,
  IdentifierLinkItem,
  IdentifierLinks,
  IdentifierLogo,
  IdentifierLogos,
  IdentifierMasthead,
} from '@trussworks/react-uswds'
import type { ReactNode } from 'react'

import logo from '~/img/logo.svg'

function ContactLink({
  children,
  headline,
  icon,
  ...props
}: {
  headline: ReactNode
  icon: ReactNode
} & RemixLinkProps &
  React.RefAttributes<HTMLAnchorElement>) {
  return (
    <Grid
      tablet={{ col: true }}
      className="contact-link padding-y-1 tablet:padding-0"
    >
      <div className="usa-media-block">
        <div className="usa-media-block__img circle-6 bg-accent-cool-dark display-flex flex-row flex-align-center flex-justify-center">
          {icon}
        </div>
        <div className="usa-media-block_body">
          {headline}{' '}
          <div className="display-block tablet:display-inline">
            <Link {...props}>{children}</Link>.
          </div>
        </div>
      </div>
    </Grid>
  )
}

export function Footer() {
  return (
    <Identifier>
      <div className="usa-footer__secondary-section text-ink">
        <GridContainer>
          <Grid row gap>
            <ContactLink
              to="/contact"
              icon={<Icon.Help size={4} color={'white'} />}
              headline="Questions or comments?"
            >
              Contact GCN directly
            </ContactLink>
            <ContactLink
              to="https://github.com/nasa-gcn/gcn.nasa.gov/issues"
              icon={<Icon.BugReport size={4} color={'white'} />}
              headline="Have you found a bug in GCN?"
            >
              Open an issue
            </ContactLink>
            <ContactLink
              to="https://github.com/nasa-gcn/gcn.nasa.gov"
              icon={<Icon.Github size={4} color={'white'} />}
              headline="Want to contribute code to GCN?"
            >
              Get involved on GitHub
            </ContactLink>
          </Grid>
        </GridContainer>
      </div>
      <IdentifierMasthead aria-label="Agency identifier">
        <IdentifierLogos>
          <IdentifierLogo href="https://www.nasa.gov">
            <img
              src={logo}
              className="usa-identifier__logo-img"
              alt="NASA logo"
            />
          </IdentifierLogo>
        </IdentifierLogos>
        <IdentifierIdentity domain="gcn.nasa.gov">
          A service of the{' '}
          <a rel="external" href="https://science.gsfc.nasa.gov/astrophysics/">
            Astrophysics Science Division
          </a>{' '}
          at{' '}
          <a rel="external" href="https://www.nasa.gov/">
            NASA
          </a>{' '}
          <a rel="external" href="https://www.nasa.gov/goddard">
            Goddard Space Flight Center
          </a>
        </IdentifierIdentity>
      </IdentifierMasthead>
      <IdentifierLinks navProps={{ 'aria-label': 'Important links' }}>
        <IdentifierLinkItem>
          <IdentifierLink rel="external" href="https://www.nasa.gov/about">
            About NASA
          </IdentifierLink>
        </IdentifierLinkItem>
        <IdentifierLinkItem>
          <IdentifierLink
            rel="external"
            href="https://www.nasa.gov/content/section-508-accessibility-at-nasa"
          >
            Accessibility
          </IdentifierLink>
        </IdentifierLinkItem>
        <IdentifierLinkItem>
          <IdentifierLink
            rel="external"
            href="https://www.nasa.gov/news/budget"
          >
            Budget and Performance
          </IdentifierLink>
        </IdentifierLinkItem>
        <IdentifierLinkItem>
          <IdentifierLink
            rel="external"
            href="https://www.nasa.gov/offices/odeo/no-fear-act"
          >
            No FEAR Act
          </IdentifierLink>
        </IdentifierLinkItem>
        <IdentifierLinkItem>
          <IdentifierLink rel="external" href="https://www.nasa.gov/FOIA">
            FOIA Requests
          </IdentifierLink>
        </IdentifierLinkItem>
        <IdentifierLinkItem>
          <IdentifierLink rel="external" href="https://oig.nasa.gov/">
            Office of the Inspector General
          </IdentifierLink>
        </IdentifierLinkItem>
        <IdentifierLinkItem>
          <IdentifierLink
            rel="external"
            href="https://www.nasa.gov/about/highlights/HP_Privacy.html"
          >
            Privacy Policy
          </IdentifierLink>
        </IdentifierLinkItem>
        <IdentifierLinkItem>
          <IdentifierLink
            rel="external"
            href="https://www.nasa.gov/vulnerability-disclosure-policy"
          >
            Vulnerability Disclosure Policy
          </IdentifierLink>
        </IdentifierLinkItem>
      </IdentifierLinks>
      <IdentifierGov aria-label="U.S. government information and services">
        Looking for U.S. government information and services?{' '}
        <a rel="external" href="https://www.usa.gov">
          Visit USA.gov
        </a>
      </IdentifierGov>
    </Identifier>
  )
}
