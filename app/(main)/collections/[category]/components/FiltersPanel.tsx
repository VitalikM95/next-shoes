import ClearFiltersButton from '@/components/shared/ClearFiltersButton'
import { Breadcrumbs } from './BreadCrumbs'
import {
  BestForSelector,
  ColorSelector,
  MaterialSelector,
  SizeSelector,
  TitleCategories,
} from './Filters'
import MobileFiltersDrawer from './MobileFiltersDrawer'

const FiltersPanel = () => {
  return (
    <>
      {/* Мобільна версія */}
      <div className="mb-4 w-full md:hidden">
        <MobileFiltersDrawer />
      </div>

      {/* Десктопна версія */}
      <aside className="hidden w-full md:block md:w-1/5 md:pr-6 lg:pr-8">
        <Breadcrumbs />
        <TitleCategories />
        <div className="flex flex-wrap items-center justify-between">
          <span className="mb-4 mt-5 font-bold">Filter By:</span>
          <ClearFiltersButton />
        </div>
        <hr />
        <SizeSelector />
        <hr />
        <BestForSelector />
        <hr />
        <MaterialSelector />
        <hr />
        <ColorSelector />
      </aside>
    </>
  )
}

export default FiltersPanel
