import PoiItemTile from '../components/admin/PoiItemTile.tsx'
import Layout from '../components/layout/Layout'

const Admin = () => {
  return (
    <Layout title="Administration" extended>
      <div className="bg-[#f2f2f2] min-h-screen">
        <div className="grid grid-cols-[repeat(auto-fit,375px)] justify-center gap-6 overflow-auto p-4 lg:p-14 pt-[200px] pb-[100px]">
          <PoiItemTile />
          <PoiItemTile />
          <PoiItemTile />
          <PoiItemTile />
          <PoiItemTile />
        </div>
      </div>
    </Layout>
  )
}

export default Admin
