import '../styles/Loading.css'

function Loading() {
    return (
        <div className="Loading-Overlay">
            <img
                src="loading-square.png"
                alt="loading"
                className="loading-image"
            />
            <p>기기 상태 확인 중...</p>
        </div>
    )
}

export default Loading