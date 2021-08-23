import cn from 'classnames';
const LIMIT = 10;

export default function PeopleTablePagination({
  selectedPage = 1,
  total = 90,
  changePage = () => {}
}) {
  const totalPages = Math.ceil( total / LIMIT)

  return (
    <nav className='pagination is-centered' role='navigation' aria-label='pagination'>
    <button
      className='pagination-previous'
      disabled={selectedPage === 1}
      onClick={() => changePage(selectedPage - 1)}
    >
      Previous
    </button>
    <button
      className='pagination-next'
      disabled={selectedPage === totalPages}
      onClick={() => changePage(selectedPage + 1)}
    >
      Next page
    </button>
    <ul className='pagination-list'>
      {new Array(totalPages).fill(1).map((item, idx) => item + idx).map((page, index) => (
        <li key={index}>
          <button
            className={cn('pagination-link', {
              'is-current': selectedPage  === page
            })}
            aria-label={`Goto page ${selectedPage + 1}`}
            onClick={() => {
              if (page !== selectedPage) changePage(page)
            }}
          >
            {page}
          </button>
        </li>
      ))}
  </ul>
</nav>
  )
}