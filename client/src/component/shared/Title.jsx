import React from 'react'
import { Helmet } from 'react-helmet-async'

const Title = ({title="Let's Talk",description="This is the Chat app called Let's Talk"}) => {
  return (
    <Helmet>

        <title>{title}</title>
        <meta name="description" content={description} />
    </Helmet>
  )
}

export default Title