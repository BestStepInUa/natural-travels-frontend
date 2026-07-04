'use client'

import { ReactNode, useEffect, useState } from 'react'

// import LoaderComponent from '@/components/Loader'
import { checkServerSession, getMe } from '@/lib/api/serverApi'
import { useAuthStore } from '@/lib/store/authStore/authStore'

type Props = {
	children: ReactNode
}

export default function AuthProvider({ children }: Props) {
	const setUser = useAuthStore((state) => state.setUser)
	const clearIsAuthenticated = useAuthStore((state) => state.clearIsAuth)

	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		const fetchUser = async () => {
			try {
				const isSessionValid = await checkServerSession()

				if (isSessionValid) {
					const user = await getMe()
					if (user) {
						setUser(user)
					}
				} else {
					clearIsAuthenticated()
				}
			} catch {
				clearIsAuthenticated()
			} finally {
				setIsLoading(false)
			}
		}

		fetchUser()
	}, [setUser, clearIsAuthenticated])

	// Показуємо лоудер під час перевірки сесії
	if (isLoading) {
		// return <LoaderComponent />
	}

	return children
}
