import { EmptyState } from '@/app/components/EmptyState'
import ClientOnly from '@/app/components/ClientOnly'

import getCurrentUser from '@/app/actions/getCurrentUser'
import getReservations from '@/app/actions/getReservations'
import TripsClient from './ProppertiesClient'
import getListings from '../actions/getListings'

const TripsPage = async () => {
  const currentUser = await getCurrentUser()

  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState title="Unauthorized" subtitle="Please login" />
      </ClientOnly>
    )
  }

  const listings = await getListings({
    userId: currentUser.id,
  })

  if (listings.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title="No properties found"
          subtitle="Looks like you havnt reserved any trips"
        />
      </ClientOnly>
    )
  }

  return (
    <ClientOnly>
      <TripsClient properties={properties} currentUser={currentUser} />
    </ClientOnly>
  )
}
export default TripsPage
