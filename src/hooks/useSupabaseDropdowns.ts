'use client';

import { useState, useEffect } from 'react'
import { createClient } from '@/utils/supabase/client'

interface Option {
  id: number
  name: string
}

interface DropdownData {
  options: Array<{ id: number; name: string }>
  loading: boolean
  error: Error | null
}

interface UseSupabaseDropdownsResult {
  supportNeeded: DropdownData
  supportTypes: DropdownData
  retryFetch: () => Promise<void>
}

const CACHE_KEY = 'dropdownData'
const CACHE_DURATION = 3600000 // 1 hour in milliseconds

function getCache() {
  if (typeof window === 'undefined') return null
  
  const cached = sessionStorage.getItem(CACHE_KEY)
  if (!cached) return null

  const { data, timestamp } = JSON.parse(cached)
  if (Date.now() - timestamp > CACHE_DURATION) {
    sessionStorage.removeItem(CACHE_KEY)
    return null
  }

  return data
}

function setCache(data: any) {
  if (typeof window === 'undefined') return
  sessionStorage.setItem(
    CACHE_KEY,
    JSON.stringify({
      data,
      timestamp: Date.now(),
    })
  )
}

export function useSupabaseDropdowns() {
  const [state, setState] = useState<Omit<UseSupabaseDropdownsResult, 'retryFetch'>>({
    supportNeeded: { options: [], loading: true, error: null },
    supportTypes: { options: [], loading: true, error: null },
  })

  const fetchData = async () => {
    try {
      const supabase = createClient()

      // Test the connection first
      const { data: testData, error: testError } = await supabase
        .from('condition')  // Updated table name
        .select('id, name')
        .limit(1)

      console.log('Connection test:', { data: testData, error: testError })

      if (testError) {
        throw new Error(`Database connection error: ${testError.message}`)
      }

      // Fetch both datasets in parallel
      const [conditionsResponse, serviceTypesResponse] = await Promise.all([
        supabase
          .from('condition')  // First dropdown: "What are you struggling with?"
          .select('id, name')
          .order('id'),
        supabase
          .from('service_type')  // Second dropdown: "What type of support?"
          .select('id, name')
          .order('name')
      ])

      // Log full responses for debugging
      console.log('Conditions Response:', {
        data: conditionsResponse.data,
        error: conditionsResponse.error,
        status: conditionsResponse.status
      })

      console.log('Service Types Response:', {
        data: serviceTypesResponse.data,
        error: serviceTypesResponse.error,
        status: serviceTypesResponse.status
      })

      if (conditionsResponse.error) {
        throw new Error(`Failed to fetch conditions: ${conditionsResponse.error.message}`)
      }

      if (serviceTypesResponse.error) {
        throw new Error(`Failed to fetch service types: ${serviceTypesResponse.error.message}`)
      }

      // Transform the data to match the expected format
      const newState = {
        supportNeeded: {
          options: (conditionsResponse.data || []).map(row => ({
            id: row.id,
            name: row.name
          })),
          loading: false,
          error: null,
        },
        supportTypes: {
          options: (serviceTypesResponse.data || []).map(row => ({
            id: row.id,
            name: row.name
          })),
          loading: false,
          error: null,
        },
      }

      console.log('Setting dropdown state:', newState)
      setState(newState)
      setCache(newState)
    } catch (error) {
      console.error('Error fetching dropdown data:', error)
      setState({
        supportNeeded: { 
          options: [], 
          loading: false, 
          error: error instanceof Error ? error : new Error('Failed to fetch data') 
        },
        supportTypes: { 
          options: [], 
          loading: false, 
          error: error instanceof Error ? error : new Error('Failed to fetch data') 
        },
      })
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return {
    ...state,
    retryFetch: fetchData,
  }
} 