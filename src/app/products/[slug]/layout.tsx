import { ReactNode } from 'react'
import { generateMetadata } from './metadata'

// Remove static metadata as we'll use dynamic metadata from metadata.ts
export { generateMetadata }

export default function Layout({ children }: { children: ReactNode }) {
  return <>{children}</>
}