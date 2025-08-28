import searchIcon from '../../assets/icons/search.svg'

function SearchBar() {
  return (
    <div className="flex w-[180px] items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2 shadow-sm">
      <img src={searchIcon} alt="search icon" className="w-[16px]" />
      <input
        type="text"
        placeholder="Search..."
        className="w-full bg-transparent text-sm text-gray-600 outline-none"
      />
    </div>
  )
}

export default SearchBar
