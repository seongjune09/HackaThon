import { useLocation } from 'react-router-dom'

function End() {
    const { state } = useLocation()

    // state === API 응답 전체
    const result = state?.ai_result

    return (
        <div>
            <h1>{result?.beach_name}</h1>
            <p>안전 등급: {result?.safety_level}</p>
            <p>점수: {result?.score}</p>

            <h3>성인</h3>
            <p>{result?.adult_assessment}</p>

            <h3>어린이·노약자</h3>
            <p>{result?.child_elderly_assessment}</p>

            <p>{result?.summary}</p>
        </div>
    )
}

export default End