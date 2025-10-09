
import type React from "react"

import { useState } from "react"

interface Link {
  href: string
  text?: string
}

interface PaginatedLinksProps {
  links: Link[]
  itemsPerPage?: number
}

const PaginatedLinks: React.FC<PaginatedLinksProps> = ({ links, itemsPerPage = 10 }) => {
  const [currentPage, setCurrentPage] = useState(1)

  if (!links || links.length === 0) {
    return <li className="text-gray-500">No links found</li>
  }

  const totalPages = Math.ceil(links.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentLinks = links.slice(startIndex, endIndex)

  const goToPage = (page: number) => {
    setCurrentPage(page)
  }

  const goToPrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  const goToNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  // Generate page numbers to show
  const getPageNumbers = () => {
    const pages = []
    const maxVisiblePages = 5

    if (totalPages <= maxVisiblePages) {
      // Show all pages if total is small
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      // Show first page, current page area, and last page
      if (currentPage <= 3) {
        // Show first few pages
        for (let i = 1; i <= 4; i++) {
          pages.push(i)
        }
        pages.push("...")
        pages.push(totalPages)
      } else if (currentPage >= totalPages - 2) {
        // Show last few pages
        pages.push(1)
        pages.push("...")
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i)
        }
      } else {
        // Show middle pages
        pages.push(1)
        pages.push("...")
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i)
        }
        pages.push("...")
        pages.push(totalPages)
      }
    }

    return pages
  }

  return (
    <div>
      {/* Links List */}
      {currentLinks.map((link, i) => (
        <li key={startIndex + i}>
          <a href={link.href} target="_blank" rel="noreferrer noopener" className="text-blue-500 hover:underline">
            {link.text || link.href}
          </a>
        </li>
      ))}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="mt-4 flex items-center justify-between bg-white p-3 border rounded">
          <div className="text-sm text-gray-600">
            Showing {startIndex + 1}-{Math.min(endIndex, links.length)} of {links.length} links
          </div>

          <div className="flex items-center gap-2">
            {/* Previous Button */}
            <button
              onClick={goToPrevious}
              disabled={currentPage === 1}
              className={`px-3 py-1 text-sm border rounded ${
                currentPage === 1
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
            >
              Previous
            </button>

            {/* Page Numbers */}
            <div className="flex items-center gap-1">
              {getPageNumbers().map((page, index) => (
                <span key={index}>
                  {page === "..." ? (
                    <span className="px-2 py-1 text-gray-400">...</span>
                  ) : (
                    <button
                      onClick={() => goToPage(page as number)}
                      className={`px-3 py-1 text-sm border rounded ${
                        currentPage === page
                          ? "bg-blue-500 text-white border-blue-500"
                          : "bg-white text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      {page}
                    </button>
                  )}
                </span>
              ))}
            </div>

            {/* Next Button */}
            <button
              onClick={goToNext}
              disabled={currentPage === totalPages}
              className={`px-3 py-1 text-sm border rounded ${
                currentPage === totalPages
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default PaginatedLinks
