import { FormEvent, FunctionComponent, useCallback, useState } from 'react'

import { Input, Listbox, ListboxItem } from '@heroui/react'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { useMapsLibrary } from '@vis.gl/react-google-maps'

import { useAutocompleteSuggestions } from './hooks/use-autocomplete-suggestions'

interface AutocompleteCustomProps {
  onPlaceSelect: (place: google.maps.places.Place | null) => void
  onChange?: (value: string) => void
  onBlur?: () => void
  value?: string
}

export const AutocompleteCustom: FunctionComponent<AutocompleteCustomProps> = ({
  onPlaceSelect,
  onChange,
  onBlur,
  value
}) => {
  const places = useMapsLibrary('places')

  const [inputValue, setInputValue] = useState<string>(value as string)
  const { suggestions, resetSession } = useAutocompleteSuggestions(inputValue)

  const handleInput = useCallback((event: FormEvent<HTMLInputElement>) => {
    setInputValue((event.target as HTMLInputElement).value)
  }, [])

  const handleSuggestionClick = useCallback(
    async (suggestion: google.maps.places.AutocompleteSuggestion) => {
      if (!places) return
      if (!suggestion.placePrediction) return

      const place = suggestion.placePrediction.toPlace()

      await place.fetchFields({
        fields: [
          'viewport',
          'location',
          'svgIconMaskURI',
          'iconBackgroundColor',
          'formattedAddress'
        ]
      })

      setInputValue('')

      // calling fetchFields invalidates the session-token, so we now have to call
      // resetSession() so a new one gets created for further search
      resetSession()

      onPlaceSelect(place)
    },
    [places, onPlaceSelect]
  )

  return (
    <div className="w-screen md:w-full p-5 gap-0.5">
      <Input
        value={inputValue}
        onInput={(event) => handleInput(event)}
        placeholder="Search for a place"
        className="w-full"
        variant="faded"
        radius="sm"
        size="lg"
        startContent={<MagnifyingGlassIcon className="w-6 h-6 text-gray-500" />}
        onChange={() => onChange}
        onBlur={() => onBlur}
      />

      {suggestions.length > 0 && (
        <Listbox className="bg-white border-2 mt-1 border-gray-200 text-xl w-full md:w-min rounded-xl">
          {suggestions.map((suggestion, index) => {
            return (
              <ListboxItem
                key={index}
                className="custom-list-item"
                onClick={() => handleSuggestionClick(suggestion)}
              >
                {suggestion.placePrediction?.text.text}
              </ListboxItem>
            )
          })}
        </Listbox>
      )}
    </div>
  )
}
