import Header from '@/components/shared/Header'
import React from 'react'
import { transformationTypes } from '@/constants'
import TransformationForm from '@/components/shared/TransformationForm';
import { auth } from '@clerk/nextjs/server';
import { getUserById } from '@/lib/actions /user.actions';
import { RedirectToSignIn } from '@clerk/nextjs';
const AddTransformationTypePage = async(props: SearchParamProps) => {
  const { type } = await props.params; 
  const transformation = transformationTypes[type];
  const { userId } = await auth();
if(!userId){
  return (
    <RedirectToSignIn
    />
  )
}
  const user = await getUserById(userId);
  return (
    <>
     <Header title={transformation.title}
           subtitle={transformation.subTitle}
  />
  <section className="mt-10">
  <TransformationForm 
    action="Add" 
    userId={user._id}
    type={transformation.type as TransformationTypeKey}
    creditBalance={user?.creditBalance}
  ></TransformationForm>

  </section>

    </>
 
  )
}

export default AddTransformationTypePage