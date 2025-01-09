'use client'

import dynamic from 'next/dynamic'
import Head from 'next/head'
import Link from 'next/link'

const ARViewer = dynamic(() => import('@/components/ARViewer'), { 
  ssr: false,
  loading: () => <div className="flex items-center justify-center h-full">
    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
  </div>
})

export default function AlternatePage() {
  return (
    <main className="h-screen w-full">
      <Head>
        <title>AR Model Viewer - Alternate</title>
      </Head>
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">AR Model Viewer</h1>
          <Link href="/" className="bg-blue-500 text-white px-4 py-2 rounded">
            View Second Model
          </Link>
        </div>
        
        <div className="h-[600px] w-full">
          <ARViewer modelPath="/base.gltf" />
        </div>
      </div>
    </main>
  )
} 