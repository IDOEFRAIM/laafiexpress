"use client"

import { useEffect } from "react"

export function useScrollReveal(rootMargin = "-10% 0px") {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal-visible")
            observer.unobserve(entry.target)
          }
        })
      },
      { root: null, rootMargin }
    )

    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [rootMargin])
}
