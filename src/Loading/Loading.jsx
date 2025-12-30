import '../styles/Loading.css'

function Loading({ type = 'prepare', text }) {
    return (
        <div className="Loading-Overlay">
            {/* 로딩 애니메이션 영역 */}
            <div className={`loader ${type}`}>
                
                {/* 준비중 / 종료중 → 네모 3개 */}
                {(type === 'prepare' || type === 'finish') && (
                    <div className="square-loader">
                        <img src="square-green.png" className="sq sq1" />
                        <img src="square-yellow.png" className="sq sq2" />
                        <img src="square-red.png" className="sq sq3" />
                    </div>
                )}

                {/* 측정중 → 파도 */}
                {type === 'measure' && (
                    <img src="Wave.png" className="wave-loader" />
                )}
            </div>

            {/* 문구 */}
            <p className="loading-text">{text}</p>
        </div>
    )
}

export default Loading