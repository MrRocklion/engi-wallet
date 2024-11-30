'use client'
import React from 'react'
import {
    HomeIcon,
    ChartBarIcon,
    UserGroupIcon,
    ClipboardDocumentListIcon,
    Cog6ToothIcon,
    InformationCircleIcon,
    ChatBubbleBottomCenterTextIcon,
    SparklesIcon
  } from '@heroicons/react/24/outline'
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import Link from 'next/link'
export default function SideBar(){
    const pathname = usePathname();
    const routes = [
        {
          label: 'Home',
          icon: HomeIcon,
          href: '/',
        },
        {
          label: 'Analiticas',
          icon: ChartBarIcon,
          href: '/analytics',
        },
        {
          label: 'Clients',
          icon: UserGroupIcon,
          href: '/clients',
        },
        {
          label: 'Reportes',
          icon: ClipboardDocumentListIcon,
          href: '/reports',
        },
        {
          label: 'Settings',
          icon: Cog6ToothIcon,
          href: '/settings',
        },
        {
          label: 'About',
          icon: InformationCircleIcon,
          href: '/about',
        },
        {
          label: 'Feedback',
          icon: ChatBubbleBottomCenterTextIcon,
          href: '/feedback',
        },
      ]

    return(<>
    
    <aside className="side-bar-container w-96 divide-y divide-slate-400/25">
            <header className="h-1/5 justify-center content-center">
              <p className="font-bold text-2xl text-center">
                MECDEVS
              </p>

            </header>
            <nav className=" flex flex-col gap-2  h-3/5 p-4  ">
              {routes.map((route) => (
                <Link
                  key={route.href}
                  href={route.href}
                  className={clsx(
                    'group flex items-center rounded-md px-2 py-2 text-lg font-medium text-gray-300 hover:bg-gray-700 hover:text-green-400',
                    {'bg-gray-700 text-white': pathname === route.href}
                )
                }
                >
                  <route.icon
                    className={clsx(
                        'mr-3 h-8 w-8 flex-shrink-0 text-gray-400 group-hover:text-green-400',
                        {
                            'text-white': pathname === route.href
                        }
                    )
                      
                    }
                    aria-hidden="true"
                  />
                  {route.label}
                </Link>
              ))}
            </nav>
            <footer className=" flex items-center justify-center h-1/5">
              <div className="w-64 rounded-xl bg-gray-900 p-4 r">
                <div className="space-y-3">
                  <div className="flex items-start">
                    <SparklesIcon className="h-5 w-5 text-white" aria-hidden="true" />
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-lg font-medium text-white">
                     Configura la App
                    </h3>

                    <p className="text-sm text-blue-400">
                     
                    </p>
                  </div>

                  <button
                    type="button"
                    className="w-full rounded-lg bg-white px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-900"
                  >
                    Preferencias
                  </button>
                </div>
              </div>
            </footer>
          </aside>
    
    </>)
}