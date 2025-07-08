import { FunctionComponent, useEffect, useState } from 'react'

import { Controller, SubmitHandler, useForm } from 'react-hook-form'

import { Button, Form, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@heroui/react'
import { TimeInput } from '@heroui/react'
import { ScrollShadow } from '@heroui/react'
import { ClockIcon } from '@heroicons/react/24/outline'
import { MinusIcon } from '@heroicons/react/24/solid'
import { Time } from '@internationalized/date'
import { isValidPhoneNumber } from 'libphonenumber-js'

import { CustomPhoneInput } from './style.ts'
import { POI } from '../../../store/poiStore'
import { usePOIStore } from '../../../store/poiStore'
import { formatTime, parseTimeFormat } from '../../../utils/timeUtils'
import FormInput from '../../common/FormInput'
import { AutocompleteFormInput } from '../AutocompleteFormInput.tsx'

import 'react-international-phone/style.css'

interface PoiFormModalProps {
  item?: POI
  onClose: () => void
}

interface Inputs {
  name: string
  category: string
  subCategory: string
  description: string
  url: string
  email: string
  phoneNumber: string
  address: string
  openingTime: Time | null
  closingTime: Time | null
  openingHours: string
}

const PoiFormModal: FunctionComponent<PoiFormModalProps> = ({ item, onClose }) => {
  const { updatePoi, addPoi } = usePOIStore()

  const [selectedPlace, setSelectedPlace] = useState<google.maps.places.Place | null>(null)

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors }
  } = useForm<Inputs>()

  useEffect(() => {
    if (item?.openingHours) {
      const times = item.openingHours.split('-')
      const openTime = parseTimeFormat(times[0])
      const closeTime = parseTimeFormat(times[1])

      setOpeningTime(openTime)
      setClosingTime(closeTime)

      // Set the form values too
      setValue('openingTime', openTime)
      setValue('closingTime', closeTime)
    }
  }, [item, setValue])

  const [openingTime, setOpeningTime] = useState<Time | null>(
    item?.openingHours ? parseTimeFormat(item.openingHours.split('-')[0]) : null
  )
  const [closingTime, setClosingTime] = useState<Time | null>(
    item?.openingHours ? parseTimeFormat(item.openingHours.split('-')[1]) : null
  )

  const onSubmit: SubmitHandler<Inputs> = async (data: Inputs) => {
    const formattedData: Omit<POI, 'id'> | POI = {
      ...(item && { id: item.id }),
      name: data.name,
      category: data.category,
      subCategory: data.subCategory,
      description: data.description,
      url: data.url,
      email: data.email,
      phoneNumber: data.phoneNumber,
      address: selectedPlace?.formattedAddress as string,
      longitude: Number(selectedPlace?.location?.lng()),
      latitude: Number(selectedPlace?.location?.lat()),
      openingHours: `${formatTime(openingTime)}-${formatTime(closingTime)}`
    }

    if (item) {
      updatePoi(formattedData as POI)
    } else {
      addPoi(formattedData as POI)
    }

    onClose()
  }

  return (
    <ModalContent>
      <ModalHeader className="text-2xl">
        {item ? `Editing "${item.name}"` : 'Add new'}
      </ModalHeader>
      <ModalBody>
        <ScrollShadow>
          <Form
            id="poi-form"
            onSubmit={handleSubmit(onSubmit)}
            className="flex items-center xl:grid gap-y-6 xl:gap-y-5 xl:gap-x-4 xl:grid-cols-2 max-h-[500px] xl:max-h-screen py-4"
          >
            <FormInput
              label="Name"
              register={register('name', {
                required: { value: true, message: 'Field is required' }
              })}
              error={errors.name}
              defaultValue={item && item.name}
              placeholder=" "
              classNames={{ label: '!text-black font-merryweather text-md' }}
              className="col-start-1 row-start-1 w-[90%]"
            />

            <FormInput
              label="Category"
              register={register('category', {
                required: { value: true, message: 'Field is required' }
              })}
              error={errors.category}
              defaultValue={item && item.category}
              placeholder=" "
              classNames={{ label: '!text-black font-merryweather text-md' }}
              className="col-start-1 row-start-2 w-[90%]"
            />

            <FormInput
              label="Description"
              register={register('description', {
                required: { value: true, message: 'Field is required' }
              })}
              error={errors.description}
              defaultValue={item && item.description}
              placeholder=" "
              classNames={{ label: '!text-black font-merryweather text-md' }}
              className="col-start-1 row-start-4 w-[90%]"
            />

            <FormInput
              label="E-mail"
              register={register('email', {
                required: { value: true, message: 'Field is required' },
                pattern: {
                  value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                  message: 'Invalid email address'
                }
              })}
              error={errors.email}
              defaultValue={item && item.email}
              placeholder="Eg. myemail@gmail.com"
              classNames={{ label: '!text-black font-merryweather text-md' }}
              className="col-start-1 row-start-5 w-[90%]"
            />

            {/*<FormInput*/}
            {/*  label="Address"*/}
            {/*  register={register('address', {*/}
            {/*    required: { value: true, message: 'Field is required' }*/}
            {/*  })}*/}
            {/*  error={errors.address}*/}
            {/*  defaultValue={item && item.address}*/}
            {/*  placeholder=" "*/}
            {/*  classNames={{ label: '!text-black font-merryweather text-md' }}*/}
            {/*  className="col-start-1 row-start-3 w-[90%]"*/}
            {/*/>*/}
            <div className="col-start-1 row-start-3 w-[90%] z-40">
              <span className="font-merryweather">Address</span>
              <Controller
                control={control}
                name="address"
                defaultValue={item && item.address}
                render={({ field: { onChange, onBlur, value } }) => (
                  <AutocompleteFormInput
                    onPlaceSelect={setSelectedPlace}
                    className="p-0 w-full mt-1 relative"
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                  />
                )}
              />
              <p className="text-red-600 text-sm mt-1">{errors.address?.message}</p>
            </div>

            <FormInput
              label="Subcategory"
              register={register('subCategory', {
                required: { value: true, message: 'Field is required' }
              })}
              error={errors.subCategory}
              defaultValue={item && item.subCategory}
              placeholder=" "
              classNames={{ label: '!text-black font-merryweather text-md' }}
              className="col-start-2 row-start-3 w-[90%]"
            />
            <FormInput
              label="URL"
              register={register('url', {
                required: { value: true, message: 'Field is required' },
                pattern: {
                  value: /^www\.[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: 'Enter a valid URL'
                }
              })}
              error={errors.url}
              defaultValue={item && item.url}
              placeholder="Eg. www.example.com"
              classNames={{ label: '!text-black font-merryweather text-md' }}
              className="col-start-2 row-start-4 w-[90%]"
            />

            <div className="col-start-2 row-start-2 w-[90%] z-40">
              <span className="font-merryweather">Phone number</span>
              <Controller
                control={control}
                name="phoneNumber"
                rules={{
                  validate: (value) => {
                    if (!isValidPhoneNumber(value, 'HU')) {
                      return 'Please enter a valid phone number'
                    }

                    return true
                  }
                }}
                defaultValue={item && item.phoneNumber}
                render={({ field: { onChange, onBlur, value } }) => (
                  <CustomPhoneInput
                    defaultCountry="hu"
                    value={value}
                    onBlur={onBlur}
                    onChange={onChange}
                    className="font-lato mt-1 w-full"
                  />
                )}
              />
              <p className="text-red-600 text-sm mt-1">{errors.phoneNumber?.message}</p>
            </div>

            <div className="flex flex-row items-center gap-1 col-start-2 row-start-5 w-[90%] xl:-translate-y-[2px] relative">
              <div className="w-full">
                <Controller
                  name="openingTime"
                  control={control}
                  rules={{
                    required: { value: true, message: 'Field is required' }
                  }}
                  render={({ field: { onChange, onBlur } }) => (
                    <TimeInput
                      value={openingTime ?? null}
                      onChange={(val) => {
                        onChange(val)
                        setOpeningTime(val)
                      }}
                      onBlur={onBlur}
                      endContent={<ClockIcon className="w-6 h-6" />}
                      radius="sm"
                      hourCycle={12}
                      labelPlacement="outside"
                      label="Opening time"
                      classNames={{ label: 'text-md font-merryweather' }}
                      className="w-full"
                    />
                  )}
                />
                {errors.openingTime && (
                  <p className="text-red-600 text-sm mt-1">{errors.openingTime.message}</p>
                )}
              </div>
              <MinusIcon className="w-4 mt-8" />
              <div className="w-full">
                <Controller
                  name="closingTime"
                  control={control}
                  rules={{
                    required: { value: true, message: 'Field is required' }
                  }}
                  render={({ field: { onChange, onBlur } }) => (
                    <TimeInput
                      value={closingTime ?? null}
                      onChange={(val) => {
                        onChange(val)
                        setClosingTime(val)
                      }}
                      onBlur={onBlur}
                      endContent={<ClockIcon className="w-6 h-6" />}
                      radius="sm"
                      hourCycle={12}
                      labelPlacement="outside"
                      label="Closing time"
                      classNames={{ label: 'text-md font-merryweather' }}
                      className="w-full"
                    />
                  )}
                />
                {errors.closingTime && (
                  <p className="text-red-600 text-sm mt-1">{errors.closingTime.message}</p>
                )}
              </div>
            </div>
          </Form>
        </ScrollShadow>
      </ModalBody>
      <ModalFooter>
        <Button
          variant="bordered"
          color="default"
          className="font-bold font-merryweather text-gray-600 text-md w-[220px]"
          onPress={onClose}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          form="poi-form"
          className="bg-mainGreen text-white font-bold font-merryweather text-md w-[220px]"
        >
          {item ? 'Modify' : 'Add new'}
        </Button>
      </ModalFooter>
    </ModalContent>
  )
}

export default PoiFormModal
