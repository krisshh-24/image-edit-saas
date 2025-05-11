'use client'
import React from 'react'
import { toast } from 'sonner'
import { CldImage, CldUploadWidget } from 'next-cloudinary'

import Image from 'next/image'
import { dataUrl, getImageSize } from '@/lib/utils'
import { PlaceholderValue } from 'next/dist/shared/lib/get-img-props'

type MediaUploaderProps = {
    onValueChange: (value: string) => void;
    setImage:React.Dispatch<any>;
    publicId: string;
    image: any;
    type: string;
}
const MediaUploader = ({
    onValueChange,
    setImage,
    image,
    publicId,
    type
}:MediaUploaderProps) => {
    const onUploadSuccessHandler = (result: any) => {
        setImage((prevState: any) => ({
            ...prevState,
            publicId: result?.info?.public_id,
            secureUrl: result?.info?.secure_url,
            width: result?.info?.width,
            height: result?.info?.height
        }))
        onValueChange(result?.info?.public_id)
  toast('Image uploaded sucessfully',{
    description:'1 Credit will be deducted from your account',
            className:"bg-green-100 text-green-900"
        })
        
    }
    const onUploadErrorHandler = (error: any) => {
        toast('Something went wrong while uploading',{
            className:"bg-red-100 text-red-900"
        })
    }
  return (
  <CldUploadWidget 

  uploadPreset="smartcut"
  options={{
    multiple: false,
    resourceType: "image",
  }}
  onSuccess={onUploadSuccessHandler}
  onError={onUploadErrorHandler}
>
  {({ open }) => (
    <div className="flex flex-col gap-4">
      <h3 className="text-2xl font-semibold text-gray-800">Original</h3>

      {publicId ? (
        <div className="overflow-hidden rounded-2xl">
          <CldImage
            width={getImageSize(type, image, "width")}
            height={getImageSize(type, image, "height")}
            src={publicId}
            alt="Uploaded Image"
            sizes="(max-width:767px)100vw,50vw"
            placeholder={dataUrl as PlaceholderValue}
            className="h-fit min-h-72 w-full rounded-2xl border border-gray-200 object-cover"
          />
        </div>
      ) : (
        <div
          onClick={() => open()}
          className="group flex h-72 w-full cursor-pointer flex-col items-center justify-center gap-4 rounded-2xl border border-dashed border-gray-300 bg-white px-4 py-6 text-gray-600 shadow-md transition hover:border-gray-400 hover:shadow-lg"
        >
          <div className="rounded-full bg-gray-100 p-4 shadow-sm transition group-hover:bg-gray-200">
            <Image
              src="/assets/icons/add.svg"
              alt="Add Image"
              width={32}
              height={32}
            />
          </div>
          <p className="text-sm text-gray-600 group-hover:text-gray-800">
            Click to upload image
          </p>
        </div>
      )}
    </div>
  )}
</CldUploadWidget>



  )
}

export default MediaUploader