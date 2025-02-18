/*!
 * Copyright © 2023 United States Government as represented by the Administrator
 * of the National Aeronautics and Space Administration. No copyright is claimed
 * in the United States under Title 17, U.S. Code. All Other Rights Reserved.
 *
 * SPDX-License-Identifier: NASA-1.3
 */
import type { DataFunctionArgs } from '@remix-run/node'
import { Form, Link, useLoaderData, useNavigation } from '@remix-run/react'
import {
  Button,
  ButtonGroup,
  Icon,
  Modal,
  ModalFooter,
  ModalHeading,
  TextInput,
  Textarea,
} from '@trussworks/react-uswds'
import classnames from 'classnames'
import { useState } from 'react'
import dedent from 'ts-dedent'

import { getUser } from '../__auth/user.server'
import { bodyIsValid, formatAuthor, subjectIsValid } from './circulars.lib'
import { group } from './circulars.server'
import { CircularsKeywords } from '~/components/CircularsKeywords'
import Spinner from '~/components/Spinner'
import { useUrl } from '~/root'

export const handle = {
  breadcrumb: 'New',
}

export async function loader({ request }: DataFunctionArgs) {
  const user = await getUser(request)
  let isAuthenticated, isAuthorized, formattedAuthor
  if (user) {
    isAuthenticated = true
    if (user.groups.includes(group)) isAuthorized = true
    formattedAuthor = formatAuthor(user)
  }
  return { isAuthenticated, isAuthorized, formattedAuthor }
}

function useSubjectPlaceholder() {
  const date = new Date()
  const YY = (date.getUTCFullYear() % 1000).toString().padStart(2, '0')
  const MM = (date.getUTCMonth() + 1).toString().padStart(2, '0')
  const DD = date.getUTCDate().toString().padStart(2, '0')
  return `GRB ${YY}${MM}${DD}A: observations of a gamma-ray burst`
}

function useBodyPlaceholder() {
  return dedent(`
    Worf Son of Mogh (Starfleet), Geordi LaForge (Starfleet), Beverly Crusher (Starfleet), Deanna Troi (Starfleet), Data Soong (Starfleet), Isaac Newton (Cambridge), Stephen Hawking (Cambridge), and Albert Einstein (Institute for Advanced Study) report on behalf of a larger collaboration:

    ...
    `)
}

export default function () {
  const { isAuthenticated, isAuthorized, formattedAuthor } =
    useLoaderData<typeof loader>()
  const [subjectValid, setSubjectValid] = useState<boolean | undefined>()
  const [bodyValid, setBodyValid] = useState<boolean | undefined>()
  const [showKeywords, setShowKeywords] = useState(false)
  const sending = Boolean(useNavigation().formData)
  const valid = subjectValid && bodyValid

  function toggleShowKeywords() {
    setShowKeywords(!showKeywords)
  }

  return (
    <>
      <h1>New GCN Circular</h1>
      <Form method="POST" action="/circulars?index">
        <div className="usa-input-group border-0 maxw-full">
          <div className="usa-input-prefix" aria-hidden>
            From
          </div>
          <span className="padding-1">{formattedAuthor}</span>
          <Link
            to="/user"
            title="Adjust how your name and affiliation appear in new GCN Circulars"
          >
            <Button unstyled type="button">
              <Icon.Edit /> Edit
            </Button>
          </Link>
        </div>
        <div
          className={classnames('usa-input-group', 'maxw-full', {
            'usa-input--error': subjectValid === false,
            'usa-input--success': subjectValid,
          })}
        >
          <div className="usa-input-prefix" aria-hidden>
            Subject
          </div>
          <TextInput
            aria-describedby="subjectDescription"
            className="maxw-full"
            name="subject"
            id="subject"
            type="text"
            placeholder={useSubjectPlaceholder()}
            required={true}
            onChange={({ target: { value } }) => {
              setSubjectValid(subjectIsValid(value))
            }}
          />
        </div>
        <div className="text-base margin-bottom-1" id="subjectDescription">
          <small>
            The subject line must contain (and should start with) the name of
            the transient, which must start with one of the{' '}
            <Button
              type="button"
              className="usa-banner__button margin-left-0"
              aria-expanded={showKeywords}
              onClick={toggleShowKeywords}
            >
              <span className="usa-banner__button-text">known keywords</span>
            </Button>
            .
          </small>
          {showKeywords && (
            <div className="text-base padding-x-2 padding-bottom-2">
              <CircularsKeywords />
            </div>
          )}
        </div>
        <label hidden htmlFor="body">
          Body
        </label>
        <Textarea
          name="body"
          id="body"
          aria-describedby="bodyDescription"
          placeholder={useBodyPlaceholder()}
          required={true}
          className={classnames('maxw-full', {
            'usa-input--success': bodyValid,
          })}
          onChange={({ target: { value } }) => {
            setBodyValid(bodyIsValid(value))
          }}
        />
        <div className="text-base margin-bottom-1" id="bodyDescription">
          <small>
            Body text. If this is your first Circular, please review the{' '}
            <Link to="/docs/circulars/styleguide">style guide</Link>.
          </small>
        </div>
        <ButtonGroup>
          <Link to="/circulars" className="usa-button usa-button--outline">
            Back
          </Link>
          <Button disabled={sending || !valid} type="submit">
            Send
          </Button>
          {sending && (
            <div className="padding-top-1 padding-bottom-1">
              <Spinner /> Sending...
            </div>
          )}
        </ButtonGroup>
      </Form>
      {isAuthorized || <ModalUnauthorized isAuthenticated={isAuthenticated} />}
    </>
  )
}

function PeerEndorsementButton() {
  return (
    <Link to="/user/endorsements">
      <Button type="button">Get a peer endorsement</Button>
    </Link>
  )
}

function SignInButton() {
  const url = useUrl()
  return (
    <Link to={`/login?redirect=${encodeURIComponent(url)}`}>
      <Button type="button">Sign in</Button>
    </Link>
  )
}

function ModalUnauthorized({ isAuthenticated }: { isAuthenticated?: boolean }) {
  return (
    <Modal
      id="modal-unauthorized"
      aria-labelledby="modal-unauthorized-heading"
      aria-describedby="modal-unauthorized-description"
      isInitiallyOpen={true}
      forceAction={true}
      renderToPortal={false}
    >
      <ModalHeading id="modal-unauthorized-heading">
        Get started submitting GCN Circulars
      </ModalHeading>
      <p id="modal-unauthorized-description">
        In order to submit a GCN Circular, you must{' '}
        {isAuthenticated || 'sign in and '}
        get a peer endorsement from an existing GCN Circulars user.
      </p>
      <ModalFooter>
        <Link to="/circulars">
          <Button type="button" outline>
            Cancel
          </Button>
        </Link>
        {isAuthenticated ? <PeerEndorsementButton /> : <SignInButton />}
      </ModalFooter>
    </Modal>
  )
}
