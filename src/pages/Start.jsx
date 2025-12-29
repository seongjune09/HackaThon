import '../styles/Start.css'

function Start() {
    return (
        <>
            <main className="Start-Title">
                <h1>Point Check</h1>
                <p>체크를 시작할 준비가 되었어요</p>
            </main>

            <section className="Start-Content">
                <p>아래 버튼을 눌러 체크를 시작하세요.</p>

                <button className="Start-Btn">
                    시작하기
                </button>
            </section>
        </>
    )
}

export default Start