import { LoaderCircle } from 'lucide-react'

const Loader = () => {
    return (
        <div>
            {/* keep rotating it */}
            <LoaderCircle size={54} className='text-gray-600 animate-spin' />
        </div>
    )
}

export default Loader