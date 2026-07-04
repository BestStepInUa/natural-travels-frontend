// 'use client'

// import { ReactNode, useEffect, useState } from 'react'

// import { checkSession, getMe } from '@/lib/api/clientApi'
// import { useAuthStore, selectSetUser, selectClearIsAuthenticated } from '@/lib/store/authStore'
// import LoaderComponent from '@/components/Loader'

// type Props = {
// 	children: ReactNode
// }

// export default function AuthProvider({ children }: Props) {
// 	const setUser = useAuthStore(selectSetUser)
// 	const clearIsAuthenticated = useAuthStore(selectClearIsAuthenticated)

// 	const [isLoading, setIsLoading] = useState(true)

// 	useEffect(() => {
// 		const fetchUser = async () => {
// 			try {
// 				const isSessionValid = await checkSession()

// 				if (isSessionValid) {
// 					const user = await getMe()
// 					if (user) {
// 						setUser(user)
// 					}
// 				} else {
// 					clearIsAuthenticated()
// 				}
// 			} catch {
// 				clearIsAuthenticated()
// 			} finally {
// 				setIsLoading(false)
// 			}
// 		}

// 		fetchUser()
// 	}, [setUser, clearIsAuthenticated])

// 	// Показуємо лоудер під час перевірки сесії
// 	if (isLoading) {
// 		return <LoaderComponent />
// 	}

// 	return children
// }
