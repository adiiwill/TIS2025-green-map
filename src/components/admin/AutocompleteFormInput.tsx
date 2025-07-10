import { FormEvent, FunctionComponent, useCallback, useState } from 'react'

import { cn, Input, Listbox, ListboxItem } from '@heroui/react'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { useMapsLibrary } from '@vis.gl/react-google-maps'

import { useAutocompleteSuggestions } from '../map/hooks/use-autocomplete-suggestions'

interface AutocompleteFormInputProps {
  onPlaceSelect: (place: google.maps.places.Place | null) => void
  className?: string
  onChange?: (value: string) => void
  onBlur?: () => void
  value?: string
}

export const AutocompleteFormInput: FunctionComponent<AutocompleteFormInputProps> = ({
  onPlaceSelect,
  className,
  onChange,
  onBlur,
  value
}) => {
  const places = useMapsLibrary('places')

  const [inputValue, setInputValue] = useState<string>(value as string)
  const [hasUserInteracted, setHasUserInteracted] = useState(false)
  const { suggestions, resetSession } = useAutocompleteSuggestions(inputValue)

  const handleInput = useCallback((event: FormEvent<HTMLInputElement>) => {
    setInputValue((event.target as HTMLInputElement).value)
    setHasUserInteracted(true)
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

      setInputValue(suggestion.placePrediction.text.text)
      setHasUserInteracted(false) // Reset interaction state after selection
      resetSession()
      onPlaceSelect(place)
    },
    [places, onPlaceSelect, resetSession]
  )

  const handleFocus = useCallback(() => {
    setHasUserInteracted(true)
  }, [])

  return (
    <div className={cn(className || 'w-full p-5 gap-0.5')}>
      <Input
        value={inputValue}
        onInput={handleInput}
        onFocus={handleFocus}
        placeholder="Search for a place"
        className="w-full"
        variant="faded"
        radius="sm"
        size="lg"
        startContent={<MagnifyingGlassIcon className="w-6 h-6 text-gray-500" />}
        onChange={() => onChange}
        onBlur={() => onBlur}
      />

      {suggestions.length > 0 && hasUserInteracted && (
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
