import Header from '@/components/shared/Header'
import React from 'react'
import { transformationTypes } from '@/constants'
import TransformationForm from '@/components/shared/TransformationForm'
import { auth } from '@clerk/nextjs/server'
import { getUserById } from '@/lib/actions /user.actions'
import { RedirectToSignIn } from '@clerk/nextjs'

const AddTransformationTypePage = async ({
  params,
}: {
  params: Promise<{ type: string }>
}) => {
  const { type } = await params
  const { userId } = await auth()

  if (!userId) {
    return <RedirectToSignIn />
  }

  const user = await getUserById(userId)

  // Type guard to ensure type is a valid key
  if (!(type in transformationTypes)) {
    throw new Error('Invalid transformation type')
  }

  // Now it's safe to index
  const transformation = transformationTypes[type as keyof typeof transformationTypes]

  return (
    <>
      <Header
        title={transformation.title}
        subtitle={transformation.subTitle}
      />
      <section className="mt-10">
        <TransformationForm
          action="Add"
          userId={user._id}
          type={transformation.type as TransformationTypeKey}
          creditBalance={user?.creditBalance}
        />
      </section>
    </>
  )
}

export default AddTransformationTypePage
