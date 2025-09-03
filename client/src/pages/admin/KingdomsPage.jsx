import { useEffect, useState } from 'react'
import { PlusCircle, CastleIcon } from 'lucide-react'
import KingdomCard from '../../components/admin/kingdom/KingdomCard'
import SideBar from '../../components/admin/SideBar'
import Header from '../../components/admin/Header'
import { getKingdomList } from '../../services/kingdomServices'
import AddKingdom from '../../components/admin/kingdom/AddKingdom'
import EditKingdom from '../../components/admin/kingdom/EditKingdom'
import { useKingdomsDelete } from '../../hooks/useKingdoms'

function KingdomsPage() {
  const [kingdoms, setKingdoms] = useState([])
  const [loading, setLoading] = useState(true)
  const [errorMsg, setErrorMsg] = useState('')
  const [selectedKingdom, setSelectedKingdom] = useState(null)

  const [isShrink, setIsShrink] = useState(false)
  const [onEdit, setOnEdit] = useState(false)
  const [onAdd, setOnAdd] = useState(false)

  useEffect(() => {
    const fetchKingdoms = async () => {
      setLoading(true)
      setErrorMsg('')
      try {
        const kingdomList = await getKingdomList()
        setKingdoms(kingdomList || [])
      } catch (error) {
        setErrorMsg('Failed to load kingdoms. Please try again.')
      } finally {
        setLoading(false)
      }
    }
    fetchKingdoms()
  }, [])

  const {
    handleDelete,
    errorMsg: deleteError,
    setErrorMsg: setDeleteError,
  } = useKingdomsDelete(setKingdoms)

  const handleCancel = () => {
    setOnAdd(false)
    setOnEdit(false)
  }

  const showMainList = !onAdd && !onEdit

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 backdrop-blur-sm">
      {/* Sidebar */}
      <SideBar isShrink={isShrink} setIsShrink={setIsShrink} />

      {/* Main Content */}
      <main
        className={`flex flex-1 flex-col overflow-auto px-6 py-6 transition-all duration-300 ease-in-out ${
          isShrink ? 'ml-28' : 'ml-32 md:ml-64'
        }`}
      >
        {/* Header */}
        <Header title="Kingdoms" />

        {/* Error Display */}
        {errorMsg && (
          <div className="mx-auto rounded-lg bg-red-100 px-4 py-2 text-sm text-red-700 shadow-sm">
            {errorMsg}
          </div>
        )}

        {/*Delete Error Display */}
        {deleteError && (
          <div className="mx-auto rounded-lg bg-red-100 px-4 py-2 text-sm text-red-700 shadow-sm">
            {deleteError}
          </div>
        )}

        {/* Kingdoms List */}
        {showMainList && (
          <div>
            {/* Add Button */}
            <div className="mt-6 flex items-center justify-end pt-4">
              <button
                onClick={() => {
                  setOnAdd(true)
                  setOnEdit(false)
                }}
                className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-blue-500 px-5 py-3 text-white shadow-lg transition duration-300 hover:from-blue-700 hover:to-blue-600 focus:ring-4 focus:ring-blue-300 focus:outline-none"
              >
                <PlusCircle size={22} />
                Add Kingdom
              </button>
            </div>

            {/* Loading State */}
            {loading ? (
              <p className="mt-20 text-center text-gray-500 italic">
                Loading kingdoms...
              </p>
            ) : kingdoms.length > 0 ? (
              <div
                className="mt-6 grid gap-8"
                style={{
                  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                }}
              >
                {kingdoms.map((kingdom) => (
                  <KingdomCard
                    key={kingdom._id}
                    kingdom={kingdom}
                    onEdit={() => {
                      setSelectedKingdom(kingdom)
                      setOnAdd(false)
                      setOnEdit(true)
                    }}
                    onDelete={handleDelete}
                  />
                ))}
              </div>
            ) : (
              <div className="mt-20 flex flex-col items-center text-gray-500">
                <CastleIcon size={50} className="mb-3 opacity-60" />
                <p className="text-lg italic">No kingdoms found</p>
              </div>
            )}
          </div>
        )}

        {/* Add Kingdom Form */}
        {onAdd && (
          <AddKingdom
            setKingdoms={setKingdoms}
            setOnAdd={setOnAdd}
            onCancel={handleCancel}
          />
        )}

        {/* Edit Kingdom Form */}
        {onEdit && (
          <EditKingdom
            previousKingdom={selectedKingdom}
            setKingdoms={setKingdoms}
            setOnEdit={setOnEdit}
            onCancel={handleCancel}
          />
        )}
      </main>
    </div>
  )
}

export default KingdomsPage
