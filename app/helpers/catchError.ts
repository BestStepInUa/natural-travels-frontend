import { ApiError } from '@/app/api/_utils/utils'

export const catchError = (error: ApiError) => {
	return error.response?.data?.error ?? error.message ?? 'Opps... some error'
}
