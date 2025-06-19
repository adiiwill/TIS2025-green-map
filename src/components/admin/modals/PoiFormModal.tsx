import { FunctionComponent, useState } from 'react'

import { Controller, SubmitHandler, useForm } from 'react-hook-form'

import { Button, Form, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@heroui/react'
import { TimeInput } from '@heroui/react'
import { ScrollShadow } from '@heroui/react'
import { ClockIcon } from '@heroicons/react/24/outline'
import { MinusIcon } from '@heroicons/react/24/solid'
import { Time } from '@internationalized/date'

import { CustomPhoneInput } from './style.ts'
import { POI } from '../../../store/poiStore'
import { formatTime, parseTimeFormat } from '../../../utils/timeUtils'
import FormInput from '../../common/FormInput'

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
  openingHours: string
  longitude: number
  latitude: number
}

const PoiFormModal: FunctionComponent<PoiFormModalProps> = ({ item, onClose }) => {
  const [openingTime, setOpeningTime] = useState<Time | null>(
    item?.openingHours ? parseTimeFormat(item.openingHours.split('-')[0]) : null
  )
  const [closingTime, setClosingTime] = useState<Time | null>(
    item?.openingHours ? parseTimeFormat(item.openingHours.split('-')[1]) : null
  )

  const {
    register,
    handleSubmit,
    control,
    formState: { errors }
  } = useForm<Inputs>()

  const onSubmit: SubmitHandler<Inputs> = async (data: Inputs) => {
    const formattedData = {
      ...data,
      openingHours: `${formatTime(openingTime)}-${formatTime(closingTime)}`
    }
    console.log(formattedData)
  }

  return (
    <ModalContent>
      <ModalHeader>{item ? `Editing "${item.name}"` : 'Add new'}</ModalHeader>
      <ModalBody>
        <ScrollShadow>
          <Form
            onSubmit={handleSubmit(onSubmit)}
            className="grid grid-cols-1 grid-rows-6 xl:grid-cols-2 gap-4 max-h-[500px] pt-1"
          >
            <FormInput
              label="Name"
              register={register('name', {
                required: { value: true, message: 'Field is required' }
              })}
              error={errors.name}
              defaultValue={item && item.name}
              classNames={{ label: '!text-black font-merryweather text-md' }}
              className="col-start-1 row-start-1"
            />

            <FormInput
              label="Category"
              register={register('category', {
                required: { value: true, message: 'Field is required' }
              })}
              error={errors.category}
              defaultValue={item && item.category}
              classNames={{ label: '!text-black font-merryweather text-md' }}
              className="col-start-1 row-start-2"
            />

            <FormInput
              label="Description"
              register={register('description', {
                required: { value: true, message: 'Field is required' }
              })}
              error={errors.description}
              defaultValue={item && item.description}
              classNames={{ label: '!text-black font-merryweather text-md' }}
              className="col-start-1 row-start-3"
            />

            <FormInput
              label="E-mail"
              register={register('email', {
                required: { value: true, message: 'Field is required' }
              })}
              error={errors.email}
              defaultValue={item && item.email}
              classNames={{ label: '!text-black font-merryweather text-md' }}
              className="col-start-1 row-start-4"
            />

            <FormInput
              label="Address"
              register={register('address', {
                required: { value: true, message: 'Field is required' }
              })}
              error={errors.address}
              defaultValue={item && item.address}
              classNames={{ label: '!text-black font-merryweather text-md' }}
              className="col-start-1 row-start-5"
            />

            <FormInput
              label="Longitude"
              register={register('longitude', {
                required: { value: true, message: 'Field is required' }
              })}
              error={errors.longitude}
              defaultValue={item && `${item.longitude}`}
              classNames={{ label: '!text-black font-merryweather text-md' }}
              className="col-start-1 row-start-6"
            />

            <FormInput
              label="Subcategory"
              register={register('subCategory', {
                required: { value: true, message: 'Field is required' }
              })}
              error={errors.subCategory}
              defaultValue={item && item.subCategory}
              classNames={{ label: '!text-black font-merryweather text-md' }}
              className="col-start-2 row-start-2"
            />
            <FormInput
              label="URL"
              register={register('url', {
                required: { value: true, message: 'Field is required' }
              })}
              error={errors.url}
              defaultValue={item && item.url}
              classNames={{ label: '!text-black font-merryweather text-md' }}
              className="col-start-2 row-start-3"
            />

            {/*  TODO: Phone number  */}
            <div className="col-start-2 row-start-4 -translate-y-1">
              <span className="font-merryweather">Phone number</span>
              <Controller
                control={control}
                name="phoneNumber"
                defaultValue={item && item.phoneNumber}
                render={({ field: { onChange, onBlur, value } }) => (
                  <CustomPhoneInput
                    defaultCountry="hu"
                    value={value}
                    onBlur={onBlur}
                    onChange={onChange}
                    className="font-lato mt-1"
                  />
                )}
              />
            </div>

            {/*  TODO: Opening hours  */}
            <div className="flex flex-row gap-1 col-start-2 row-start-5 self-end -translate-y-[0.30rem]">
              <TimeInput
                endContent={<ClockIcon className="w-6 h-6" />}
                radius="sm"
                hourCycle={12}
                labelPlacement="outside"
                label="Opening hours"
                classNames={{
                  label: 'text-md font-merryweather'
                }}
                value={openingTime}
                onChange={setOpeningTime}
              />
              <MinusIcon className="w-4 mt-8" />
              <TimeInput
                endContent={<ClockIcon className="w-6 h-6" />}
                radius="sm"
                hourCycle={12}
                className="mt-7.5"
                value={closingTime}
                onChange={setClosingTime}
              />
            </div>
            <FormInput
              label="Latitude"
              register={register('latitude', {
                required: { value: true, message: 'Field is required' }
              })}
              error={errors.latitude}
              defaultValue={item && `${item.latitude}`}
              classNames={{ label: '!text-black font-merryweather text-md' }}
              className="col-start-2 row-start-6"
            />
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
          className="bg-mainGreen text-white font-bold font-merryweather text-md w-[220px]"
        >
          {item ? 'Modify' : 'Add new'}
        </Button>
      </ModalFooter>
    </ModalContent>
  )
}

export default PoiFormModal
