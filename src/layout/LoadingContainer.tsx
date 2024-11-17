interface Props {
    content?: string;
}

export default function LoadingComponent({ content = 'Loading...' }: Props) {
    return (
        <div className="h-screen flex items-center justify-center">
            <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
                <div className="text-gray-600 text-lg">{content}</div>
            </div>
        </div>
    );
}