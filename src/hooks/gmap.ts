import { env } from '@/env'
import { useJsApiLoader } from '@react-google-maps/api'
import { useEffect, useState } from 'react'

export const useGmapAutoComplete = (autocompleteRef: HTMLInputElement) => {
  const [placeResult, setPlaceResult] = useState<{ lat?: number; lng?: number; placeId?: string }>()
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY,
    libraries: ['places']
  })

  const [autoComplete, setAutoComplete] = useState<google.maps.places.Autocomplete | null>(null)

  useEffect(() => {
    if (isLoaded) {
      const newAutoComplete = new google.maps.places.Autocomplete(autocompleteRef as unknown as HTMLInputElement, {
        componentRestrictions: { country: 'my' },
        fields: ['formatted_address', 'geometry', 'place_id']
      })
      setAutoComplete(newAutoComplete)
    }
  }, [autocompleteRef, isLoaded])

  useEffect(() => {
    if (autoComplete) {
      autoComplete.addListener('place_changed', () => {
        const place = autoComplete.getPlace()
        const lat = place.geometry?.location?.lat()
        const lng = place.geometry?.location?.lng()
        const placeId = place.place_id

        setPlaceResult({
          lat,
          lng,
          placeId
        })
      })
    }
  }, [autoComplete])

  return {
    placeResult
  }
}
