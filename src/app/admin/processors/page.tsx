'use client'

import ComponentInner from "@/app/components/admin/ComponentInner"
import instanceAxios from "@/app/components/axios/instanceAxios"
import { useEffect, useState } from "react"

const Processors = () => {
    const [keys,setKeys] = useState([]);
    const [values,setValues] = useState([]);
    useEffect(() => {
        instanceAxios.get('/processors').then(res => {
                setValues(res.data.data)
                setKeys(Object.keys(res.data.data[0]))
            })
    },[])

    return (
        <>
            <ComponentInner componentKeys={keys} componentValues={values}/>
        </>
    )
}
export default Processors