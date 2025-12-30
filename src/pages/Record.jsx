import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/Record.css'

function Record() {
    const navigate = useNavigate()
    const [records, setRecords] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchRecords = async () => {
            try {
                const res = await fetch('https://api.mieung.kr/records', {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' },
                })
                if (!res.ok) throw new Error('API 호출 실패')
                const data = await res.json()
                setRecords(data)
            } catch (err) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }
        fetchRecords()
    }, [])

    const handleCardClick = async (recordId) => {
        if (!recordId) {
            alert('기록 ID를 찾을 수 없습니다.');
            return;
        }

        try {
            const res = await fetch(`https://api.mieung.kr/records/${recordId}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            })
            if (!res.ok) throw new Error('상세 기록 불러오기 실패')

            const recordDetail = await res.json()
            const passData = recordDetail.ai_result || recordDetail;
            
            navigate('/end', { state: { ai_result: passData } })
        } catch (err) {
            alert(err.message)
        }
    }

    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString('ko-KR', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        });
    }

    if (loading) return <p style={{ textAlign: 'center', marginTop: '50px' }}>로딩 중...</p>
    if (error) return <p style={{ textAlign: 'center', marginTop: '50px', color: 'red' }}>{error}</p>

    return (
        <div className="Record-Page">
            <header className="Record-Header">
                <h1>결과 기록</h1>
                <p>지난 해변 분석 결과를 확인해보세요.</p>
            </header>

            <section className="Record-List">
                {records.length === 0 ? (
                    <p style={{ textAlign: 'center' }}>저장된 기록이 없습니다.</p>
                ) : (
                    records.map((record, index) => {
                        const actualId = record.id || record._id || record.record_id;
                        
                        // [추가된 로직] 장소 이름을 서버 데이터에서 유연하게 가져옵니다.
                        // 서버에서 beach, beach_name, sea 중 어느 것으로 저장하든 대응합니다.
                        const beachDisplayName = record.beach || record.beach_name || record.sea || "알 수 없는 장소";
                        
                        return (
                            <div
                                key={actualId || index}
                                className="Record-Card"
                                onClick={() => handleCardClick(actualId)}
                                style={{ cursor: 'pointer', userSelect: 'none' }}
                            >
                                <div className="Record-Top">
                                    {/* 장소 이름 강조: beachDisplayName 사용 */}
                                    <h2 className="Record-Beach">{beachDisplayName}</h2>
                                    <span className={`Safety-Level ${record.safety?.toLowerCase()}`}>
                                        {record.safety}
                                    </span>
                                </div>
                                
                                <div className="Record-Bottom">
                                    <div className="Record-Score-Info">
                                        <span className="Score-Label">안전 점수</span>
                                        <span className="Record-Score-Blue">{record.score}점</span>
                                    </div>
                                    <div className="Record-Date">
                                        {formatDate(record.date || record.started_at)}
                                    </div>
                                </div>
                            </div>
                        )
                    })
                )}
            </section>
        </div>
    )
}

export default Record