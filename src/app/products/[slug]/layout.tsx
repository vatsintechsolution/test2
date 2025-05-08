import { ReactNode } from 'react'
import { generateMetadata } from './metadata'
import ProductPageSchema from './schema'

// Remove static metadata as we'll use dynamic metadata from metadata.ts
export { generateMetadata }

export default function Layout({ 
  children, 
  params 
}: { 
  children: ReactNode, 
  params: { slug: string } 
}) {
  return (
    <>
      <ProductPageSchema params={params} />
      {children}
    </>
  )
}