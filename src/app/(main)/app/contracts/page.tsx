import ContractDataTable from '@/components/contract-data-table'
import CreateButton from '@/components/create-button'
import React from 'react'

function ContractPage() {
  return (
    <div className="px-10 py-20 flex flex-col gap-8">
    <CreateButton className="rounded-none p-5" link="/app/contracts/create">
      New Contract
    </CreateButton>

{/* <DataTableTab tabs={tabs} /> */}
    <ContractDataTable/>
  </div>
  )
}

export default ContractPage