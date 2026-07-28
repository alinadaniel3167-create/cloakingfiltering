import { QueryClient } from '@tanstack/react-query'

/**
 * Shared QueryClient singleton. Provided to the router as context (for use in
 * loaders) and to QueryClientProvider in the root shell.
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60,
      gcTime: 1000 * 60 * 5,
    },
  },
})
