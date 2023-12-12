import { redirect } from 'next/navigation'
import React from 'react'

const page = () => {
    redirect('/train/data-collection')
    return (
        <div>page</div>
    )
}

export default page