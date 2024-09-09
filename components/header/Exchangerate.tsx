'use client'
import * as React from 'react'
interface IExchangerateProps {
  exchangerateData: IExchangerateData[] | []
}
const Exchangerate: React.FC<IExchangerateProps> = ({ exchangerateData }) => {
  const [rateOrder, setRateOrder] = React.useState(0)

  React.useEffect(() => {
    if (exchangerateData && exchangerateData.length > 0) {
      const interval = setInterval(() => {
        setRateOrder((prev) =>
          prev === exchangerateData.length - 1 ? 0 : prev + 1
        )
      }, 5000)

      return () => clearInterval(interval)
    }
  }, [exchangerateData])

  return (
    <div className='flex items-center justify-end text-sm text-gray-100 font-semibold gap-2 h-full'>
      {exchangerateData?.length > 0 && (
        <span>
          {`USD/${exchangerateData[rateOrder].currency}`} :{' '}
          {exchangerateData[rateOrder].rate}
        </span>
      )}
    </div>
  )
}

export default Exchangerate
