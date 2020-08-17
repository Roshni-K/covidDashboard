import React, {useState, useRef, lazy, Suspense} from 'react';
const TimeseriesExplorer = lazy(() => import('./TimeseriesExplorer'));
const Actions = lazy(() => import('./Actions'));
import {fetcher} from '../constants/commonFunctions';
import useStickySWR from '../constants/useStickySWR';
import {API_ROOT_URL} from '../constants/constants';
import {useLocalStorage, useSessionStorage, useWindowSize} from 'react-use';
function GraphView (){
    const [anchor, setAnchor] = useLocalStorage('anchor', null);
    const [expandTable, setExpandTable] = useLocalStorage('expandTable', false);
    const [date, setDate] = useState('');
    const [regionHighlighted, setRegionHighlighted] = useState({
        stateCode: 'TT',
        districtName: null,
      });
    const {data: timeseries} = useStickySWR(
        `https://www.theunpaidmedia.com/dashboard/timeseries_min`,
        fetcher,
        {
          revalidateOnMount: true,
          refreshInterval: 100000,
        }
      );
    
      const {data} = useStickySWR(
        `https://www.theunpaidmedia.com/dashboard/data_min`,
        fetcher,
        {
          revalidateOnMount: true,
          refreshInterval: 100000,
        }
      );
    return(
        <div>
            {timeseries && (
              <Suspense fallback={<div style={{minHeight: '56px'}} />}>
                <Actions
                  {...{
                    setDate,
                    dates: Object.keys(timeseries['TT']?.dates).reverse(),
                    date,
                  }}
                />
              </Suspense>
            )}
        {timeseries && (
                <Suspense fallback={<div />}>
                  <TimeseriesExplorer
                    stateCode="TT"
                    {...{
                      timeseries,
                      date,
                      regionHighlighted,
                      setRegionHighlighted,
                      anchor,
                      setAnchor,
                      expandTable,
                    }}
                  />
                </Suspense>
              )}
        </div>
    )
}

export default GraphView;