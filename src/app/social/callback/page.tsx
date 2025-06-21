 'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

const SocialCallbackPage = () => {
    const Cookies = require('js-cookie')
    const router = useRouter()

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search)
        const token = urlParams.get('token')
        const user = urlParams.get('user')
        const userObj = JSON.parse(user)
        console.log(token)

        if (token) {
            Cookies.set('access_token', token)
            Cookies.set('email_user',userObj?.email)
            Cookies.set('user_id',userObj?.id)
            Cookies.set('user_role',userObj?.role?.id)
            router.push('/content') // или куда нужно
        } else {
            console.error("Token not found")
            router.push('/auth/signup') // на случай ошибки
        }
    }, [])

    return <div>Загрузка...</div>
}

export default SocialCallbackPage
