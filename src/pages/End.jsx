import { useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import '../styles/End.css'

function End() {
    const { state } = useLocation()
    const navigate = useNavigate()

    // 데이터가 중첩되어 들어올 경우를 대비한 유연한 추출
    const rawData = state?.ai_result
    const result = rawData?.ai_result ? rawData.ai_result : rawData

    const [progress, setProgress] = useState(0)

    useEffect(() => {
        // result.score가 존재하는지 확인
        const targetScore = result?.score || 0
        if (targetScore > 0) {
            let start = 0
            const end = targetScore
            const duration = 1000
            const stepTime = 10
            const increment = end / (duration / stepTime)

            const timer = setInterval(() => {
                start += increment
                if (start >= end) {
                    start = end
                    clearInterval(timer)
                }
                setProgress(Math.round(start))
            }, stepTime)
            return () => clearInterval(timer) // 언마운트 시 타이머 정리
        }
    }, [result?.score])

    if (!result) {
        return (
            <div className="End-Error">
                <p>결과를 불러올 수 없습니다.</p>
                <button onClick={() => navigate('/')}>홈으로</button>
            </div>
        )
    }

    const getColor = (score) => {
        if (score < 30) return '#E74C3C'
        if (score < 50) return '#F39C12'
        if (score < 70) return '#F1C40F'
        if (score < 90) return '#2ECC71'
        return '#007AFF'
    }

    const radius = 60
    const stroke = 10
    const normalizedRadius = radius - stroke / 2
    const circumference = normalizedRadius * 2 * Math.PI
    const strokeDashoffset = circumference - (progress / 100) * circumference

    return (
        <div className="End">
            <header className="End-Header">
                <p className="End-Sub">분석 결과</p>
                {/* 데이터 키값이 beach_name 혹은 beach일 경우 모두 대응 */}
                <h1 className="End-Title">{result.beach_name || result.beach || "알 수 없는 해변"}</h1>
            </header>

            <section className="Result-Card">
                <svg height={radius*2} width={radius*2} className="Score-Circle">
                    <circle
                        stroke="#eee"
                        fill="transparent"
                        strokeWidth={stroke}
                        r={normalizedRadius}
                        cx={radius}
                        cy={radius}
                    />
                    <circle
                        stroke={getColor(progress)}
                        fill="transparent"
                        strokeWidth={stroke}
                        strokeDasharray={`${circumference} ${circumference}`}
                        strokeDashoffset={strokeDashoffset}
                        strokeLinecap="round"
                        style={{ transition: 'stroke-dashoffset 0.3s linear' }}
                        r={normalizedRadius}
                        cx={radius}
                        cy={radius}
                    />
                    <text
                        x="50%"
                        y="50%"
                        dominantBaseline="middle"
                        textAnchor="middle"
                        fontSize="24px"
                        fontWeight="800"
                        fill={getColor(progress)}
                    >
                        {progress}
                    </text>
                </svg>

                {/* safety_level 혹은 safety 대응 */}
                <div className={`Safety-Level ${result.safety_level || result.safety}`}>
                    {result.safety_level || result.safety}
                </div>
            </section>

            <section className="Summary">
                <p>{result.summary || "분석 요약 정보가 없습니다."}</p>
            </section>

            <section className="Assessment">
                <div className="Assessment-Card">
                    <h3>성인</h3>
                    <p>{result.adult_assessment || result.adult || "정보 없음"}</p>
                </div>

                <div className="Assessment-Card">
                    <h3>어린이 · 노약자</h3>
                    <p>{result.child_elderly_assessment || result.child || "정보 없음"}</p>
                </div>
            </section>

            <button className="End-Btn" onClick={() => navigate('/')}>
                <img className="Home-Btn" src="/Home.svg" alt="home" />
            </button>
        </div>
    )
}

export default End