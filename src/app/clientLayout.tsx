'use client'
import { SessionProvider } from 'next-auth/react'
import React from 'react'
import Header from './components/Header/Header'
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from './components/AppSidebar/app-sidebar'

const ClientLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SessionProvider>
      <Header />
      <SidebarProvider>
      <AppSidebar />
      <main>
        
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
    </SessionProvider>
  )
}

export default ClientLayout
