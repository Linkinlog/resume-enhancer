import { useEffect } from 'react'

interface Props {
  message: string
  isVisible: boolean
  onClose: () => void
}

const Toast = ({ message, isVisible, onClose }: Props) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(onClose, 3000)
      return () => clearTimeout(timer)
    }
  }, [isVisible, onClose])

  if (!isVisible) return null

  return (
    <div className="fixed bottom-4 right-4 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg">
      {message}
    </div>
  )
}

export default Toast;
