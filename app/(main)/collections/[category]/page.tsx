import {
  ColorCategories,
  TitleCategories,
} from '@/components/shared/Categories'
import { Breadcrumbs } from '@/components/shared/BreadCrumbs'
import { ProductCard } from '@/components/shared/ProductCard'
import { CheckboxStandard } from '@/components/ui/checkbox-custom'
import { SwitchButton } from '@/components/shared/SwitchButton'
import { SizeSelector } from '@/components/shared/SizeSelector'
import { BEST_FOR, MATERIAL } from '@/lib/constants'
import { data } from '@/temp'

const page = () => {
  return (
    <main className='px-16 py-10 flex'>
      <aside className='flex flex-col w-1/5'>
        <Breadcrumbs />
        <TitleCategories />
        <div className='mt-5 mb-4 font-bold'>Filter By:</div>
        <hr />
        <div className='uppercase font-bold my-4'>sizes</div>
        <p className='text-xs mb-4'>
          Most of our shoes only come in full sizes. If you’re a half size,
          select your nearest whole size too.
        </p>
        <SizeSelector />
        <hr />
        <div className='uppercase font-bold my-6'>best for</div>
        <div className='flex flex-col gap-2 mb-4'>
          {BEST_FOR.map((item, i) => (
            <CheckboxStandard key={i} label={item} />
          ))}
        </div>
        <hr />
        <div className='uppercase font-bold my-6'>material</div>
        <div className='flex flex-col gap-2 mb-4'>
          {MATERIAL.map((item, i) => (
            <CheckboxStandard key={i} label={item} />
          ))}
        </div>
        <hr />
        <div className='uppercase font-bold my-6'>hue</div>
        <ColorCategories />
      </aside>
      <div className='w-4/5 flex flex-col'>
        <div className='flex justify-end'>
          <SwitchButton />
        </div>
        <div className='flex flex-wrap items-start gap-4 pl-4'>
          {data.map((product, i) => (
            <ProductCard key={i} item={product} />
          ))}
        </div>
      </div>
    </main>
  )
}

export default page
