/*!
 * Copyright © 2022 United States Government as represented by the Administrator
 * of the National Aeronautics and Space Administration. No copyright is claimed
 * in the United States under Title 17, U.S. Code. All Other Rights Reserved.
 *
 * SPDX-License-Identifier: NASA-1.3
 */
import type { DataFunctionArgs } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'

import CredentialCard from '~/components/CredentialCard'
import {
  NewCredentialForm,
  handleCredentialActions,
  handleCredentialLoader,
} from '~/components/NewCredentialForm'
import SegmentedCards from '~/components/SegmentedCards'

export const handle = {
  breadcrumb: 'Select Credentials',
  getSitemapEntries: () => null,
}

export const loader = handleCredentialLoader

export async function action({ request }: DataFunctionArgs) {
  return handleCredentialActions(request, 'quickstart')
}

export default function () {
  const { client_credentials } = useLoaderData<typeof loader>()

  const explanation = (
    <>
      Client credentials allow your scripts to interact with GCN on your behalf.
    </>
  )

  return (
    <>
      {client_credentials.length > 0 ? (
        <>
          <p className="usa-paragraph">
            {explanation} Select one of your existing client credentials, or
            create a new one.
          </p>
          <SegmentedCards>
            {client_credentials.map((credential) => (
              <CredentialCard key={credential.client_id} {...credential} />
            ))}
          </SegmentedCards>
          <div className="padding-2" key="new">
            <strong>New client credentials....</strong>
            <NewCredentialForm />
          </div>
        </>
      ) : (
        <>
          <p className="usa-paragraph">{explanation}</p>
          <NewCredentialForm />
        </>
      )}
    </>
  )
}
