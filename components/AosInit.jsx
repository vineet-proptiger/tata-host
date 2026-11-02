'use client'
import { useEffect } from 'react'
import AOS from 'aos'

export default function AosInit() {
  useEffect(() => {
    AOS.init({ duration: 700, once: false, offset: 60, easing: 'ease-out-cubic', mirror: true })
  }, [])
  return null
}
