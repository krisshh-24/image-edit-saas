'use client'
import { dataUrl, debounce, download, getImageSize } from '@/lib/utils'
import { CldImage, getCldImageUrl } from 'next-cloudinary'
import { PlaceholderValue } from 'next/dist/shared/lib/get-img-props'
import Image from 'next/image'
import React from 'react'

const TransformedImage = ({image,type,title,transformationConfig,isTransforming,
  setIsTransforming,hasDownload=false}:TransformedImageProps)=>{
    const downloadHandler=(e:React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{ 
      e.preventDefault()
      download(getCldImageUrl({
        width:image?.width,
        height:image?.height,
        src:image?.publicId,
        ...transformationConfig
      }),title)
    }
  return (
    <div className="flex flex-col gap-4">
      <div className='flex justify-between items-center'>
        <h3 className="text-2xl font-semibold text-gray-800">Transformed

        </h3>
        {hasDownload && (
          <button
           className='p-14-medium mt-2 flex items-center gap-2 px-2'
          onClick={downloadHandler}>
             <Image
            src="/assets/icons/download.svg"
            alt="Download"
            width={24}
            height={24}
            className="pb=[6px]"></Image>
            </button>
         
        )
          }
      </div>
      {image?.publicId && transformationConfig ? (
        <div className='relative'>
           <CldImage 
            width={getImageSize(type, image, "width")}
            height={getImageSize(type, image, "height")}
            src={image?.publicId}
              alt={title || "Transformed image"} 
            sizes="(max-width:767px)100vw,50vw"
            placeholder={dataUrl as PlaceholderValue}
            className="h-fit min-h-72 w-full rounded-[10px] border border-dashed bg-purple-100/20 object-cover p-2"
            onLoad={() => {
             setIsTransforming && setIsTransforming(false)
            }}
            onError={() => {
              debounce(()=>{
                setIsTransforming && setIsTransforming(false)
              },8000)()
            }}
            {...transformationConfig}
          />
          {isTransforming && (
            <div className="flex items-center justify-center absolute left-[50%] top-[50%] size-full -translate-x-1/2 -translate-y-1/2 flex-col gap-2 rounded-[10px] border bg-dark-700/90">
              <Image
                src="/assets/icons/spinner.svg"
                alt="spinner"
                width={50}
                height={50}
                className="animate-spin"
              />
              <p className='text-white'>Please wait...</p>
            </div>
          )}
         </div> 
      ):(
<div className="group flex h-72 w-full cursor-default flex-col items-center justify-center gap-4 rounded-2xl border border-dashed border-gray-300 bg-white px-4 py-6 text-gray-600 shadow-md transition hover:border-gray-400 hover:shadow-lg">
  <p className="text-sm text-gray-700 group-hover:text-gray-900 font-medium">
    Transformed Image
  </p>
</div>



      )}
    </div>
  )
}

export default TransformedImage