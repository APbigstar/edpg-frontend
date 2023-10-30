import { Link } from 'react-router-dom';

export default function FormHeader({
    heading,
    paragraph,
    linkName,
    linkUrl = "#"
}) {
    return (
        <div className="">
            <div className="flex justify-center">
                <Link to='/'>
                    <img
                        alt=""
                        className="h-17 w-40"
                        src="/images/logo.png" />
                </Link>
            </div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 text-white">
                {heading}
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600 mt-5 text-white" >
                {paragraph} {' '}
                <Link to={linkUrl} className="font-medium text-purple-600 hover:text-purple-500" >
                    <span style={{ color: '#1eb2a6' }}>{linkName}</span>
                </Link>
            </p>
        </div>
    )
}