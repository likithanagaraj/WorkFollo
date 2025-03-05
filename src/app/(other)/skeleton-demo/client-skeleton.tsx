// "use client"
// import { getClient } from '@/actions/client.actions'
// import { Client } from '@prisma/client'
// import React, { useEffect, useState } from 'react'


// const ClientSkeleton = async () => {
//     const [client, setClient] = useState()
//     useEffect(() => {
//         const main = async () => {
//             let resp = await getClient(16)
//             setClient(resp)
//         }
//         main()

//         // 
//     }, [])
//     console.log(client)
//     return (
//         <div>{client && client.id}</div>
//     )
// }

// export default ClientSkeleton