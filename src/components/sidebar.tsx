'use client'

import { Book, Brain, HardHat, Home, User } from "lucide-react"
import { SidebarDesktop } from "./sidebar-desktop"
import { SidebarItems } from "@/types"
import { SidebarButton } from "./sidebar-button"

const sidebarItems: SidebarItems = {

  links: [
    { label: 'Courses', href: '/pages/courses', icon: Book},
    { label: 'Jobs', href: '/pages/jobs', icon: HardHat},
    { label: 'Profile', href: '/pages/profile', icon: User},
  ],
}

export function Sidebar() {
  return (
    <SidebarDesktop sidebarItems={sidebarItems} />
  )
}