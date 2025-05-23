"use client";

import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';

export default function TestSupabase() {
  const [data, setData] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        console.log('Testing all Supabase tables...');
        const supabase = createClient();
        const results: any = {};

        // List of tables to test
        const tablesToTest = [
          'providers',
          'provider_categories',
          'service_type',
          'condition',
          'users'
        ];

        for (const table of tablesToTest) {
          try {
            console.log(`Fetching data from table: ${table}`);
            
            const { data: tableData, error, count } = await supabase
              .from(table)
              .select('*', { count: 'exact' });

            console.log(`Table ${table} result:`, { 
              data: tableData, 
              error, 
              count,
              dataLength: tableData?.length 
            });

            if (error) {
              console.error(`Error for table ${table}:`, error);
              results[table] = { error: error.message, status: 'error' };
            } else {
              results[table] = { 
                data: tableData || [], 
                count: count || tableData?.length || 0,
                status: 'success',
                sample: tableData?.slice(0, 2) // First 2 records as sample
              };
            }
          } catch (err) {
            console.error(`Exception for table ${table}:`, err);
            results[table] = { 
              error: err instanceof Error ? err.message : 'Unknown error',
              status: 'error' 
            };
          }
        }

        console.log('All table results:', results);
        setData(results);
      } catch (err) {
        console.error('Fetch error:', err);
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Supabase Database Investigation</h1>
      
      {loading && <p>Loading all tables...</p>}
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <strong>Error:</strong> {error}
        </div>
      )}
      
      {!loading && !error && (
        <div className="space-y-6">
          {Object.entries(data).map(([tableName, tableInfo]: [string, any]) => (
            <div key={tableName} className="border rounded-lg p-4">
              <h2 className="text-xl font-semibold mb-2 flex items-center gap-2">
                <span className={`w-3 h-3 rounded-full ${
                  tableInfo.status === 'success' ? 'bg-green-500' : 'bg-red-500'
                }`}></span>
                {tableName}
                {tableInfo.status === 'success' && (
                  <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">
                    {tableInfo.count} rows
                  </span>
                )}
              </h2>
              
              {tableInfo.status === 'error' ? (
                <div className="text-red-600 bg-red-50 p-2 rounded">
                  <strong>Error:</strong> {tableInfo.error}
                </div>
              ) : (
                <div>
                  <p className="text-gray-600 mb-2">
                    Found {tableInfo.count} records
                  </p>
                  {tableInfo.sample && tableInfo.sample.length > 0 && (
                    <details className="bg-gray-50 p-3 rounded">
                      <summary className="cursor-pointer font-medium">
                        Sample Data (first 2 rows)
                      </summary>
                      <pre className="mt-2 text-xs overflow-auto">
                        {JSON.stringify(tableInfo.sample, null, 2)}
                      </pre>
                    </details>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 